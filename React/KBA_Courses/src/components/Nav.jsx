import React from 'react'
import Logo1 from '../assets/Logo1.png';

const Nav = () => {
  return (
    <div>
        <nav className="flex justify-between bg-slate-600 px-8 ">
            <img src={Logo1} alt="logo" className="w-8 h-8" />
            <div className="flex gap-6 text-white  mt-9">
            <a href="home.html ">Home</a>
            <a href="allcourse.html">course</a>
            <a href="contact.html">Contact us</a>
            <a href="add.html">Add courses</a>
            <a href="login.html">Logout</a>
        </div>
        </nav>
    </div>
  )
}

export default Nav