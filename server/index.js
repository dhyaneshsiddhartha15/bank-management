const express=require('express');
const app=express();
const PORT = process.env.PORT || 4000;
const db=require("./config/database");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter = require('./Route/userRoute');
const accountRouter = require('./Route/accountRoute');
const cors=require('cors')
app.use(bodyParser.json());
require("dotenv").config();
db.connect();
// const logHeaders = (req, res, next) => {
//     console.log(req.headers);
//     next(); 
// };
// app.use(logHeaders);
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use('/api/v1',userRouter),
app.use('/api/v1',accountRouter),
app.get("/",(req,res)=>{
    res.send("App is running on You Website");
})
app.listen(PORT,(req,res)=>{
    console.log(`App is listening at ${PORT}`);
})
