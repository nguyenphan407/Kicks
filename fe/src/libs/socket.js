import Echo from 'laravel-echo';
import io from 'socket.io-client';

const echo = new Echo({
   broadcaster: 'socket.io',
   host: 'http://localhost:6001', // URL của Laravel Echo Server
   client: io, // Truyền đối tượng socket.io client
});

export default echo