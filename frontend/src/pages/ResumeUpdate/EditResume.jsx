import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import{
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
}from "react-icons/lu"

import toast from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TitleInput from '../../components/inputs/TitleInput'
import {useReactToPrint} from "react-to-print"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import StepProgress from '../../components/StepProgress'
import ProfileInfoForm from './forms/ProfileInfoForm'
import ContactInfoForm from './forms/ContactInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationInfoForm from './forms/EducationInfoForm'
import SkillsInfoForm from './forms/SkillsInfoForm'
import ProjectsInfoForm from './forms/ProjectsInfoForm'
import CertificationInfoForm from './forms/CertificationInfoForm'
import AdditionalInfoForm from './forms/AdditionalInfoForm'
import RenderResume from '../../components/ResumeTemplate/RenderResume'
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from '../../utils/helper'
import Modal from '../../components/Modal'
import ThemeSelector from './ThemeSelector'

const EditResume = () => {
  const {resumeId}=useParams();
  const navigate=useNavigate();

  const resumeRef=useRef(null);
  // at the top of your component
const resumeDownloadRef = useRef();

const handlePrint = useReactToPrint({
  contentRef: resumeDownloadRef,
});



  const [baseWidth,setBaseWidth]=useState(800);

  const [openThemeSelector,setOpenThemeSelector]=useState(false);

  const [openPreviewModal,setOpenPreviewModal]=useState(false);

  const[currentPage,setCurrentPage]=useState("profile-info");
  const[progess,setProgress]=useState(0);
  const [resumeData,setResumeData]=useState({
    title:"",
    thumbnailLink:"",
    profileInfo:{
      profileImg:null,
      profilePreviewUrl:"",
      fullName:"",
      designation:"",
      summary:""
    },
    template:{
      theme:"",
      colorPalette:""
    },
    contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        website: ""
    },
    userExperience: [
        {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          
        }
    ],
    education: [
        {
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
            
        }
    ],
    skills: [
        {
            name: "",
            progress: 0,
            
        }
    ],
    projects: [
        {
            title: "",
            description: "",
            github: "",
            liveDemo: "",
        }
    ],
    certifications: [
        {
            title: "",
            issuer: "",
            year: "",
            
        }
    ],
    languages: [
        {
            name: "",
            progress: 0,
            
        }
    ],
    interests: [
        ""
    ],
  });
  const [isLoading,setIsLoading]=useState(false);
  const[errorMsg,setErrorMsg]=useState("");

  //validate inputs
  const validateAndNext=(e)=>{

    const errors=[];
     switch(currentPage){
      case "profile-info":
        const {fullName,designation,summary}=resumeData.profileInfo;
        if(!fullName.trim()){
          errors.push("Full name is required!");
          
        }
        if(!designation.trim()){
          errors.push("Designation is required!");
        }
        if(!summary.trim()) errors.push("summary is required!");
        break;

      case "contact-info":
        const {email,phone}=resumeData.contactInfo;
        if(!email.trim()|| !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
          errors.push("Valid email is required");
        }
        if(!phone.trim()){
          errors.push("Valid 10-digit phone number is required");
        }
        break;

      case "work-experience":
  if (resumeData.userExperience.length > 0) { // ✅ Skip validation if empty
    resumeData.userExperience.forEach(({ company, role, startDate, endDate }, index) => {
      if (!company.trim()) errors.push(`Company is required in experience ${index + 1}`);
      if (!role.trim()) errors.push(`Role is required in experience ${index + 1}`);
      if (!startDate || !endDate) errors.push(`Start and End dates are required in experience ${index + 1}`);
    });
  }
  break;

      case "education-info":
      resumeData.education.forEach(({ degree,institution, startDate, endDate }, index) => {
      if (!degree.trim()) errors.push(`Degree is required in education ${index + 1}`);
      if (!institution.trim()) errors.push(`Institution is required in education ${index + 1}`);
      if (!startDate || !endDate) errors.push(`Start and End dates are required in education ${index + 1}`);
      });
      break;

      case "skills-info":
        resumeData.skills.forEach(({name,progress},index)=>{
          if(!name.trim()){
            errors.push(`Skill name is required in skill ${index+1}`);
          }
          if(progress<1 || progress>100){
            errors.push(`Skill progress must be between 1 and 100 in skill ${index + 1}`);
          }
        });
        break;

      case "projects":
        resumeData.projects.forEach(({title,description},index)=>{
          if(!title.trim()){
            errors.push(`Project title required in project ${index+1}`);
          }
          if(!description.trim()){
            errors.push(`Project description required in project ${index + 1}`);
          }
        });
        break;

      
      case "certification-info":
        resumeData.certifications.forEach(({title,issuer},index)=>{
          if(!title.trim()){
            errors.push(`Certification title is required in certification ${index + 1}`);
          }
          if(!issuer.trim()){
            errors.push(`Certification provider is required in certification ${index +1}`);
          }
        });
        break;

      case "additional-info":
        if(resumeData.languages.length===0 || !resumeData.languages[0].name?.trim()){
          errors.push("At least one language is required");
        }

        if(resumeData.interests.length===0 || !resumeData.interests[0]?.trim()){
          errors.push("At least one interest is required");
        }

        break;

      default: break;
     }

     if(errors.length>0){
        setErrorMsg(errors.join(", "));

        return;
      }

    //move to next step
    setErrorMsg("");
    goToNextStep();
  };

  //function to navigate to next page
  const goToNextStep=()=>{
    const pages=[
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills-info",
      "projects",
      "certification-info",
      "additional-info"

    ];

    if(currentPage==="additional-info") setOpenPreviewModal(true);

    const currentIndex=pages.indexOf(currentPage);
    if(currentIndex!==-1 && currentIndex < pages.length -1){
      const nextIndex=currentIndex+1;
      setCurrentPage(pages[nextIndex]);

      //set progress as percentage

    const percent= Math.round((nextIndex /(pages.length-1))*100);
    setProgress(percent);
    window.scrollTo({top:0,behavior:"smooth"});
    }

    
  };

  //function to navigate to previous page
  const goBack=()=>{
    const pages=[
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills-info",
      "projects",
      "certification-info",
      "additional-info"

    ];
    if(currentPage==="profile-info") navigate("/dashboard");
    const currentIndex=pages.indexOf(currentPage);

    if(currentIndex > 0){
      const prevIndex=currentIndex-1;
      setCurrentPage(pages[prevIndex]);

      //update progress
    const percent=Math.round((prevIndex/(pages.length-1))*100);
    setProgress(percent);
    window.scrollTo({top:0,behavior:"smooth"});
    
    }

    
};

  const renderForm=()=>{
    switch(currentPage){
      case "profile-info":
        return(
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key,value)=>{
              updateSection("profileInfo",key,value);
            }}
            onNext={validateAndNext}
          />
        )

      case "contact-info":
        return(
          <ContactInfoForm 
            contactInfo={resumeData?.contactInfo}
            updateSection={(key,value)=>{
              updateSection("contactInfo",key,value);
            }}
          />
        )

      case "work-experience":
        return(
          <WorkExperienceForm
            userExperience={resumeData?.userExperience}
            updateArrayItem={(index,key,value)=>{
              updateArrayItem("userExperience",index,key,value);
            }}
            addArrayItem={(newItem)=>addArrayItem("userExperience",newItem)}
            removeArrayItem={(index)=>removeArrayItem("userExperience",index)}
          />
        )
      
      case "education-info":
        return(
          <EducationInfoForm 
          educationInfo={resumeData?.education}
           updateArrayItem={(index,key,value)=>{
              updateArrayItem("education",index,key,value);
            }}
            addArrayItem={(newItem)=>addArrayItem("education",newItem)}
            removeArrayItem={(index)=>removeArrayItem("education",index)}

          />
        )

        case "skills-info":
        return(
          <SkillsInfoForm 
          skillsInfo={resumeData?.skills}
           updateArrayItem={(index,key,value)=>{
              updateArrayItem("skills",index,key,value);
            }}
            addArrayItem={(newItem)=>addArrayItem("skills",newItem)}
            removeArrayItem={(index)=>removeArrayItem("skills",index)}

          />
        )

        case "projects":
        return(
          <ProjectsInfoForm
          projectInfo={resumeData?.projects}
           updateArrayItem={(index,key,value)=>{
              updateArrayItem("projects",index,key,value);
            }}
            addArrayItem={(newItem)=>addArrayItem("projects",newItem)}
            removeArrayItem={(index)=>removeArrayItem("projects",index)}

          />
        );

      case "certification-info":
        return (
          <CertificationInfoForm
          certificationInfo={resumeData?.certifications}
          updateArrayItem={(index,key,value)=>{
            updateArrayItem("certifications",index,key,value);
          }}
          addArrayItem={(newItem)=>addArrayItem("certifications",newItem)}
          removeArrayItem={(index)=>removeArrayItem("certifications",index)}

          />
        );

      case "additional-info":
        return(
          <AdditionalInfoForm
          languages={resumeData.languages}
          interests={resumeData.interests}

          updateArrayItem={(section,index,key,value)=>updateArrayItem(section,index,key,value)}
          addArrayItem={(section,newItem)=>addArrayItem(section,newItem)}
          removeArrayItem={(section,index)=>removeArrayItem(section,index)}
          />
        )

      default:return null
    }
  };

  //update single nested objects
  const updateSection=(section,key,value)=>{
    setResumeData((prev)=>({
      ...prev,
      [section]:{
        ...prev[section],
        [key]:value,
      },
    }));
  };

  //update the array items(like workexperience[0])
  const updateArrayItem=(section,index,key,value)=>{
    setResumeData((prev)=>{
      const updatedArray=prev[section]?[...prev[section]]:[];

      if(key===null){
        updatedArray[index]=value;//for simple string like interests

      }else{
        updatedArray[index]={
          ...updatedArray[index],
          [key]:value
        };
      }

      return{
        ...prev,
        [section]:updatedArray
    }
    })
  };

  //add items to the array
  const addArrayItem=(section,newItem)=>{
    setResumeData((prev)=>({
      ...prev,
      [section]:[...(prev[section]||[]),newItem]
    }))
  };

  //remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
        const updatedArray = Array.isArray(prev[section]) ? [...prev[section]] : []; // ✅ Ensures it's an array
        
        updatedArray.splice(index, 1); // Removes item

        return { ...prev, [section]: updatedArray };
    });
};


  //fetch resume details by Id
  const fetchResumeDetailsById=async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));

      if(response.data && response.data.profileInfo){
      const resumeInfo=response.data;

      setResumeData((prevState)=>({
        ...prevState,
        title:resumeInfo?.title||"Untitled",
        template:resumeInfo?.template||prevState?.template,
        profileInfo:resumeInfo?.profileInfo||prevState?.profileInfo,
        contactInfo: resumeInfo?.contactInfo|| prevState?.contactInfo,
        userExperience: resumeInfo?.userExperience|| prevState?.userExperience,
        education:resumeInfo?.education|| prevState?.education,
        skills:resumeInfo?.skills||prevState?.skills,
        projects:resumeInfo?.projects||prevState?.projects,
        certifications:resumeInfo?.certifications||prevState?.certifications,
        languages:resumeInfo?.languages||prevState?.languages,
        interests:resumeInfo?.interests||prevState?.interests
      }));
      }
    }catch(error){
      console.error("error fetching the resumes",error);
    }
  };

  //upload thumbnail and resume profile img
  const uploadResumeImages=async()=>{
    try{
      setIsLoading(true);

      fixTailwindColors(resumeRef.current);
      const imageDataUrl=await captureElementAsImage(resumeRef.current);

      //convert base64 to file
      const thumbnailFile=dataURLtoFile(
        imageDataUrl,`resume-${resumeId}.png`
      );
      const profileImageFile=resumeData?.profileInfo?.profileImg|| null;

      const formdata = new FormData();
      if(profileImageFile) formdata.append("profileImage",profileImageFile);
      if(thumbnailFile) formdata.append("thumbnail",thumbnailFile);

      const uploadResponse= await axiosInstance.put(API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
    formdata,
      {headers:{"Content-Type":"mulitpart/form-data"}});

      const {thumbnailLink,profilePreviewUrl}=uploadResponse.data;

      console.log("RESUME_DATA___",resumeData);

      await updateResumeDetails(thumbnailLink,profilePreviewUrl);

      toast.success("Resume updated successfully!");
      navigate("/dashboard");

    }catch(error){
      console.error("Error uploading images :",error);
      toast.error("Failed to upload images");
    }
    finally{
      setIsLoading(false);
    }
  };

  const updateResumeDetails=async(thumbnailLink,profilePreviewUrl)=>{
    try{
      setIsLoading(true);

      const response = await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId),
      {
        ...resumeData,
        thumbnailLink:thumbnailLink||"",
        profileInfo:{
          ...resumeData.profileInfo,
          profilePreviewUrl: profilePreviewUrl|| ""
        }
      }
    );
    }catch(error){
      console.error("error capturing image ",error);
    }finally{
      setIsLoading(false);
    }
  };

  //function to delete a resume
  // Delete Resume
