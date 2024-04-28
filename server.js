const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/',(req,res)=>{
    res.send("hello, welcome to hotel");
})

app.get('/checken',(req,res)=>{
    res.send("hello, i love to serve chicken");
})

app.get('/idli',(req,res)=>{
    var customIdli = {
        Name: 'rava ildi',
        size: 'dia(3 cm)',
        is_sambar: true,
        is_cocoChutny: false
    }
    res.send(customIdli);
})

// Post route to add a person

// import router
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

app.listen(PORT,()=>{
    console.log('server is now listening');
});