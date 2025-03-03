import React from 'react'
import AdminHeader from '../components/AdminHeader'

const DoctorList = () => {
  return (
    <div classNameName="bg-[#0098B9] min-h-screen flex flex-col">
        <AdminHeader/>
        <div className="p-4">
            <div className="h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead>
                  <tr className="border-b bg-cyan-300">
                      <th className="py-2 px-4">sl no.</th>
                      <th className="py-2 px-4">Doctor Name</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">Dr. John Doe</td>
                  <td className="py-2 px-4">johndoe@example.com</td>
                  <td className="py-2 px-4">
                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Remove</button>
                    <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-red-600"><a href="add_doctor.html">Edit</a></button>
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
    </div>
    
    </div>
  )
}

export default DoctorList