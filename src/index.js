const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');
const { port } = require('./config');

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is in port ${port}`);
});

const socketIO = require('socket.io');
const io = socketIO(server);

require('./sockets')(io);
