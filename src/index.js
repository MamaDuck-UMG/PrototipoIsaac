const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(8090, () => {
	console.log('Server is in port 8090');
});

const socketIO = require('socket.io');
const io = socketIO(server);

require('./sockets')(io);
