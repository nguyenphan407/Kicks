import React, {useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import io from 'socket.io-client';

const TestSocket = () => {
    const [messages, setMessages] = useState([]);

    const echo = new Echo({
        broadcaster: 'socket.io',
        host: 'ws://localhost:6001', // URL của Laravel Echo Server
        client: io, // Truyền đối tượng socket.io client
        transports: ['websocket'],
        reconnectionDelayMax: 10000,
    });

    useEffect(() => {
        console.log(echo.connector);

        // Lắng nghe sự kiện 'MessageSent' trên channel 'kicks_database_messages'
        echo.channel('kicks_database_messages')
            .listen('.MessageSent', function (event) {
                console.log(event);  // In ra thông tin sự kiện

                // Cập nhật state để hiển thị message
                setMessages((prevMessages) => [...prevMessages, event.message]);
            });

        // Dọn dẹp khi component bị unmount
        return () => {
            echo.leaveChannel('kicks_database_messages');
        };
    }, []);

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </div>
    );
};

export default TestSocket;
