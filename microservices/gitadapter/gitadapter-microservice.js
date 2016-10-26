const seneca = require ('seneca');
const gitadapter = seneca();
gitadapter.use(require('./gitadapter-plugin'));
// gitadapter.use("mesh",{base:false,auto:true, pin: 'role:gitadapter,cmd:*'});

gitadapter.listen({type: 'tcp', pin:'role:gitadapter,cmd:*'});