const seneca = require ('seneca');
const dockeradapter = seneca();
dockeradapter.use(require('./dockeradapter-plugin.js'));
// dockeradapter.use("mesh",{base:false,auto:true, pin: 'role:dockeradapter,cmd:*'});

dockeradapter.listen({type: 'tcp', pin:'role:dockeradapter,cmd:*'});