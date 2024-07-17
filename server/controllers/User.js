const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAuthenticatedToken = require("../middlewares/isAuthenticatedToken");
require("dotenv").config();
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Error hashing password."
            });
        }
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            role
        });
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User created successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred."
        });
    }
};
exports.login=async (req,res)=>{
    try{
const {email,password}=req.body; 
if(!email || !password){
    return res.status(400).json({
        message:"Please Fill All details",
    })
}
const findUser=await User.findOne({email});
if(!findUser){
    return res.status(400).json({
        message:"User does not Exits",
    })
}
if(await bcrypt.compare(password,findUser.password)){
    const payload = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        role: findUser.role,
    
    };
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"24h",
    })
    const options={
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite:"strict",
    };
    return res.cookie("token",token,options).json({
        success:true,
        message:"User Logged in Successfully",
       role: findUser.role,
      
    })
}
else{
  console.log(error);
  return res.status(400).json({
    success:false,
    message:"Password Incorrect"
  })
}

    }catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"Unexpected Error"
})
    }
}
exports.logout=async (req,res)=>{
    try{
        res.cookie("token","",{
maxAge:1,
        });
        res.status(200).json({
            message:"User Logged Out Successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Unexpected Error"
        })
    }
}
exports.checkAuthenticated = async (req, res) => {
    // const authHeader = req.headers.authorization;
  
    // if (!authHeader) {
    //   return res.json({
    //     isAuthenticated: false
    //   });
    // }
    // const token = authHeader.split(' ')[1];
    // console.log("Token is ",token);
    try {
        const decoded=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
  
      if (decoded) {
        res.json({
        auth: true,
        });
      } else {
        res.json({
            auth: false,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Unexpected Error"
      });
    }
  };