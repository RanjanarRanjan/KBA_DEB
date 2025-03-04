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



  const handleDelete = async (doctor_name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${doctor_name}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/deletedoctor", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ doctor_name }),
      });

      if (response.ok) {
        alert("Doctor deleted successfully");
        setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.doctor_name !== doctor_name));
      } else {
        alert("Failed to delete doctor");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the doctor");
    }
  };

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
                <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(doctor.doctor_name)}
                  >
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
