import Echo from 'laravel-echo';

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
    enabledTransports: ['ws', 'wss'],
});
