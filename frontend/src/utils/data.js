import TEMPLATE_ONE_IMG from "../assets/template-one.png"
import TEMPLATE_TWO_IMG from "../assets/template-two.png"
import TEMPLATE_THREE_IMG from "../assets/template-three.png"
import TEMPLATE_FOUR_IMG from "../assets/template-four.png"


export const resumeTemplates=[
    {
        id:"01",
        thumbnailImg:TEMPLATE_ONE_IMG,
        colorPaletteCode:"themeOne"
    },
    {
        id:"02",
        thumbnailImg:TEMPLATE_TWO_IMG,
        colorPaletteCode:"themeTwo"
    },
    {
        id:"03",
        thumbnailImg:TEMPLATE_THREE_IMG,
        colorPaletteCode:"themeThree"
    },
    {
        id:"04",
        thumbnailImg:TEMPLATE_FOUR_IMG,
        colorPaletteCode:"themeFour"
    }
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFD", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4FEF7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF57F", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FABF", "#E4E7EB", "#CBD5E0", "#F79CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF770", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6C6ACF", "#46545E"],
    ["#FFFD6", "#FFFD47", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#444A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
  ],
};


export const DUMMY_RESUME_DATA={
    profileInfo:{
        profileImg:null,
        profilePreviewUrl:"",
        fullName:"ABC",
        designation:"Senior software developer",
        summary:"Aspiring software developer with 3 years of experience in the field of debugging and testing"

    },
    contactInfo: {
  email: "ABC@example.com",
  phone: "+91 974567890",
  location: "India",
  linkedIn: "https://linkedin.com/in/ABC",
  github: "https://github.com/ABC",
  website: "https://ABC.dev"
},

userExperience: [
  {
    company: "ByteWave Technologies",
    role: "Backend Developer Intern",
    startDate: "Jan 2023",
    endDate: "July 2023",
    description: "Built RESTful APIs using Node.js, implemented secure authentication flows, and reduced response time by 40% with optimized queries."
  }
],

education: [
  {
    degree: "B.Tech in Computer Science",
    institution: "National Institute of Technology, Delhi",
    startDate: "August 2020",
    endDate: "May 2024"
  }
],

skills: [
  {
    name: "JavaScript",
    progress: 80
  },
  {
    name: "Node.js",
    progress: 75
  },
  {
    name: "MongoDB",
    progress: 70
  }
],

projects: [
  {
    title: "Chat Application",
    description: "A chat application with features like sleek UI design,socket.io,images share along with text",
    github: "https://github.com/ABC/chat-app",
    liveDemo: "https://chat.live"
  }
],

certifications: [
  {
    title: "Google Cloud Associate Engineer",
    issuer: "Google",
    year: "2023"
  }
],

languages: [
  {
    name: "English",
    progress: 95
  },
  {
    name: "Kannada",
    progress: 70
  }
],

interests: [
  "Cloud computing",
  "Open-source contribution",
  "Algorithmic problem solving",
  "Design systems"
]

}