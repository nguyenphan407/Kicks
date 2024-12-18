import EchoServer from 'laravel-echo-server';

// Khởi chạy Laravel Echo Server
EchoServer.run({
    config: 'laravel-echo-server.json',
}).then(server => {
    //console.log(server);
    
    const io = server.server.io; // Truy cập đối tượng Socket.IO từ Echo Server

    console.log('Laravel Echo Server is running...');

    // Lắng nghe sự kiện kết nối từ client
    io.on('connection', socket => {
        console.log(`Client connected: ${socket.id}`);

        // Lắng nghe custom event từ FE
        socket.on('custom-event', data => {
            console.log('Received custom event from frontend:', data);

            // Gửi phản hồi tới các client khác
            socket.broadcast.emit('backend-response', {
                message: 'This is a response from the backend',
                receivedData: data,
            });
        });

        // Xử lý sự kiện disconnect
        socket.on('disconnect', reason => {
            console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
        });
    });
});
