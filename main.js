const express = require('express');
const cors = require('cors');

const app = express();

const user = require('./routes/user')

const port = process.env.PORT || 8080;

//setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Resgister routes
app.get('/health', (req,res)=>{
    res.json({
        message: 'Running'
    })
})
app.use('/auth', user) 



const start = async ()=> {
    try {
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://localhost:27017/test')
        //server run
        app.listen(port, '0.0.0.0',()=>{
            console.log(`Server running over here http://localhost:${port}/health`)
        })
    } catch (error) {
        console.error('Fallo en encender el servidor', error)
    }
}

start();
