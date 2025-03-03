import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/getdoctor", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.length === 0 ? (
            <div className="col-span-full text-center py-4 text-gray-700">
              No doctors found.
            </div>
          ) : (
            doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-lg border border-cyan-300 p-4 shadow-md flex flex-col"
              >
                {/* Doctor Image */}
                <div className="w-full h-48 mb-4 flex justify-center items-center">
                  {doctor.image ? (
                    <img
                      src={`data:image/png;base64,${doctor.image}`}
                      alt={doctor.doctor_name}
                      className="w-[150px] h-[200px] w-full rounded-md"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full w-full rounded-md flex justify-center items-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                {/* Doctor Details */}
                <h2 className="text-xl font-bold mb-2">{doctor.doctor_name}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Contact:</strong> {doctor.contact}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Duty Days:</strong> {doctor.working_days.join(", ")}
                </p>
                {/* Action Buttons */}
                <div className="mt-auto flex justify-between">
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Remove
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                    <Link to={`/edit_doctor/${doctor._id}`}>Edit</Link>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;


// import React, { useState, useEffect } from 'react';
// import AdminHeader from '../components/AdminHeader';
// import { Link } from 'react-router-dom'; 

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("/api/getdoctor", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setDoctors(data);
//         } else {
//           console.error("Failed to fetch doctors");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <div className="bg-[#0098B9] min-h-screen flex flex-col">
//       <AdminHeader />
//       <div className="p-4">
//         <div className="h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4 overflow-x-auto">
//           <table className="w-full text-left text-gray-700">
//             <thead>
//               <tr className="border-b bg-cyan-300">
//                 <th className="py-2 px-4">Sl No.</th>
//                 <th className="py-2 px-4">Doctor Name</th>
//                 <th className="py-2 px-4">Email</th>
//                 <th className="py-2 px-4">Contact</th>
//                 <th className="py-2 px-4">Duty Days</th>
//                 <th className="py-2 px-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     No doctors found.
//                   </td>
//                 </tr>
//               ) : (
//                 doctors.map((doctor, index) => (
//                   <tr key={doctor._id} className="border-b border-black">
//                     <td className="py-2 px-4">{index + 1}</td>
//                     <td className="py-2 px-4">{doctor.doctor_name}</td>
//                     <td className="py-2 px-4">{doctor.email}</td>
//                     <td className="py-2 px-4">{doctor.contact}</td>
//                     <td className="py-2 px-4">{doctor.working_days.join(", ")}</td>
//                     <td className="py-2 px-4">
//                       <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
//                         Remove
//                       </button>
//                       <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2">
//                         <Link to={`/edit_doctor/${doctor._id}`}>Edit</Link>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorList;

