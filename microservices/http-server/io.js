const seneca = require('seneca');
const microserviceClient = seneca();
//microserviceClient.use('mesh',{base:false,auto:false});
// microserviceClient.client({type:'tcp',host:'gitadapter',pin:'role:gitadapter,cmd:*'});
// microserviceClient.ready(function(){
//   microserviceClient.client({type:'http',host:'dockeradapter',pin:'role:dockeradapter,cmd:*'});  
// })
microserviceClient.use('../gitadapter/gitadapter-plugin');
microserviceClient.use('../dockeradapter/dockeradapter-plugin');



module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client Connected');

    socket.on('disconnect', function() {
      console.log('Client Disconnected');
    });
    socket.on('clone', function(data){
    	console.log("url:"+data.repository+" "+"branch:"+data.branch);
      microserviceClient.act('role:gitadapter,cmd:clone',data, function(err, response) {
        if(err) { return console.log('ERR: ', err);/*Handle Error*/ }
        console.log('Clone Path',response.repopath);

        microserviceClient.act('role:dockeradapter,cmd:findservices', {directoryPath: response.repopath}, function(err, response) {
          console.log('Services List',response);
          socket.emit('servicelist', response);
        });

        console.log("from io.js"+response.repopath);
      });
    });

    socket.on('deploy', function(reponame) {
      console.log('RECEIVED:',reponame);
      var name= reponame.name;
      require('./filescall')(name,socket);
    });
  });
};
