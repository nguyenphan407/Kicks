import React, {useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import io from 'socket.io-client';

const TestSend = () => {

    const echo = new Echo({
        broadcaster: 'socket.io',
        host: 'ws://localhost:6001', // URL của Laravel Echo Server
        client: io, // Truyền đối tượng socket.io client
        transports: ['websocket'],
        reconnectionDelayMax: 10000,
    });

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Lắng nghe sự kiện từ channel "chat"
        echo.channel('kicks_database_messages')
            .listen('.MessageSent', (e) => {
                setMessages((prev) => [...prev, e.message]);
            });
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            await fetch('http://localhost:8000/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default TestSend;
