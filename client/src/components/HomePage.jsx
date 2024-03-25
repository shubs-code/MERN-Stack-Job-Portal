import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
    
    <div className='h-[70vh] rounded-lg'
    style={{backgroundImage:'url("/background.jpg")',backgroundSize:"contain", backgroundRepeat:"no-repeat",backgroundPosition:"center"}}
    ></div>

    <div className='mt-4 text-2xl flex items-center justify-center'>
        Find your dream job <NavLink to="/signup" className="ml-2 text-blue-600">Register Now</NavLink>
    </div>

    </>
    
  )
}

export default HomePage