const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.get('/api/test', (req, res) => {
  res.json({ message: "API 連線成功！" });
});

app.use(express.static(path.join(__dirname, '../talk_demo/dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../talk_demo/dist/index.html'));
});

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
// 🎯 全域單一等待池 (Waiting Pool)
let waitingPool = [];

/**
 * 🎯 雙向屬性比對 (Double Match Logic)
 * 判斷 userA 與 userB 是否彼此完全符合條件
 */
function isMatch(userA, userB) {
  // 1. 密語配對：若為密語模式，必須暗號一致 (且不能為預設 default)
  if (userA.matchType === 'secret' || userB.matchType === 'secret') {
    return userA.matchType === userB.matchType && 
           userA.secretKey !== 'default' && 
           userA.secretKey === userB.secretKey;
  }

  // 2. 一般性別配對：檢查雙向性別偏好
  // A 的偏好是否符合 B 的性別
  const aSatisfiesB = (userB.preferredGender === 'any') || (userA.gender === userB.preferredGender);
  // B 的偏好是否符合 A 的性別
  const bSatisfiesA = (userA.preferredGender === 'any') || (userB.gender === userA.preferredGender);

  return aSatisfiesB && bSatisfiesA;
}

/**
 * 🎯 計算等待池中符合 targetUser 條件的人數
 */
function getMatchableCount(targetUser) {
  return waitingPool.filter(user => user.socket.id !== targetUser.socket.id && isMatch(targetUser, user)).length;
}

io.on('connection', (socket) => {
  console.log('✅ 連線成功，使用者 Socket ID:', socket.id);
    // 🎯 專門處理點選性別時「查詢即時排隊人數」的請求
  socket.on('get match count', (data) => {
    const { gender, preferredGender, matchType } = data;

    const targetUser = {
      socket: { id: socket.id },
      gender: gender || 'male',
      preferredGender: preferredGender || 'any',
      matchType: matchType || 'gender',
      secretKey: 'default'
    };

    // 計算符合該條件的人數並回傳給觸發者
    const count = getMatchableCount(targetUser);
    socket.emit('match count updated', { count });
  });
  // 🎯 觸發開始配對
  socket.on('start match', (data) => {
    const { nickname, gender, matchType, secretKey, preferredGender } = data;
    
    socket.nickname = nickname || '陌生人';
    socket.gender = gender;

    const newUser = {
      socket,
      nickname: socket.nickname,
      gender: gender || 'male',
      matchType: matchType || 'gender',
      secretKey: secretKey?.trim() || 'default',
      preferredGender: preferredGender || 'any'
    };

    // 先清除可能已在池中的舊連線
    waitingPool = waitingPool.filter(u => u.socket.id !== socket.id);

    // 🎯 尋找池子裡第一個符合條件（isMatch 為 true）的對象
    const partnerIndex = waitingPool.findIndex(candidate => isMatch(newUser, candidate));

    if (partnerIndex !== -1) {
      // 🎉 配對成功！將對象從池中取出
      const partner = waitingPool.splice(partnerIndex, 1)[0];
      const roomId = `room_${partner.socket.id}_${socket.id}`;

      rooms[roomId] = { msgCount: 0 };

      socket.join(roomId);
      partner.socket.join(roomId);

      socket.roomId = roomId;
      partner.socket.roomId = roomId;

      const userSecretKey = newUser.secretKey;

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

      console.log(`🎉 配對成功！房間 ID: ${roomId} (模式: ${newUser.matchType})`);

    } else {
      // ⏳ 沒找到，放入等待池中
      waitingPool.push(newUser);

      // 回傳當前專屬於該使用者的符合排隊人數
      const count = getMatchableCount(newUser);
      socket.emit('match count updated', { count });

      socket.emit('status', '尋找對象中，請稍候...');
    }
  });

  // 聊天訊息處理
  socket.on('chat message', (msg) => {
    const roomId = socket.roomId;
    
    if (roomId && rooms[roomId]) {
      rooms[roomId].msgCount += 1;

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
    waitingPool = waitingPool.filter(u => u.socket.id !== socket.id);
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
