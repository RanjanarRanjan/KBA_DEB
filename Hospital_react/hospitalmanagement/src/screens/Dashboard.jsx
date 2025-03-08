import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { add_doctor,user_list,d_list,list } from '../assets/images/Index'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-2 md:p-6 mt-[100px] ">
        
        <div className="flex flex-col gap-[10px] md:flex-row md:justify-evenly mb-[20px] mt-[60px]">
           
            <Link to='/Doctor_list' className="bg-white md:w-[400px] h-[100px] p-[4px] rounded-md flex justify-center gap-[10px]">
                <img className="w-[50px] md:w-[100px]" src={d_list} alt="book_appoinment"/>
                <h2 className="text-xl font-medium text-center mt-[25px]">Doctor List</h2>
            </Link>
            <Link to='/patient-list' className="bg-white md:w-[400px] h-[100px] p-[8px] rounded-md flex justify-center gap-[10px]">
                <img className="w-[100px]" src={user_list} alt="user list"/>
                <h2 className="text-xl font-medium text-center mt-[25px]">Patients Details</h2>
            </Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-[10px]">
            <Link to='/booking_details' className="bg-white md:w-[400px] h-[100px] p-[18px] rounded-md flex justify-center gap-[10px]">
                <img className="w-[100px]" src={list} alt="List"/>
                <h2 className="text-xl font-medium text-center mt-[15px]">Appoinment Details</h2>
            </Link>
            <Link to='/add_doctor' className="bg-white md:w-[400px] h-[100px] p-[18px] rounded-md flex justify-center">
                <img className="w-[180px]" src={add_doctor} alt="add_doctor"/>
                <h2 className="text-xl font-medium text-center mt-[15px]">Add Doctor</h2>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Dashboard