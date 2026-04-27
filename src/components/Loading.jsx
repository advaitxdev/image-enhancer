import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='animate-spin border-4 border-t-transparent w-[3vmax] h-[3vmax] scale-200 rounded-full border-blue-500'></div>
    </div>
  )
}

export default Loading