import React from 'react'
import Input from '../../../components/inputs/Input'

const ContactInfoForm = ({contactInfo,updateSection,}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
            Contact Information
        </h2>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-2'>
                <Input
                    label="Address"
                    placeholder="Short Address"
                    type="text"
                    value={contactInfo?.location||""}
                    onChange={({target})=>updateSection("location",target.value)}
                />
            </div>
            <Input
                label="Email"
                placeholder="abc@yahoo.com"
                type="email"
                value={contactInfo?.email||""}
                onChange={({target})=>updateSection("email",target.value)}
            />
            <Input
                label="Phone number"
                placeholder="986754832"
                type="text"
                value={contactInfo?.phone||""}
                onChange={({target})=>updateSection("phone",target.value)}
            />
            <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/username"
                type="text"
                value={contactInfo?.linkedIn||""}
                onChange={({target})=>updateSection("linkedIn",target.value)}
            />
            <Input
                label="Github"
                placeholder="https://github.com/username"
                type="text"
                value={contactInfo?.github||""}
                onChange={({target})=>updateSection("github",target.value)}
            />

        <div className='md:col-span-2'>
            <Input
                label="Portfolio/website"
                placeholder="https://yourwebsite.com"
                type="text"
                value={contactInfo?.website||""}
                onChange={({target})=>updateSection("website",target.value)}
            />
        </div>
        </div>
    </div>
  )
}

export default ContactInfoForm