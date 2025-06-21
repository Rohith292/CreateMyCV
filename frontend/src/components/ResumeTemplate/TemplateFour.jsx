// TemplateFourModernSplit.js
import React, { useEffect, useRef, useState } from 'react';
import {
  LuGithub, LuMail, LuMapPinHouse, LuPhone, LuRss, LuUser
} from 'react-icons/lu';
import { RiLinkedinLine } from 'react-icons/ri';
import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ['#FFFFFF', '#1F2937', '#E5E7EB', '#3B82F6', '#111827'];

const SectionTitle = ({ text, color }) => (
  <h2 className="text-xs uppercase font-semibold tracking-wider mb-3 border-b pb-1" style={{ borderColor: color }}>
    {text}
  </h2>
);

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualWidth);
    setScale(containerWidth / actualWidth);
  }, [containerWidth]);

  return (
    <div className="p-4 bg-white" ref={resumeRef}
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
        width: containerWidth > 0 ? `${baseWidth}px` : 'auto',
        height: 'auto'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-5 border-b pb-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          {resumeData.profileInfo.profilePreviewUrl ? (
            <img src={resumeData.profileInfo.profilePreviewUrl} className="w-full h-full object-cover" />
          ) : (
            <LuUser size={36} className="text-gray-500" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{resumeData.profileInfo.fullName}</h1>
          <p className="text-sm text-gray-500">{resumeData.profileInfo.designation}</p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-12 gap-6 text-sm">
        {/* Left Side */}
        <div className="col-span-4 space-y-6">
          {/* Contact */}
          <div>
            <SectionTitle text="Contact" color={themeColors[3]} />
            <div className="space-y-2">
              <ContactInfo icon={<LuMapPinHouse />} value={resumeData.contactInfo.location} iconBG={themeColors[3]} />
              <ContactInfo icon={<LuMail />} value={resumeData.contactInfo.email} iconBG={themeColors[3]} />
              <ContactInfo icon={<LuPhone />} value={resumeData.contactInfo.phone} iconBG={themeColors[3]} />
              {resumeData.contactInfo.linkedIn && (
                <ContactInfo icon={<RiLinkedinLine />} value={resumeData.contactInfo.linkedIn} iconBG={themeColors[3]} />
              )}
              {resumeData.contactInfo.github && (
                <ContactInfo icon={<LuGithub />} value={resumeData.contactInfo.github} iconBG={themeColors[3]} />
              )}
              <ContactInfo icon={<LuRss />} value={resumeData.contactInfo.website} iconBG={themeColors[3]} />
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionTitle text="Skills" color={themeColors[3]} />
            <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>

          {/* Education */}
          <div>
            <SectionTitle text="Education" color={themeColors[3]} />
            {resumeData.education.map((edu, i) => (
              <EducationInfo
                key={i}
                itemIndex={i}
                degree={edu.degree}
                institution={edu.institution}
                duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
              />
            ))}
          </div>

          {/* Languages */}
          <div>
            <SectionTitle text="Languages" color={themeColors[3]} />
            <LanguageSection languages={resumeData.languages} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          <div>
            <SectionTitle text="Summary" color={themeColors[3]} />
            <p className="text-gray-700">{resumeData.profileInfo.summary}</p>
          </div>

          {/* Experience */}
          <div>
            <SectionTitle text="Experience" color={themeColors[3]} />
            {resumeData.userExperience.map((exp, i) => (
              <WorkExperience
                key={i}
                itemIndex={i}
                company={exp.company}
                role={exp.role}
                duration={`${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                description={exp.description}
                durationColor={themeColors[4]}
              />
            ))}
          </div>

          {/* Projects */}
          <div>
            <SectionTitle text="Projects" color={themeColors[3]} />
            {resumeData.projects.map((proj, i) => (
              <ProjectInfo
                key={i}
                itemIndex={i}
                title={proj.title}
                decription={proj.description}
                githubLink={proj.github}
                liveDemoUrl={proj.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div>
              <SectionTitle text="Certifications" color={themeColors[3]} />
              {resumeData.certifications.map((cert, i) => (
                <CertificationInfo
                  key={i}
                  itemIndex={i}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          )}

          {/* Interests */}
          {resumeData.interests.length > 0 && (
            <div>
              <SectionTitle text="Interests" color={themeColors[3]} />
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((int, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-xs">{int}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateFour;
