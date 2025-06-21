import React from 'react'

const TemplateCard = ({thumbnailImg,isSelected,onSelect}) => {
  return (
    <div className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-green-300 cursor-pointer overflow-hidden 
        ${isSelected?"border-green-500 border-2 ":""}
        `}
        onClick={onSelect}

        >
            {thumbnailImg ? (
                <img src={thumbnailImg} alt="" className='w-[100%] rounded'/>
            ):(
                <div>
                    </div>
            )}
        </div>
  )
}

export default TemplateCard

