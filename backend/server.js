require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes");
const resumeRoutes=require("./routes/resumeRoutes")

const app=express();

//middleware to handle the cors
app.use(
    cors({
        origin:process.env.CLIENT_URL||"*",
        methods:["GET","POST","DELETE","PUT"],
        allowedHeaders:["Content-Type","Authorization"],

    })
);

//connect database
connectDB();

//middleware
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);

//serve uploads folder
app.use(
    "/uploads",
    express.static(path.join(__dirname,"uploads"),{
        setHeaders:(res,path)=>{
            res.set("Access-Control-Allow-Origin","http://localhost:5173");
        }
    })
)

//start server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));