module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client Connected');

    socket.on('disconnect', function() {
      console.log('Client Disconnected');
    });
  });
};
