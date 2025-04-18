import React from 'react'
import kbalogo from '../assets/images/kbalogo.png'
const Nav = () => {
  return (
    <div>
        <div className='bg-purple-100 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md'>
        <div className='flex items-center'>

            <a href="#" >
                <img className='m-1p-2 size-12' src={kbalogo} alt="logo" />
            </a>
            
        </div>
        <div className='flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10'>
            <a href="#" className='ml-10'>Home</a>
            <a href="#" className='ml-10'>Courses</a>
            <a href="#" className='ml-10'>Contact Us</a>
            <a href="#" className='ml-10'>Add Course</a>
        </div>
    </div>
    </div>
  )
}

export default Nav