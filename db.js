const mongoose = require('mongoose');
require('dotenv').config();
///define mongodb connection url
//const mongoURL = process.env.MONGODB_URL_Local//'mongodb://localhost:27017/hotels' ;
const mongoURL = process.env.MONGODB_URL;

//setup mongodb connections
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

//define event listner
db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('connected to mongodb server:', err);
})

db.on('disconnected',()=>{
    console.log('mongodb disconnected');
})

module.exports = db;