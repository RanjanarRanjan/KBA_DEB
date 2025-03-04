

import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const BookAppointment = () => {

  
  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
        <Header/>
       
        <div className="p-4">
        <h1 className="text-white text-3xl hidden md:block">Welcome  User</h1>
            <div className="h-[100vh] md:h-[70vh] bg-[#ffffff] border border-cyan-300 rounded-lg mt-[20px] p-4">
                <h1 className="md:text-2xl text-xl font-bold text-center mb-[30px]">Book an Appoinment</h1>
                <form className="mt-[20px] md:px-[100px]">
                    <div className=" block md:flex md:justify-between mb-[10px] ">
                        <label className="text-[20px] md:text-xl font-semibold text-center">Date</label>
                        <input type="date" className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300"/>
                    </div>
                    <div className=" block md:flex md:justify-between mb-[10px] ">
                        <label className="text-[20px] md:text-xl font-semibold text-center">Doctor Name</label>
                        <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300">
                            <option name="Department" value="0" selected disabled>Select Doctor</option>
                            <option name="Department" value="1">Dr. John Doe</option>
                        </select>
                    </div>
                    <div className=" block md:flex md:justify-between mb-[10px] ">
                        <label className="text-[20px] md:text-xl font-semibold text-center">Time slots</label>
                        <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300">
                            <option name="Department" value="0" selected disabled>Select Department</option>
                            <option name="Department" value="1">9.00 AM to  9.30 AM</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-[60px]">
                        <button className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]"><Link href="/Home">Cancel</Link></button>
                        <button className="bg-[#0098B9] py-2 px-8 rounded  border-4 border-white text-white">Confirm</button>
                    </div>
                </form>
    
            </div>
        </div>
    </div>
  )
}

export default BookAppointment