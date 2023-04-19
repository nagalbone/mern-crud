const express = require('express');
const connectDb = require('./config/config');
const User = require('./model/User');
//connection to database
connectDb();
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>WELCOM</h1>");
});


app.get('/getData',async (req,res)=>{
    const data = await User.find({});
    res.json(data);
});

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
