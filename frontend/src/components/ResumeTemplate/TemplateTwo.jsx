import React, { useRef } from 'react';
import {
  LuGithub, LuMail, LuMapPinHouse, LuPhone, LuRss, LuUser
} from 'react-icons/lu';
import { RiLinkedinLine } from "react-icons/ri";

import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';

import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => (
  <div className='relative w-fit mb-2.5'>
    <span className='absolute bottom-0 left-0 w-full h-2' style={{ backgroundColor: color }}></span>
    <h2 className='relative text-sm font-bold'>{text}</h2>
  </div>
);

const TemplateTwo = ({ resumeData, colorPalette }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);

  return (
    <div
      ref={resumeRef}
      className="print-container p-3 bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "10mm",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div className='px-10 pt-6 pb-3 break-inside-avoid-page'>
        <div className='flex items-start gap-5 mb-5'>
          <div className='w-[140px] h-[140px] rounded-2xl flex items-center justify-center' style={{ backgroundColor: themeColors[1] }}>
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img src={resumeData.profileInfo.profilePreviewUrl} className='w-[140px] h-[140px] rounded-2xl' />
            ) : (
              <div className='w-[140px] h-[140px] flex items-center justify-center text-5xl rounded-full' style={{ color: themeColors[4] }}>
                <LuUser />
              </div>
            )}
          </div>

          <div>
            <div className='grid grid-cols-12 gap-2 items-center'>
              <div className='col-span-6'>
                <h2 className='text-2xl font-bold'>{resumeData.profileInfo.fullName}</h2>
                <p className='text-[15px] font-semibold mb-2'>{resumeData.profileInfo.designation}</p>
                <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={resumeData.contactInfo.location} />
              </div>
              <div className='col-span-6 flex flex-col gap-5 mt-2'>
                <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={resumeData.contactInfo.email} />
                <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={resumeData.contactInfo.phone} />
              </div>
              <div className='col-span-6'>
                <div className='space-y-2'>
                  {resumeData.contactInfo.linkedIn && (
                    <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[2]} value={resumeData.contactInfo.linkedIn} />
                  )}
                  {resumeData.contactInfo.github && (
                    <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={resumeData.contactInfo.github} />
                  )}
                </div>
              </div>
              <div className='col-span-6'>
                <ContactInfo icon={<LuRss />} iconBG={themeColors[2]} value={resumeData.contactInfo.website} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-10 pb-3'>
        <div className='break-inside-avoid-page'>
          <Title text="Professional Summary" color={themeColors[1]} />
          <p className='text-sm font-medium'>{resumeData.profileInfo.summary}</p>
        </div>

        <div className='mt-2 break-inside-avoid-page'>
          <Title text='Work Experience' color={themeColors[1]} />
          {resumeData.userExperience.map((data, index) => (
            <WorkExperience
              key={`userExperience_${index}`}
              itemIndex={index}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>

        <div className='mt-2 break-inside-avoid-page'>
          <Title text="Projects" color={themeColors[1]} />
          {resumeData.projects.map((project, index) => (
            <ProjectInfo
              key={`project_${index}`}
              itemIndex={index}
              title={project.title}
              decription={project.description}
              githubLink={project.github}
              liveDemoUrl={project.liveDemo}
              bgColor={themeColors[2]}
            />
          ))}
        </div>

        <div className='mt-3 break-inside-avoid-page'>
          <Title text="Education" color={themeColors[1]} />
          <div className='grid grid-cols-2 gap-3'>
            {resumeData.education.map((data, index) => (
              <EducationInfo
                key={`education_${index}`}
                itemIndex={index}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              />
            ))}
          </div>
        </div>

        <div className='mt-2 break-inside-avoid-page'>
          <Title text="Certifications" color={themeColors[1]} />
          <div className='grid grid-cols-2 gap-6'>
            {resumeData.certifications.map((data, index) => (
              <CertificationInfo
                key={`certification_${index}`}
                itemIndex={index}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
        </div>

        <div className='mt-2 break-inside-avoid-page'>
          <Title text="Skills" color={themeColors[1]} />
          <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[2]} />
        </div>

        <div className="print-grid-wrapper break-inside-avoid-page">
  <div className="print-grid-col">
    <Title text="Languages" color={themeColors[1]} />
    <LanguageSection
      languages={resumeData.languages}
      accentColor={themeColors[3]}
      bgColor={themeColors[2]}
    />
  </div>

  {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
    <div className="print-grid-col">
      <Title text="Interests" color={themeColors[1]} />
      <div className="flex flex-wrap gap-2 mt-3 text-[11px] leading-tight">
        {resumeData.interests.map((interest, index) =>
          interest ? (
            <div
              key={`interest_${index}`}
              className="py-1 px-2 rounded"
              style={{ backgroundColor: themeColors[2] }}
            >
              {interest}
            </div>
          ) : null
        )}
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default TemplateTwo;
