import React, { useState } from 'react'
import rp from '../assets/images/rp.png'

const Coursecard=({course})=>{
  const [showFullDescription,setShowFullDescription]=useState(false)
  const description=showFullDescription?course.description:course.description.substring(0,80)

  return (
    <div>
         <div class=' bg-purple-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
          <h2 class=' font-bold text-lg text-purple-900 '>{course.c_name}</h2>  {/* database name */}
            <img src={rp} alt="course thumbnail" class='w-80 h-40 ' />

            <p class='text-black group-hover:text-white my-2 mx-5'>{description} </p>
            <button className='flex flex-col w-full px-5 text-purple-400 hover:text-purple-600 py-2' onClick={()=>setShowFullDescription(!showFullDescription)}>{showFullDescription?'Less':'More'}</button>
            <a href="#" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5">Learn More</a>
        </div>
    </div>
  )
}

export default Coursecard