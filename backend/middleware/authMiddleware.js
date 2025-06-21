const jwt=require("jsonwebtoken");
const User=require("../models/User");

//middleware to protect routes
const protect=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;

        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1];//for extracting the token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        }
        else{
            res.status(401).json({message:"not authorized, no token"});
        }
    }catch(error){
        res.status(401).json({message:" token failed",error:error.message});
    }
};
module.exports={protect};