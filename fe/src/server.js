const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('ioredis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // URL của ReactJS
    methods: ["GET", "POST"]
  }
});

// Cấu hình Redis (nếu sử dụng)
const redis = new Redis();
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Các event handler khác
  socket.on('custom-event', (data) => {
    console.log('Received custom event:', data);
    // Xử lý logic và broadcast
    io.emit('event-response', data);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});