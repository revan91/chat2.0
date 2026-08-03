const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);



// 2. 設定 API 路由（如果有）

const path = require('path');

app.get('/api/test', (req, res) => {
  res.json({ message: "API 連線成功！" });
});

// 關鍵 3：託管 Vue 打包後的靜態檔案 (dist)
// __dirname 代表 server 資料夾，../talk_demo/dist 可以往上退一層找到 Vue 的打包結果
app.use(express.static(path.join(__dirname, '../talk_demo/dist')));

// 關鍵 4：處理 Vue Router (SPA) 的 History 模式
// 只要不是 API 請求，其餘請求通通傳回 index.html
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../talk_demo/dist/index.html'));
});

// 關鍵 5：動態使用 Render 給予的 process.env.PORT
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`✅ 伺服器已在 Port ${PORT} 啟動`);
});

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const rooms = {};
let waitingQueue = []; 

io.on('connection', (socket) => {
  console.log('✅ 連線成功，使用者 Socket ID:', socket.id);

  socket.on('start match', (data) => {
    const { nickname, gender, secretKey } = data;
    const userSecretKey = secretKey?.trim() || 'default';

    socket.nickname = nickname || '陌生人';
    socket.gender = gender;

    waitingQueue = waitingQueue.filter(u => u.socket.id !== socket.id);

    const partnerIndex = waitingQueue.findIndex(
      u => u.secretKey === userSecretKey && u.socket.id !== socket.id
    );

    if (partnerIndex !== -1) {
      const partner = waitingQueue.splice(partnerIndex, 1)[0];
      const roomId = `room_${partner.socket.id}_${socket.id}`;

      rooms[roomId] = { msgCount: 0 };

      socket.join(roomId);
      partner.socket.join(roomId);

      socket.roomId = roomId;
      partner.socket.roomId = roomId;

      socket.emit('matched', {
        roomId,
        secretKey: userSecretKey,
        partner: { nickname: partner.nickname, gender: partner.gender }
      });

      partner.socket.emit('matched', {
        roomId,
        secretKey: userSecretKey,
        partner: { nickname: socket.nickname, gender: socket.gender }
      });

      console.log(`🎉 配對成功！房間 ID: ${roomId} (暗號: ${userSecretKey})`);
    } else {
      waitingQueue.push({
        socket,
        nickname: socket.nickname,
        gender,
        secretKey: userSecretKey
      });
      
      socket.emit('status', '尋找對象中，請稍候...');
    }
  });

  socket.on('chat message', (msg) => {
    const roomId = socket.roomId;
    
    if (roomId && rooms[roomId]) {
      rooms[roomId].msgCount += 1;

      // ✅ 傳回 senderSocketId 供前端比對對話左右側
      io.to(roomId).emit('chat message', {
        senderSocketId: socket.id, 
        senderName: socket.nickname,
        text: msg,
        msgCount: rooms[roomId].msgCount
      });
    }
  });

  socket.on('leave room', () => {
    cleanUpRoom(socket);
  });

  socket.on('disconnect', () => {
    console.log('❌ 使用者離線:', socket.id);
    waitingQueue = waitingQueue.filter(u => u.socket.id !== socket.id);
    cleanUpRoom(socket);
  });
});

function cleanUpRoom(socket) {
  const roomId = socket.roomId;

  if (roomId) {
    socket.to(roomId).emit('partner left');
    socket.leave(roomId);

    if (rooms[roomId]) {
      delete rooms[roomId];
      console.log(`🧹 房間 ${roomId} 已清理完成`);
    }

    socket.roomId = null;
  }
}

server.listen(3001, () => {
  console.log('✅ Socket 後端伺服器已在 http://localhost:3001 啟動');
});