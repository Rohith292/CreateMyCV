import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className='w-full bg-purple-50 h-1 overflow-hidden rounded-[2px]'>
        <div 
            className='h-1 bg-linear-to-r from-green-500/85 to-green-700 transition-all rounded'
            style={{width:`${progress}%`}}
        ></div>
    </div>
  )
}

export default StepProgress