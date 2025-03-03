import React from 'react'
import { hospitalLogo, smallLogo} from '../assets/images/Index.jsx';


const Nav = () => {
  return (
    <div>
        <div className="flex justify-end ">
            <a className="w-[200px]"><img src={hospitalLogo} alt="hospitalname" /></a>
            <a className="w-[50px]"><img src={smallLogo} alt="log" /></a>
        </div>
    </div>
  )
}

export default Nav