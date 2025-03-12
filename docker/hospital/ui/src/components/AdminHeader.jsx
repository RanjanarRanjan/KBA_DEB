import React from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import { hospitalLogo, smallLogo } from '../assets/images/Index.jsx';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed:", data.msg);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div >
        <header className="h-[80px] w-full fixed flex justify-between bg-gradient-to-tr from-[#ffffff] to-[#0098B9] py-[25px] px-4">
            <div className="flex ">
                <a className="w-[100px] md:w-[200px]"><img src={hospitalLogo} alt="hospitalname"/></a>
                <a className="w-[20px] md:w-[50px]"><img src={smallLogo} alt="log"/></a>
            </div>
            <div className="text-white flex gap-[50px] text-xl">
            <NavLink 
                to="/Dashboard" 
                className={({ isActive }) => 
                `px-4 rounded hidden md:block ${isActive ? 'border-2 border-white bg-[#007a99]' : ''}`
                }>
            Dashboard
          </NavLink>
          <NavLink 
            to="/Doctor_list" 
            className={({ isActive }) => 
              `hidden md:block ${isActive ? 'border-2 border-white bg-[#007a99]' : ''}`
            }
          >
            DoctorList
          </NavLink>
          <NavLink 
            to="/patient-list" 
            className={({ isActive }) => 
              `hidden md:block ${isActive ? 'border-2 border-white bg-[#007a99]' : ''}`
            }
          >
            Patients Details
          </NavLink>
          <NavLink 
            to="/booking_details" 
            className={({ isActive }) => 
              `hidden md:block ${isActive ? 'border-2 border-white bg-[#007a99]' : ''}`
            }
          >
            Appointment Details
          </NavLink>
          <NavLink 
            to="/add_doctor" 
            className={({ isActive }) => 
              `hidden md:block ${isActive ? 'border-2 border-white bg-[#007a99]' : ''}`
            }
          >
            Add Doctor
          </NavLink>
          <button
            onClick={handleLogout}
            className="px-4 rounded  md:block bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => navigate('/Dashboard')}
          className="bg-[#007a99] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#005f73]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;







// import React from 'react'
// import { hospitalLogo, smallLogo} from '../assets/images/Index.jsx' 

// const AdminHeader = () => {
//   return (
//     <div>
//         <header className="h-[80px] w-full flex justify-between bg-gradient-to-tr from-[#ffffff] to-[#0098B9] py-[25px] px-4 ">
//             <div className="flex ">
//                 <a className="w-[100px] md:w-[200px]"><img src={hospitalLogo} alt="hospitalname"/></a>
//                 <a className="w-[20px] md:w-[50px]"><img src={smallLogo} alt="log"/></a>
//             </div>
//             <div className="text-white flex gap-[50px] text-xl ">
//                 <a href="admin_home.html" className="border-2 border-[#ffffff] px-4  rounded hidden md:block">Dashboard</a>
//                 <a href="admin_doctor.html" className="hidden md:block">Doctor List</a>
//                 <a href="admin_patient.html" className="hidden md:block">Patients Details </a>
//                 <a href="admin_booking_details.html" className="hidden md:block">Appoinment details</a>
//                 <a href="add_doctor.html" className="hidden md:block">Add Doctor</a>
//                 <a href="Login.html">Logout</a>
//             </div>
//         </header>
//     </div>
//   )
// }

// export default AdminHeader