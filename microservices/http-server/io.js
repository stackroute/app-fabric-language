var Clone = require('./public/cloning.js');
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client Connected');

    socket.on('disconnect', function() {
      console.log('Client Disconnected');
    });
    socket.on('con', function(url){
    	console.log("url:"+url.url+" "+"branch:"+url.branch);
    	var url = 'https://github.com/'+url.url;
    	Clone(url,url.branch);
    });
  });
};
