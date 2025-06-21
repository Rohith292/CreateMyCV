import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage=async(imageFile)=>{
    const formdata=new FormData();
    //append the image file to form data
    formdata.append("image",imageFile);

    try{
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
            headers:{
                "Content-Type":"multipart/form-data",
            },
        });
        return response.data;
    }catch(error){
        console.error("error uploading the image ",error);
        throw(error);
    }
};


export default uploadImage;