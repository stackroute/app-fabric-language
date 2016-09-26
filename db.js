const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/app-fabric'

mongoose.connect(mongoURL, function(err, connection) {
  if(err) { return console.error('MongoDB Connection failed: ',err); }
});
