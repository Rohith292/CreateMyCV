const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};
//post /api/auth/register
//public access
const registerUser=async(req,res)=>{
    try{
        const {name,email,password,profileImageUrl}=req.body;

        //check if a user already exists
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exists"});
        }

        //hashing of the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create a new user
        const user=await User.create({
            name,email,password:hashedPassword,profileImageUrl
        });
        
        //return the success response
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
            message:"user registered successfully"

        });
    }catch(error){
        console.error("Error in registerUser authController",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

//post /api/auth/login
//public access
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist or invalid email provided"});
        }

        //compare the passwords
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password is provided ... please try again later"});
        }

        //return success response
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
            message:"login successful"
        });
    }catch(error){
        console.error("error in loginUser authController",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

//Get /api/auth/profile
//private access(require jwt token)
const getUserProfile=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }catch(error){
        console.error("error in getUserProfile authController",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

module.exports={registerUser,loginUser,getUserProfile};