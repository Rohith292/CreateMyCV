import React,{useContext} from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
const ProfileInfoCard = () => {
    const {user,deleteUser}=useContext(UserContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        deleteUser();
        navigate("/");
    }
  return (
    user &&(
    <div className='flex items-center'>
        <img 
        src={user.profileImageUrl}
        alt=""
        className='w-11 h-11 bg-gray-300 rounded-full mr-3'
        />
        <div>
            <div className='text-[15px] font-bold leading-3'>{user.name||""}</div>
            <button 
            className='text-green-400 text-sm font-semibold cursor-pointer hover:underline'
            onClick={handleLogout}
            >Logout</button>
        </div>
    </div>
    )
  )
}

export default ProfileInfoCard