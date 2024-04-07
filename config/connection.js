const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose.connection;