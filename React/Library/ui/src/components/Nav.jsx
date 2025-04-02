import React from 'react'
import Buecher from "../assets/Buecher-coloured.svg";
import {search} from "../assets/Index.jsx"

const Nav = () => {
  return (
    <div>
        <nav className="flex justify-between bg-[#03615C] px-[50px] pt-[20px] pb-[15px] text-white fixed w-full">
            <div className="flex justify-start">
                <a className="block w-[40px]"><img src={Buecher} alt="logo" /></a>
                <p className="font-[cursive] text-[20px]">LibraryWorld</p>
            </div>
        </nav>
    </div>
  )
}

export default Nav