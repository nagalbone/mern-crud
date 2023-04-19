const express = require('express');
const connectDb = require('./config/config');
//connection to database
connectDb();
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>WELCOM</h1>");
});


const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