const handleDeleteResume = async () => {
  try {
    setIsLoading(true);
    const response = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
    toast.success('Resume Deleted Successfully');
    navigate('/dashboard');
  } catch (err) {
    console.error("Error deleting resume:", err);
  } finally {
    setIsLoading(false);
  }
};


  //function to update the basewidth based on the resume container size
  const updateBaseWidth=()=>{
    if(resumeRef.current){
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(()=>{
    updateBaseWidth();
    window.addEventListener("resize",updateBaseWidth);

    if(resumeId){
      fetchResumeDetailsById();
    }

    return()=>{
      window.removeEventListener("resize",updateBaseWidth);
    }
  },[]);

  return (
    <DashboardLayout>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-green-100 px-4 py-3 mb-4'>
          <TitleInput
            title={resumeData.title}
            setTitle={(value)=>
              setResumeData((prevState)=>({
                ...prevState,
                title:value
              }))
            }
          />

          <div className='flex items-center gap-4'>
            <button 
              className='btn-small-light'
              onClick={()=>setOpenThemeSelector(true)}
            >
              <LuPalette className='text-[16px]'/>
              <span className='hidden md:block'>Change Theme</span>
            </button>

            <button 
              className='btn-small-light'
              onClick={handleDeleteResume}
            >
              <LuTrash2 className='text-[16px]'/>
              <span className='hidden md:block'>Delete</span>
            </button>

            <button 
              className='btn-small-light'
              onClick={()=>setOpenPreviewModal(true)}
            >
              <LuDownload className='text-[16px]'/>
              <span className='hidden md:block'>Preview and download</span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg border border-green-100 overflow-hidden'>

            <StepProgress progress={60}/>
            {renderForm()}

            <div className='mx-5'>
              {errorMsg &&(
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                  <LuCircleAlert className='text-md'/>{errorMsg}
                </div>
              )}

              <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
                <button
                  className='btn-small-light'
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className='text-[16px]'/>
                  Back
                </button>
                <button
                  className='btn-small-light'
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className='text-[16px]'/>
                  {isLoading ? "updating ...":"save & exit"}
                </button>

                <button 
                  className='btn-small'
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage ==="additionalInfo" &&(
                    <LuDownload className='text-[16px]'/>
                  )}

                  {currentPage ==="additionalInfo" ?"Preview & download":"Next"}
                  {currentPage !=="additionalInfo" &&(
                    <LuArrowLeft className='text-[16px] rotate-180'/>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div ref={resumeRef} className='h-[100vh]'>

              <RenderResume
                templateId={resumeData?.template?.theme ||""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.colorPalette || []}
                containerWidth={baseWidth}
                />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openThemeSelector}
        onClose={()=>setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className='w-[90vw] h-[80vh]'>
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value)=>{
                setResumeData((prevState)=>({
                  ...prevState,
                  template:value||prevState.template,
                }));
            }}
            resumeData={null}
            onClose={()=>setOpenThemeSelector(false)}          
          />
        </div>
      </Modal>

      <Modal
  isOpen={openPreviewModal}
  onClose={() => setOpenPreviewModal(false)}
  title={resumeData.title}
  showActionBtn
  actionBtnText="Download"
  actionBtnIcon={<LuDownload className="text-[16px]" />}
  onActionClick={handlePrint}
>
  <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
    <RenderResume
      templateId={resumeData?.template?.theme || ""}
      resumeData={resumeData}
      colorPalette={resumeData?.template?.colorPalette || []}
    />
  </div>
</Modal>

    </DashboardLayout>
  )
}

export default EditResume