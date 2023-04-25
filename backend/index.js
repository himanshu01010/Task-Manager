const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const New = require('./model/mongoose');
const route = require('./routes/route');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/api/tasks',route);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then (
    app.listen(PORT,()=>{
        console.log("the server is running");
    })
)
.catch((err)=>{
    console.log(err);
})