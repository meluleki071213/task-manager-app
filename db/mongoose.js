// This file will handle connection logic to the MongoDB database
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db!')
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
