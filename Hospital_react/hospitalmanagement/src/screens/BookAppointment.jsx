// import React from 'react'
// import Header from '../components/Header'
// import { Link } from 'react-router-dom'

// const BookAppointment = () => {

  
//   return (
//     <div className="bg-[#0098B9] min-h-screen flex flex-col">
//         <Header/>
       
//         <div className="p-4">
//         <h1 className="text-white text-3xl hidden md:block">Welcome  User</h1>
//             <div className="h-[100vh] md:h-[70vh] bg-[#ffffff] border border-cyan-300 rounded-lg mt-[20px] p-4">
//                 <h1 className="md:text-2xl text-xl font-bold text-center mb-[30px]">Book an Appoinment</h1>
//                 <form className="mt-[20px] md:px-[100px]">
//                     <div className=" block md:flex md:justify-between mb-[10px] ">
//                         <label className="text-[20px] md:text-xl font-semibold text-center">Date</label>
//                         <input type="date" className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300"/>
//                     </div>
//                     <div className=" block md:flex md:justify-between mb-[10px] ">
//                         <label className="text-[20px] md:text-xl font-semibold text-center">Doctor Name</label>
//                         <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300">
//                             <option name="Department" value="0" selected disabled>Select Doctor</option>
//                             <option name="Department" value="1">Dr. John Doe</option>
//                         </select>
//                     </div>
                    // <div className=" block md:flex md:justify-between mb-[10px] ">
                    //     <label className="text-[20px] md:text-xl font-semibold text-center">Time slots</label>
                    //     <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300">
                    //         <option name="Department" value="0" selected disabled>Select Department</option>
                    //         <option name="Department" value="1">9.00 AM to  9.30 AM</option>
                    //     </select>
                    // </div>
                    // <div className="flex justify-between mt-[60px]">
                    //     <button className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]"><Link href="/Home">Cancel</Link></button>
                    //     <button className="bg-[#0098B9] py-2 px-8 rounded  border-4 border-white text-white">Confirm</button>
                    // </div>
//                 </form>
    
//             </div>
//         </div>
//     </div>
//   )
// }

// export default BookAppointment












// import React, { useState, useEffect } from 'react';
// import Header from '../components/Header';

// const BookAppointment = () => {
//     const [date, setDate] = useState('');
//     const [doctors, setDoctors] = useState([]);
//     const [selectedDoctor, setSelectedDoctor] = useState('');
//     const [timeSlots, setTimeSlots] = useState([]);

//     // Get tomorrow's date in YYYY-MM-DD format
//     const getTomorrowDate = () => {
//         const today = new Date();
//         today.setDate(today.getDate() + 1); // Move to next day
//         return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//     };

//     const fetchDoctors = async (selectedDate) => {
//         try {
//             if (!selectedDate) return;
    
//             // Convert date to YYYY-MM-DD format to avoid any inconsistencies
//             const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    
//             const response = await fetch(`/api/available_doctors?date=${formattedDate}`);
//             const data = await response.json();
//             if (response.ok) {
//                 setDoctors(data);
//             } else {
//                 setDoctors([]); // Clear if no doctors are available
//             }
//         } catch (error) {
//             console.error("Error fetching doctors:", error);
//         }
//     };
    

//     useEffect(() => {
//         fetchDoctors(date);
//     }, [date]);


//     const fetchTimeSlots = async (doctorName, selectedDate) => {
//         try {
//             if (!doctorName || !selectedDate) return;
    
//             const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
//             const response = await fetch(`/api/available_slots?doctor_name=${doctorName}&date=${formattedDate}`);
//             const data = await response.json();
    
