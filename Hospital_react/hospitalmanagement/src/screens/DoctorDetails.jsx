// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const DoctorDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [workingDays, setWorkingDays] = useState([]);

//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`/api/getdoctor/${id}`, {
//           method: "GET",
//           credentials: "include",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setDoctor(data);
//           setTimeSlots(data.time_schedules || []);
//           setWorkingDays(data.working_days || []);
//         } else {
//           console.error("Failed to fetch doctor details");
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctorDetails();
//   }, [id]);

//   const handleTimeChange = (index, field, value) => {
//     const updatedTimeSlots = [...timeSlots];
//     updatedTimeSlots[index][field] = value;
//     setTimeSlots(updatedTimeSlots);
//   };

//   const addTimeSlot = () => {
//     setTimeSlots([...timeSlots, { start_time: "", end_time: "" }]);
//   };

//   const deleteTimeSlot = (index) => {
//     const updatedTimeSlots = timeSlots.filter((_, i) => i !== index);
//     setTimeSlots(updatedTimeSlots);
//   };

//   const toggleWorkingDay = (day) => {
//     if (workingDays.includes(day)) {
//       setWorkingDays(workingDays.filter((d) => d !== day));
//     } else {
//       setWorkingDays([...workingDays, day]);
//     }
//   };

//   const handleUpdateDoctor = async () => {
//     console.log("Updating Doctor with ID:", id);
  
//     try {
//       const response = await fetch(`/api/updatedoctor/${id}`, { // Ensure correct URL
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           working_days: workingDays,
//           time_schedules: timeSlots, 
//         }),
//       });
  
//       // Check if response is valid JSON before parsing
//       const text = await response.text();
//       try {
//         const result = JSON.parse(text);
//         console.log("Update Response:", result);
  
//         if (response.ok) {
//           alert("Doctor details updated successfully!");
//         } else {
//           alert("Failed to update doctor: " + (result.message || "Unknown error"));
//         }
//       } catch (jsonError) {
    
//         alert("Server returned an invalid response");
//       }
//     } catch (error) {
//       console.error("Error updating doctor:", error);
//       alert("An error occurred while updating the doctor");
//     }
//   };
  
//   if (loading) {
//     return <div>Loading doctor details...</div>;
//   }

//   if (!doctor) {
//     return <div>Doctor not found.</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="md:h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4">
//         <h1 className="text-2xl font-bold text-center">Doctor Details</h1>
//         <form className="m-4 md:mt-[20px] md:px-[100px]">
//           <div className="flex justify-between mb-[10px]">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Email-ID</label>
//             <input type="email" value={doctor.email} readOnly className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300" />
//           </div>

//           <div className="flex justify-between mb-[10px]">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Contact</label>
//             <input type="number" value={doctor.contact} readOnly className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300" />
//           </div>

//           {/* Working Days */}
//           <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
//             <label className="text-[13px] md:text-xl font-semibold text-center">Duty Days</label>
//             <div className="grid grid-cols-6 md:flex">
//               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
//                 <label key={day} className="ml-4">
//                   <input type="checkbox" checked={workingDays.includes(day)} onChange={() => toggleWorkingDay(day)} />
//                   {day}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Time Slots */}
//           <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
//             <label className="text-[13px] md:text-xl font-semibold text-center">Time Slot</label>
//             <div>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex gap-2 items-center">
//                   <input type="time" value={slot.start_time} onChange={(e) => handleTimeChange(index, "start_time", e.target.value)} />
//                   <input type="time" value={slot.end_time} onChange={(e) => handleTimeChange(index, "end_time", e.target.value)} />
//                   <button type="button" className="text-red-600 underline" onClick={() => deleteTimeSlot(index)}>Delete</button>
//                 </div>
//               ))}
//               <button type="button" className="text-cyan-600 underline" onClick={addTimeSlot}>+ Add Time Slot</button>
//             </div>
//           </div>

