import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const CertificationInfoForm = ({certificationInfo,updateArrayItem,addArrayItem,removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Certifications</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {Array.isArray(certificationInfo) && certificationInfo.map((certification,index)=>(
                <div  key={index} className='border border-gray-200/80 p-4 relative rounded-lg'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                        label="Certication title"
                        placeholder="Data Science certificate"
                        type="text"
                        value={certification.title||""}
                        onChange={({target})=>updateArrayItem(index,"title",target.value)}
                        />
                        <Input
                        label="Issuer"
                        placeholder="NPTEL"
                        type="text"
                        value={certification.issuer||""}
                        onChange={({target})=>updateArrayItem(index,"issuer",target.value)}
                        />
                        <Input
                        label="Issuing Year"
                        placeholder="2024"
                        type="text"
                        value={certification.year||""}
                        onChange={({target})=>updateArrayItem(index,"year",target.value)}
                        />
                    </div>

                    {certificationInfo.length>1 && (
                        <button 
                            type="button"
                            className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                            onClick={()=>removeArrayItem(index)}
                        ><LuTrash2/></button>
                    )}

                </div>

            ))}
            <button 
                type='button'
                className='self-start flex items-center gap-2 px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 cursor-pointer'
                onClick={()=>addArrayItem({
                    title:"",
                    issuer:"",
                    year:"",
                })}
            ><LuPlus /> Add Certifications</button>
        </div>
    </div>
  )
}

export default CertificationInfoForm