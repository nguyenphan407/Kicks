import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

// Tạo đối tượng socket client
const socket = io('http://localhost:6001', {
    transports: ['websocket'], // Chỉ sử dụng giao thức WebSocket
    reconnectionDelayMax: 10000,
});

// Cấu hình Laravel Echo
const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001', // URL của Laravel Echo Server
    client: socket, // Truyền đối tượng socket.io client
});

// Lắng nghe các sự kiện
echo.connector.socket.on('connect', () => {
    console.log('Connected to Laravel Echo Server');
});

echo.connector.socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
});

echo.connector.socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
});

export default echo;
