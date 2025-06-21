import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext=createContext();

const USerProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        if(user) return;

        const accessToken=localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }

        const fetchUser=async()=>{
            try{
                const response=await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }catch(error){
                console.error("user not authenticated",error);
            }finally{
                setLoading(false);
            }
        }

        fetchUser();
    },[]);

    const updateUser=(userData)=>{
        setUser(userData);
        localStorage.setItem("token",userData.token);
        setLoading(false);
    };

    const deleteUser=()=>{
        setUser(null);
        localStorage.removeItem("token");
    };
    return(
        <UserContext.Provider value={{user,loading,updateUser,deleteUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default USerProvider;