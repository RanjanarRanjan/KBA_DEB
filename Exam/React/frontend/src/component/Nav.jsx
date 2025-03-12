import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex text-blue-500'> 
             <Link to='/'>
                <button className="w-[200px] mt-[30px] bg-[#0098B9] py-2 rounded border-4 border-white text-white">
                            Home
                </button>
            </Link>
            <Link to='/view'>
                <button className="w-[200px] mt-[30px] bg-[#0098B9] py-2 rounded border-4 border-white text-white">
                            View item
                </button>
            </Link>
    </div>
  )
}

export default Nav