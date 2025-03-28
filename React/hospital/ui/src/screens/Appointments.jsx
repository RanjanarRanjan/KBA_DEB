import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  // const handleRemove = async (id) => {
  //   try {
  //     const response = await fetch(`/api/deleteappointment`, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to remove appointment');
  //     }
      
  //     setAppointments(appointments.filter(app => app._id !== id));
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-4 mt-[100px]">
        <div className="h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4 overflow-x-auto">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : appointments.length === 0 ? (
            <p className="text-center">No appointments found</p>
          ) : (
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="border-b bg-cyan-300">
                  <th className="py-2 px-4">Sl No.</th>
                  <th className="py-2 px-4">Patient Name</th>
                  <th className="py-2 px-4">Doctor</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id} className="border-b border-black">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      {appointment.user_id?.fullname || 'Unknown'}
                    </td>
                    <td className="py-2 px-4">{appointment.doctor_name}</td>
                    <td className="py-2 px-4">{appointment.time_slot}</td>
                    <td className="py-2 px-4">{appointment.appointment_date}</td>
                    <td className="py-2 px-4">
                      {/* <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        onClick={() => handleRemove(appointment._id)}
                      >
                        Remove
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;



