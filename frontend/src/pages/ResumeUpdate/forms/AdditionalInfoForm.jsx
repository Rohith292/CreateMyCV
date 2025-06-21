import React from 'react'
import Input from '../../../components/inputs/Input'
import RatingInput from '../../../components/ResumeSections/RatingInput'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const AdditionalInfoForm = ({languages,interests,updateArrayItem,addArrayItem,removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Additional Information</h2>

        {/*language section */}
        <div className='mt-6'>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>Languages</h3>
            <div className='flex flex-col gap-4'>
                {Array.isArray(languages) && languages?.map((lang,index)=>(
                    <div key={index}
                    className='border border-gray-200 ronded-lg p-4 relative'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                            <Input
                            label="Language"
                            placeholder="Tamil etc"
                            type="text"
                            value={lang.name||""}
                            onChange={({target})=>updateArrayItem("languages",index,"name",target.value)}

                            />
                            <div>
                                <label className='text-xs font-medium text-slate-600 mb-7 block'>
                                    Proficiency
                                </label>
                                <RatingInput 
                                value={lang.progress||0}
                                onChange={(value)=>updateArrayItem("languages",index,"progress",value)}
                                total={5}
                                />
                            </div>

                        </div>
                        {languages.length>1 && (
                            <button 
                                type="button"
                                className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                                onClick={()=>removeArrayItem("languages",index)}
                            >
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}

                <button 
                    type="button"
                    className='self-start flex items-center gap-2 px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 cursor-pointer'
                    onClick={()=>addArrayItem("languages",{
                        name:"",
                        progress:0
                    })}
                    >
                    <LuPlus />
                    Add Language
                </button>
            </div>
        </div>

        {console.log(interests)}

        <div className='mt-8 mb-4'>
            <h3 className='text-sm font-medium text-gray-700'>Interests</h3>
            <div className='flex flex-col '>
                {Array.isArray(interests) && interests?.map((interest,index)=>(
                    <div key={index} className=' rounded-lg relative'>
                        <Input 
                        placeholder="Eg reading"
                        value={interest||""}
                        onChange={({target})=>updateArrayItem("interests",index,null,target.value)}
                        />

                        {interests.length>1 && (
                            <button 
                            type='button'
                            className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                            onClick={()=>removeArrayItem("interests",index)}
                            >
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}

                <button 
                type="button"
                className='self-start flex items-center gap-2 px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 cursor-pointer'
                onClick={()=>addArrayItem("interests","")}
                >
                    <LuPlus />
                    Add Interests
                </button>
            </div>
        </div>
    </div>
  )
}

export default AdditionalInfoForm