//           {/* Doctor Image */}
//           <div className="flex justify-between mb-4">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Doctor Image</label>
//             {doctor.image ? (
//               <img src={`data:image/png;base64,${doctor.image}`} alt={doctor.doctor_name} className="w-[150px] h-[200px] rounded-md border border-gray-300" />
//             ) : (
//               <p>No Image Available</p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between md:mt-[50px]">
//             <button type="button" className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]" onClick={() => navigate(-1)}>Back</button>
//             <button type="button" className="bg-[#0098B9] py-2 px-8 rounded border-4 border-white text-white" onClick={handleUpdateDoctor}>Update</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DoctorDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const DoctorDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [workingDays, setWorkingDays] = useState([]);
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`/api/getdoctor/${id}`, {
//           method: "GET",
//           credentials: "include",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setDoctor(data);
//           setEmail(data.email || "");
//           setContact(data.contact || "");
//           setTimeSlots(data.time_schedules || []);
//           setWorkingDays(data.working_days || []);
//         } else {
//           console.error("Failed to fetch doctor details");
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctorDetails();
//   }, [id]);

//   const handleImageChange = (event) => {
//     setImageFile(event.target.files[0]);
//   };

//   const handleTimeChange = (index, field, value) => {
//     const updatedTimeSlots = [...timeSlots];
//     updatedTimeSlots[index][field] = value;
//     setTimeSlots(updatedTimeSlots);
//   };

//   const addTimeSlot = () => {
//     setTimeSlots([...timeSlots, { start_time: "", end_time: "" }]);
//   };

//   const deleteTimeSlot = (index) => {
//     setTimeSlots(timeSlots.filter((_, i) => i !== index));
//   };

//   const toggleWorkingDay = (day) => {
//     if (workingDays.includes(day)) {
//       setWorkingDays(workingDays.filter((d) => d !== day));
//     } else {
//       setWorkingDays([...workingDays, day]);
//     }
//   };

//   const handleUpdateDoctor = async () => {
//     console.log("Updating Doctor with ID:", id);

//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("contact", contact);
//     formData.append("working_days", JSON.stringify(workingDays));
//     formData.append("time_schedules", JSON.stringify(timeSlots));
//     if (imageFile) {
//       formData.append("doctor_image", imageFile);
//     }

//     try {
//       const response = await fetch(`/api/updatedoctor/${id}`, {
//         method: "PUT",
//         credentials: "include",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Doctor details updated successfully!");
//       } else {
//         alert("Failed to update doctor: " + (result.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error updating doctor:", error);
//       alert("An error occurred while updating the doctor");
//     }
//   };

//   if (loading) {
//     return <div>Loading doctor details...</div>;
//   }

//   if (!doctor) {
//     return <div>Doctor not found.</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="md:h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4">
//         <h1 className="text-2xl font-bold text-center">Doctor Details</h1>
//         <form className="m-4 md:mt-[20px] md:px-[100px]">
//           <div className="flex justify-between mb-[10px]">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Email-ID</label>
//             <input 
//               type="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300"
//             />
//           </div>

//           <div className="flex justify-between mb-[10px]">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Contact</label>
//             <input 
//               type="number" 
//               value={contact} 
//               onChange={(e) => setContact(e.target.value)}
//               className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300"
//             />
//           </div>

//           {/* Working Days */}
//           <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
//             <label className="text-[13px] md:text-xl font-semibold text-center">Duty Days</label>
//             <div className="grid grid-cols-6 md:flex">
//               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
//                 <label key={day} className="ml-4">
//                   <input type="checkbox" checked={workingDays.includes(day)} onChange={() => toggleWorkingDay(day)} />
//                   {day}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Time Slots */}
//           <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
//             <label className="text-[13px] md:text-xl font-semibold text-center">Time Slot</label>
//             <div>
//               {timeSlots.map((slot, index) => (
//                 <div key={index} className="flex gap-2 items-center">
//                   <input type="time" value={slot.start_time} onChange={(e) => handleTimeChange(index, "start_time", e.target.value)} />
//                   <input type="time" value={slot.end_time} onChange={(e) => handleTimeChange(index, "end_time", e.target.value)} />
//                   <button type="button" className="text-red-600 underline" onClick={() => deleteTimeSlot(index)}>Delete</button>
//                 </div>
//               ))}
//               <button type="button" className="text-cyan-600 underline" onClick={addTimeSlot}>+ Add Time Slot</button>
//             </div>
//           </div>

//           {/* Doctor Image Upload */}
//           <div className="flex justify-between mb-4">
//             <label className="text-[10px] md:text-xl font-semibold text-center">Doctor Image</label>
//             <input type="file" onChange={handleImageChange} />
//             {doctor.image && (
//               <img src={`data:image/png;base64,${doctor.image}`} alt="Doctor" className="w-[150px] h-[200px] rounded-md border border-gray-300" />
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between md:mt-[50px]">
//             <button type="button" className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]" onClick={() => navigate(-1)}>Back</button>
//             <button type="button" className="bg-[#0098B9] py-2 px-8 rounded border-4 border-white text-white" onClick={handleUpdateDoctor}>Update</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DoctorDetails;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`/api/getdoctor/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
          setEmail(data.email || "");
          setContact(data.contact || "");
          setTimeSlots(data.time_schedules || []);
          setWorkingDays(data.working_days || []);
        } else {
          console.error("Failed to fetch doctor details");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start_time: "", end_time: "" }]);
  };

  const deleteTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const toggleWorkingDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      alert("Email is required!");
      return false;
    }
    if (!contact.trim()) {
      alert("Contact number is required!");
      return false;
    }
    if (workingDays.length === 0) {
      alert("At least one working day must be selected!");
      return false;
    }
    if (timeSlots.length === 0) {
      alert("At least one time slot is required!");
      return false;
    }
    return true;
  };

  const handleUpdateDoctor = async () => {
    if (!validateForm()) return;

    console.log("Updating Doctor with ID:", id);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("working_days", JSON.stringify(workingDays));
    formData.append("time_schedules", JSON.stringify(timeSlots));
    if (imageFile) {
      formData.append("doctor_image", imageFile);
    }

    try {
      const response = await fetch(`/api/updatedoctor/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Doctor details updated successfully!");
      } else {
        alert("Failed to update doctor: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("An error occurred while updating the doctor");
    }
  };

  if (loading) {
    return <div>Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader/>
      <div className="md:h-fit bg-[#ffffff] border border-cyan-300 rounded-lg m-4 p-2">
        <h1 className="text-2xl font-bold text-center">Doctor Details</h1>
        <form className="m-4 md:mt-[20px] md:px-[100px]">
          <div className="flex justify-between mb-[10px]">
            <label className="text-[10px] md:text-xl font-semibold text-center">Email-ID</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300"
              required
            />
          </div>

          <div className="flex justify-between mb-[10px]">
            <label className="text-[10px] md:text-xl font-semibold text-center">Contact</label>
            <input 
              type="number" 
              value={contact} 
              onChange={(e) => setContact(e.target.value)}
              className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-cyan-300"
              required
            />
          </div>

          {/* Working Days */}
          <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
            <label className="text-[13px] md:text-xl font-semibold text-center">Duty Days</label>
            <div className="grid grid-cols-6 md:flex">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day} className="ml-4">
                  <input type="checkbox" checked={workingDays.includes(day)} onChange={() => toggleWorkingDay(day)} />
                  {day}
                </label>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex flex-col md:flex-row md:justify-between mb-[10px]">
            <label className="text-[13px] md:text-xl font-semibold text-center">Time Slot</label>
            <div>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input type="time" value={slot.start_time} onChange={(e) => handleTimeChange(index, "start_time", e.target.value)} required />
                  <input type="time" value={slot.end_time} onChange={(e) => handleTimeChange(index, "end_time", e.target.value)} required />
                  <button type="button" className="text-red-600 underline" onClick={() => deleteTimeSlot(index)}>Delete</button>
                </div>
              ))}
              <button type="button" className="text-cyan-600 underline" onClick={addTimeSlot}>+ Add Time Slot</button>
            </div>
          </div>

          {/* Doctor Image Upload */}
          <div className="flex justify-between mb-4">
            <label className="text-[10px] md:text-xl font-semibold text-center">Doctor Image</label>
            <input type="file" onChange={handleImageChange} />
            {doctor.image && (
              <img src={`data:image/png;base64,${doctor.image}`} alt="Doctor" className="w-[150px] h-[200px] rounded-md border border-gray-300" />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between md:mt-[50px]">
            <button type="button" className="bg-white py-2 px-6 rounded border-4 border-[#0098B9]" onClick={() => navigate(-1)}>Back</button>
            <button type="button" className="bg-[#0098B9] py-2 px-8 rounded border-4 border-white text-white" onClick={handleUpdateDoctor}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorDetails;
