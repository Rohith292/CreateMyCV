const express=require("express");
const{
    createResumes,
    getUserResumes,
    getUserResumeById,
    updateResume,
    deleteResume,
}=require("../controllers/resumeController");
const {protect}=require("../middleware/authMiddleware");
const {uploadResumeImages}=require("../controllers/uploadImages");

const router=express.Router();

//define the resume routes
router.post("/",protect,createResumes);
router.get("/",protect,getUserResumes);
router.get("/:id",protect,getUserResumeById);
router.put("/:id",protect,updateResume);
router.put("/:id/upload-images",protect,uploadResumeImages);

router.delete("/:id",protect,deleteResume);

module.exports=router;