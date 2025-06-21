const express=require("express");
const {registerUser,loginUser,getUserProfile}=require("../controllers/authController")
const {protect}=require("../middleware/authMiddleware");
const upload=require("../middleware/uploadMiddleware");

const router=express.Router();

router.post("/register",registerUser);//signup
router.post("/login",loginUser);//signIn
router.get("/profile",protect,getUserProfile);//get user info


router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports=router;