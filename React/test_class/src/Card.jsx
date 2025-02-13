import React, { useState } from 'react'

const Card = ({title,text,customClasses}) => {
    const[likes,setlike]=useState(0);
    const [titlecolor,setTitle]=useState('text-black')

    const toggle=()=>{
        setTitle((prevColor)=>
        prevColor==='text-black'?'text-red-500':'text-black'
    )}
    
  return (
    <div className={`max-w-sm mb-[10px] p-[20px] ${customClasses}`}>
        <h2 className={`text-4xl ${titlecolor}`}>{title}</h2>
        <p >{text}</p>
        <button className='text-white border-2 p-4 border-black bg-green-700' onClick={()=>setlike(likes+1)}>likes:{likes}</button>
        <button className='text-white border-2 p-4 border-black bg-green-700 ml-[10px] hover:bg-blue-700' onClick={toggle}>ToggleTitle</button>
    </div>
  )
}

export default Card