module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('New connection');
		socket.on('userCoordinates', (coords) => {
			socket.broadcast.emit('newUserConnected', coords);
		});
	});
};
