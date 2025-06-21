const fs=require("fs");
const path=require("path");
const Resume=require("../models/Resume");
const upload=require("../middleware/uploadMiddleware");


const uploadResumeImages=async(req,res)=>{
    try{    
        upload.fields([{name:"thumbnail"},{name:"profileImage"}])(req,res,async(error)=>{
            if(error){
                return res.status(400).json({message:"file upload failed",error:error.message});

            }

            const resumeId=req.params.id;
            const resume=await Resume.findOne({_id:resumeId,userId:req.user._id});

            if(!resume){
                return res.status(400).json({message:"Resume not found please check the ID again"});
            }

            const uploadsFolder=path.join(__dirname,"..","uploads");
            const baseUrl=`${req.protocol}://${req.get("host")}`;

            const newThumbnail=req.files.thumbnail?.[0];
            const newProfileImage=req.files.profileImage?.[0];

            //if new thumbnail is uploaded, delete the old one
            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
                }
                resume.thumbnailLink=`${baseUrl}/uploads/${newThumbnail.filename}`;
            }
            //if new profile image uploaded, delete the old one
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
                    if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);            
                }
                resume.profileInfo.profilePreviewUrl=`${baseUrl}/uploads/${newProfileImage.filename}`;
            }
            await resume.save();

            res.status(200).json({
                message:"Images have been uploaded successfully",
                thumbnailLink:resume.thumbnailLink,
                profilePreviewUrl:resume.profileInfo.profilePreviewUrl
            });
        });
    }catch(error){
        console.error("error in the uploadImages uploadImagesController ",error.message);
        res.status(500).json({message:"internal server error"});
    }
}

module.exports={uploadResumeImages};