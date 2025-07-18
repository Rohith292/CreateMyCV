const multer=require("multer");

//configuring the storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

//file filter
const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/jpg','image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('only .jpeg. .jpg , .png file formats are allowed'), false);
    }
};

const upload=multer({storage,fileFilter})
module.exports=upload;