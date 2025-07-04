import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState(null);

  const{updateUser}=useContext(UserContext);

  const navigate=useNavigate();

  //handle the login form submit
  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return ;
    }
    if(!password){
      setError("Please enter a password ");
      return;
    }

    //login api call
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
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
        setError("something went wrong .. please try again later");
      }
    }
  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center '>
      <h3 className='text-lg font-semibold text-black'>Welcome back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Enter your details sign in
      </p>

      <form onSubmit={handleLogin}>

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
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Sign In
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Newbie over here ?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=>{
              setCurrentPage("signUp");
            }}
          >Sign Up</button>
        </p>
      </form>
    </div>
  )
}

export default Login