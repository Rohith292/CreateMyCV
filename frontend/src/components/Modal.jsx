import React from 'react'

const Modal = ({
    children,
    isOpen,
    onClose,
    title,
    hideHeader,
    showActionBtn,
    actionBtnIcon = null,
    actionBtnText,
    onActionClick,
}) => {
   if(!isOpen) return null;// Ensuring modal does not render if not open

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
        <div 
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
            {!hideHeader && (
                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                    <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
                    {showActionBtn && typeof onActionClick === 'function' && (
  <button 
    className='btn-small-light mr-12'
    onClick={onActionClick}
  >
    {actionBtnIcon}
    {actionBtnText}
  </button>
)}

                </div>
            )}
            <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-2 right-2'
                onClick={onClose}
            >
                <svg 
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M1 1l6 6m0 6M7 7l6-6M7 7l-6 6'
                    />
                </svg>
            </button>
            <div className='flex-1 overflow-y-auto custom-scrollbar'>
                {children} {/* Rendering children prop */}
            </div>
        </div>
    </div>
  );
};
export default Modal;