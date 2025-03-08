
import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';

const AddDoctor = () => {
  const [doctorName, setDoctorName] = useState("");
  const [mailid, setMailid] = useState("");
  const [contact, setContact] = useState("");
  const [dutydays, setDutydays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([{ start_time: '', end_time: '' }]);
  const [image, setImage] = useState(null);

  const handleCheckboxChange = (day) => {
    setDutydays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start_time: '', end_time: '' }]);
  };

  const handleTimeChange = (index, field, value) => {
    let updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;

    const startTime = updatedTimeSlots[index].start_time;
    const endTime = updatedTimeSlots[index].end_time;

    // Validate start time is earlier than end time
    if (startTime && endTime && startTime >= endTime) {
      alert("Start time must be earlier than end time!");
      return;
    }

    // Ensure no duplicate time slots
    const isDuplicate = updatedTimeSlots.some((slot, i) => 
      i !== index && slot.start_time === startTime && slot.end_time === endTime
    );

    if (isDuplicate) {
      alert("Duplicate time slot detected!");
      return;
    }

    setTimeSlots(updatedTimeSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate contact number is exactly 10 digits
    if (contact.length !== 10) {
      alert("Contact number must be exactly 10 digits!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("doctor_name", doctorName);
      formData.append("email", mailid);
      formData.append("contact", contact);
      formData.append('working_days', JSON.stringify(dutydays));
      formData.append('time_schedules', JSON.stringify(timeSlots));
      if (image) {
        formData.append('doctorImage', image);
      }

      const res = await fetch("/api/add_doctor", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error adding doctor");
      }
      alert("Doctor added Successfully");
      setDoctorName("");
      setMailid("");
      setContact("");
      setDutydays([]);
      setTimeSlots([{ start_time: '', end_time: '' }]);
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Internal Server error");
    }
  };

  const handleCancel = () => {
    setDoctorName("");
    setMailid("");
    setContact("");
    setDutydays([]);
    setTimeSlots([{ start_time: '', end_time: '' }]);
    setImage(null);
  };

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-4 flex justify-center mt-[100px]">
        <div className="w-full max-w-4xl bg-white border border-cyan-300 rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Add Doctor</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Doctor Name */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-1/3 text-lg font-semibold">Doctor Name</label>
              <input 
                type="text" 
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full md:w-2/3 p-2 rounded border-2 border-cyan-300"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-1/3 text-lg font-semibold">Email-ID</label>
              <input 
                type="email" 
                value={mailid}
                onChange={(e) => setMailid(e.target.value)}
                className="w-full md:w-2/3 p-2 rounded border-2 border-cyan-300"
              />
            </div>

            {/* Contact */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-1/3 text-lg font-semibold">Contact</label>
              <input 
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full md:w-2/3 p-2 rounded border-2 border-cyan-300"
                maxLength="10"
              />
            </div>

            {/* Duty Days */}
            <div className="flex flex-col md:flex-row items-start">
              <label className="w-full md:w-1/3 text-lg font-semibold">Duty Days</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full md:w-2/3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={dutydays.includes(day)} 
                      onChange={() => handleCheckboxChange(day)} 
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="flex flex-col md:flex-row items-start">
              <label className="w-full md:w-1/3 text-lg font-semibold">Time Slot</label>
              <div className="w-full md:w-2/3 space-y-2">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="time" 
                      value={slot.start_time}
                      onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                      className="p-2 border rounded"
                    />
                    <input 
                      type="time" 
                      value={slot.end_time}
                      onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                      className="p-2 border rounded"
                    />
                  </div>
                ))}
                <button type="button" className="text-cyan-600 underline" onClick={addTimeSlot}>
                  + Add Time Slot
                </button>
              </div>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col md:flex-row items-center">
              <label className="w-full md:w-1/3 text-lg font-semibold">Upload Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <button type="button" className="w-full md:w-1/3 bg-white py-2 rounded border-4 border-[#0098B9] text-black"
                onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="w-full md:w-1/3 bg-[#0098B9] py-2 rounded border-4 border-white text-white">
                Add
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
