import React from 'react'
import { hospitalLogo, smallLogo} from '../assets/images/Index.jsx'

const Header = () => {
  return (
    <div>
        <header className="h-[80px] w-full flex justify-between bg-gradient-to-tr from-[#ffffff] to-[#0098B9] py-[25px] px-4 ">
            <div className="flex ">
                <a className="w-[100px] md:w-[200px]"><img src={hospitalLogo} alt="hospitalname" /></a>
                <a className="w-[20px] md:w-[50px]"><img src={smallLogo} alt="log" /></a>
            </div>
            <div className="text-white flex gap-[50px] text-xl ">
                <a href="home.html" className="border-2 border-[#ffffff] px-4  rounded hidden md:block">Dashboard</a>
                <a href="booking.html" className="hidden md:block">Book Appointment</a>
                <a href="history.html" className="hidden md:block">Appointment History</a>
                <a href="profile.html" className="hidden md:block">Profile</a>
                <a href="Login.html" className="text-[20px]">Logout</a>
            </div>
        </header>
    </div>
  )
}

export default Header