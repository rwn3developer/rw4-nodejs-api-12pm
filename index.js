const express = require('express');

const app = express();

const port = 9000;

const db = require('./config/db');

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'));  

app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start on port`);  
        return false;
    }
    console.log(`server is start on port :- ${port}`); 
})