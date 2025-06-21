const fs=require("node:fs");
const path=require("node:path");
const Resume=require("../models/Resume")

//create a resume .... private access
const createResumes=async(req,res)=>{
    try{
        const {title} =req.body;

        //default resume template
        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:"",
            },
            contactInfo:{
            email:"",
            phone:"",
            location:"",
            linkedIn:"",
            github:"",
            website:"",
        },
        userExperience:[{
            company:"",
            role:"",
            startDate:"",
            endDate:"",
            description:"",
        }],
        education:[{
            degree:"",
            institution:"",
            startDate:"",
            endDate:"",
        }],
        skills:[{
            name:"",
            progress:0,
        }],
        projects:[{
            title:"",
            description:"",
            github:"",
            liveDemo:"",
        }],
        certifications:[{
            title:"",
            issuer:"",
            year:"",
        }],
        languages:[{
            name:"",
            progress:0,
        }],
        interests:[""],
        };

        const newResume=await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData
        });

        res.status(201).json(newResume);
    }catch(error){
        console.error("error in createResumes resumeController ",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

//get all the user resumes ...private access
const getUserResumes=async(req,res)=>{
    try{
        const resumes=await Resume.find({userId:req.user._id}).sort({
            updatedAt:-1,
        });
        res.json(resumes);
    }catch(error){
        console.error("error in getUserResumes ResumeController",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

//get a user resume by id..private access
const getUserResumeById=async(req,res)=>{
    try{
        const resume = await Resume.findOne({_id:req.params.id, userId:req.user._id});

        if(!resume){
             return res.status(404).json({message:"resume not found"});

        }
        res.status(200).json(resume);
    }catch(error){
        console.error("error in getResumeById resumeController ",error.message)
        res.status(500).json({message:"internal server error"});
    }
};

//update a user resume...private access
const updateResume=async(req,res)=>{
    try{
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });

        if(!resume){
            return res.status(404).json({message:"resume not found"});
        }

        //merge updates into existing resumes
        Object.assign(resume,req.body);

        //save the updated resume
        const savedResume=await resume.save();

        res.status(201).json(savedResume);
    }catch(error){
        console.error("error in updateResume resumeController ",error.message)
        res.status(500).json({message:"internal server error"});
    }
};


//delete a user resume ... private acces
const deleteResume=async(req,res)=>{
    try{
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });

        if(!resume){
            return res.status(404).json({message:"resume not found"});
        }


        //delete the thumbnails and profilepreviewurl from images folder
        const uploadsFolder=path.join(__dirname,"..","uploads");
        const baseUrl=`${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted=await Resume.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id
        });

        if(!deleted){
            return res.status(404).json({message:"resume cannot be found to be deleted"});
        }

        res.json({message:"resume deleted successfully"});
    }catch(error){
        console.error("error in deleteResume resumeController",error.message)
        res.status(500).json({message:"internal server error"});
    }
};

module.exports = { createResumes, getUserResumes, getUserResumeById, updateResume, deleteResume };
