const seneca = require('seneca');
const microserviceClient = seneca();
//microserviceClient.use('mesh',{base:false,auto:false});
microserviceClient.client({type:'tcp',host:'gitadapter',pin:'role:gitadapter,cmd:*'});
microserviceClient.client({type:'tcp',host:'dockeradapter',pin:'role:dockeradapter,cmd:*'});

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client Connected');

    socket.on('disconnect', function() {
      console.log('Client Disconnected');
    });
    socket.on('clone', function(url){
    	console.log("url:"+url.url+" "+"branch:"+url.branch);
      microserviceClient.act('role:gitadapter,cmd:clone',{repo:url.url,branch:url.branch}, function(err, response) {
        if(err) { return console.log('ERR: ', err);/*Handle Error*/ }
          
        microserviceClient.act('role:dockeradapter,cmd:finddocker', {directoryPath: response.repopath}, function(err, response) {
          socket.emit('baseImage', response.baseImagePaths);
        });
        console.log("from io.js"+response.repopath);
      });
      
      // scan(process.env.REPOSITORY_PATH,process.env.REPO_NAME);
    });
  });
};