//             if (response.ok) {
//                 setTimeSlots(data);
//             } else {
//                 setTimeSlots([]); // No available slots
//             }
//         } catch (error) {
//             console.error("Error fetching time slots:", error);
//         }
//     };

    
//     return (
//         <div className="bg-[#0098B9] min-h-screen flex flex-col">
//             <Header />
//             <div className="p-4">
//                 <h1 className="text-white text-3xl hidden md:block">Welcome User</h1>
//                 <div className="h-[100vh] md:h-[70vh] bg-[#ffffff] border border-cyan-300 rounded-lg mt-[20px] p-4">
//                     <h1 className="md:text-2xl text-xl font-bold text-center mb-[30px]">
//                         Book an Appointment
//                     </h1>
//                     <form className="mt-[20px] md:px-[100px]">
//                         <div className="block md:flex md:justify-between mb-[10px]">
//                             <label className="text-[20px] md:text-xl font-semibold text-center">
//                                 Date
//                             </label>
//                             <input  type="date" value={date} onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} // Ensures YYYY-MM-DD format
//                                     min={getTomorrowDate()} // Disable past and current date
//                                     className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300"/>
//                         </div>
//                         <div className="block md:flex md:justify-between mb-[10px]">
//                             <label className="text-[20px] md:text-xl font-semibold text-center">
//                                 Doctor Name
//                             </label>
//                             <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300" disabled={doctors.length === 0}
//                                 onChange={(e) => { 
//                                     setSelectedDoctor(e.target.value);
//                                     fetchTimeSlots(e.target.value, date); // Fetch time slots
//                                     }}>
//                                 <option value="" disabled selected>{doctors.length > 0 ? "Select Doctor" : "No doctors available"}</option>
//                                         {doctors.map((doctor, index) => (
//                                 <option key={index} value={doctor}>{doctor}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="block md:flex md:justify-between mb-[10px]">
//                             <label className="text-[20px] md:text-xl font-semibold text-center">
//                                 Doctor Time
//                             </label>
//                             <select className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300" disabled={timeSlots.length === 0}>
//                                 <option value="" disabled selected>{timeSlots.length > 0 ? "Select Time Slot" : "No available slots"}</option>
//                                 {timeSlots.map((slot, index) => (
//                                     <option key={index} value={`${slot.start_time} - ${slot.end_time}`}>
//                                         {slot.start_time} - {slot.end_time}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookAppointment;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const BookAppointment = () => {
    const [date, setDate] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    // Get tomorrow's date in YYYY-MM-DD format
    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    const fetchDoctors = async (selectedDate) => {
        try {
            if (!selectedDate) return;
            const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
            const response = await fetch(`/api/available_doctors?date=${formattedDate}`);
            const data = await response.json();
            if (response.ok) {
                setDoctors(data);
            } else {
                setDoctors([]);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors(date);
    }, [date]);

    const fetchTimeSlots = async (doctorName, selectedDate) => {
        try {
            if (!doctorName || !selectedDate) return;
            const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
            const response = await fetch(`/api/available_slots?doctor_name=${doctorName}&date=${formattedDate}`);
            const data = await response.json();
            if (response.ok) {
                setTimeSlots(data);
            } else {
                setTimeSlots([]);
            }
        } catch (error) {
            console.error("Error fetching time slots:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDoctor || !date || !selectedTimeSlot) {
            alert("Please fill all fields.");
            return;
        }

        const appointmentData = {
            doctor_name: selectedDoctor,
            appointment_date: date,
            time_slot: selectedTimeSlot
        };

        try {
            const response = await fetch('/api/book_appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Appointment booked successfully!");
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div className="bg-[#0098B9] min-h-screen flex flex-col">
            <Header />
            <div className="p-4">
                <h1 className="text-white text-3xl hidden md:block">Welcome User</h1>
                <div className="h-[100vh] md:h-[70vh] bg-[#ffffff] border border-cyan-300 rounded-lg mt-[20px] p-4">
                    <h1 className="md:text-2xl text-xl font-bold text-center mb-[30px]">
                        Book an Appointment
                    </h1>
                    <form className="mt-[20px] md:px-[100px]" onSubmit={handleSubmit}>
                        <div className="block md:flex md:justify-between mb-[10px]">
                            <label className="text-[20px] md:text-xl font-semibold text-center">
                                Date
                            </label>
                            <input  
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} 
                                min={getTomorrowDate()} 
                                className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300"
                            />
                        </div>
                        <div className="block md:flex md:justify-between mb-[10px]">
                            <label className="text-[20px] md:text-xl font-semibold text-center">
                                Doctor Name
                            </label>
                            <select 
                                className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300" 
                                disabled={doctors.length === 0}
                                onChange={(e) => { 
                                    setSelectedDoctor(e.target.value);
                                    fetchTimeSlots(e.target.value, date);
                                }}
                            >
                                <option value="" disabled selected>
                                    {doctors.length > 0 ? "Select Doctor" : "No doctors available"}
                                </option>
                                {doctors.map((doctor, index) => (
                                    <option key={index} value={doctor}>{doctor}</option>
                                ))}
                            </select>
                        </div>
                        <div className="block md:flex md:justify-between mb-[10px]">
                            <label className="text-[20px] md:text-xl font-semibold text-center">
                                Doctor Time
                            </label>
                            <select 
                                className="w-full md:w-[50%] h-[40px] rounded-lg border-2 border-cyan-300" 
                                disabled={timeSlots.length === 0}
                                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    {timeSlots.length > 0 ? "Select Time Slot" : "No available slots"}
                                </option>
                                {timeSlots.map((slot, index) => (
                                    <option key={index} value={`${slot.start_time} - ${slot.end_time}`}>
                                        {slot.start_time} - {slot.end_time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Added Buttons */}
                        <div className="flex justify-between mt-[60px]">
                            <button 
                                type="button"
                                className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]"
                            >
                                <Link href="/Home">Cancel</Link>
                            </button>
                            <button 
                                type="submit"
                                className="bg-[#0098B9] py-2 px-8 rounded border-4 border-white text-white"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;








