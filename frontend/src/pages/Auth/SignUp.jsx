import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState(null);
  const[fullName,setFullName]=useState('');
  const[email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {updateUser}=useContext(UserContext);

  const [error,setError]=useState(null);
  const navigate=useNavigate();

  //handle the signup form submit
  const handleSignUp=async(e)=>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password of min 8 characters");
      return;
    }
    setError("");

    //sign up api call
    try{

      //upload image if present
      if(profilePic){
        const imageUploadRes=await uploadImage(profilePic);
        profileImageUrl=imageUploadRes.imageUrl||"";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName,
        email,
        password,
        profileImageUrl
      });
      const {token}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong please try again later");
      }
    }
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center '>
      <h3 className='text-lg font-semibold text-black'>Welcome back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Enter your details sign in
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
        <Input 
         value={fullName}
         onChange={({target})=>setFullName(target.value)}
         label="Full name"
         placeholder="ABC"
         type="text"
        /> 
        <Input 
         value={email}
         onChange={({target})=>setEmail(target.value)}
         label="Email Address"
         placeholder="abc@gmail.com"
         type="text"
        /> 
        <Input 
         value={password}
         onChange={({target})=>setPassword(target.value)}
         label="Password"
         placeholder="Minimum of 8 Characters"
         type="password"
        /> 
      </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Sign Up
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account ?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=>{
              setCurrentPage("login");
            }}
          >Sign In</button>
        </p>
        
      </form>
    </div>
  
  )
}

export default SignUp