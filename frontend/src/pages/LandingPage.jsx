import React, { useContext, useState } from 'react'
import HERO_IMG from'../assets/hero-img.png';
import { useNavigate } from 'react-router-dom';
import Login from "./Auth/Login"
import SignUp from "./Auth/SignUp"
import Modal from "../components/Modal"
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/cards/ProfileInfoCard';
const LandingPage = () => {

  const navigate=useNavigate();
  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login");
  const {user}=useContext(UserContext);

  const handleCTA=()=>{
    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }
  };

  return (
    <div className='w-full min-h-full bg-amber-200 pb-96'>
      <div className='container mx-auto px-4 py-6'>
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl font-bold'>CraftMyCV</div>
          {user?<ProfileInfoCard/>:<button 
            className='bg-green-200 text-sm font-semibold text-black rounded-lg px-7 py-3 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            onClick={()=>setOpenAuthModal(true)}
          >
            Sign In/Sign Up
          </button>}
        </header>

        {/* hero content*/}
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-8'>
            <h1 className='text-4xl font-bold mb-6 leading-tight'>
              Build your {" "}
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'>Resume Effortlessly</span>
            </h1>
            <p className='text-lg text-gray-700 mb-8'>
              Craft Your Resuma with ease 
            </p>
            <button 
              className='bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get started
            </button>
          </div>
          <div className='w-full md:w-1/2'>
            <img 
              src={HERO_IMG}
              alt="hero image"
              className='w-full rounded-lg'
            />
          </div>
        </div>

        <section className='mt-5'>
          <h2 className='text-2xl font-bold text-center mb-12'>
            Features that make u outshine others
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>Easy editing</h3>
              <p className='text-gray-700'>Update your resume with a live preview along with instant formatting</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>Intrguing Templates</h3>
              <p className='text-gray-700'>Choose from modern, professional templates that are easily customisable</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>One-click export</h3>
              <p className='text-gray-700'>Download your resume with just one click</p>
            </div>
          </div>
        </section>

      </div>
      <Modal 
        isOpen={openAuthModal}
        onClose={()=>{
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
  {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
  {currentPage === "signUp" && <SignUp setCurrentPage={setCurrentPage} />}
      </div>

      </Modal>
    </div>
  )
}

export default LandingPage