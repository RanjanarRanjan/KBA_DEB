import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const EditDoctor = () => {
  const { doctorId } = useParams();
  const [doctorName, setDoctorName] = useState('');
  const [mailid, setMailid] = useState('');
  const [contact, setContact] = useState('');
  const [dutydays, setDutyDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([{ start_time: '', end_time: '' }]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctor/${doctorId}`);
        const data = await res.json();
        setDoctorName(data.doctor_name);
        setMailid(data.email);
        setContact(data.contact);
        setDutyDays(data.working_days);
        setTimeSlots(data.time_schedules);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const handleCheckboxChange = (day) => {
    setDutyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start_time: '', end_time: '' }]);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('doctor_name', doctorName);
      formData.append('email', mailid);
      formData.append('contact', contact);
      formData.append('working_days', JSON.stringify(dutydays));
      formData.append('time_schedules', JSON.stringify(timeSlots));
      if (image) {
        formData.append('doctorImage', image);
      }

      const res = await fetch(`/api/edit_doctor/${doctorId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error updating doctor');
      }
      alert('Doctor updated successfully');
    } catch (error) {
      console.error(error);
      alert('Internal Server Error');
    }
  };

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-4">
        <div className="md:h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-center">Edit Doctor</h1>
          <form onSubmit={handleSubmit} className="m-4 md:px-[100px]">
            <div className="flex justify-between mb-2">
              <label className="text-xl font-semibold">Doctor Name</label>
              <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="w-[60%] border rounded-lg p-2" />
            </div>
            <div className="flex justify-between mb-2">
              <label className="text-xl font-semibold">Email</label>
              <input type="email" value={mailid} onChange={(e) => setMailid(e.target.value)} className="w-[60%] border rounded-lg p-2" />
            </div>
            <div className="flex justify-between mb-2">
              <label className="text-xl font-semibold">Contact</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="w-[60%] border rounded-lg p-2" />
            </div>
            <div className="mb-2">
              <label className="text-xl font-semibold">Duty Days</label>
              <div className="flex gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <label key={day} className="ml-4">
                    <input type="checkbox" checked={dutydays.includes(day)} onChange={() => handleCheckboxChange(day)} /> {day}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <label className="text-xl font-semibold">Time Slots</label>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <input type="time" value={slot.start_time} onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)} />
                  <input type="time" value={slot.end_time} onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)} />
                </div>
              ))}
              <button type="button" className="text-cyan-600 underline" onClick={addTimeSlot}>+ Add Time Slot</button>
            </div>
            <div className="flex justify-between mb-4">
              <label className="text-xl font-semibold">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-[#0098B9] py-2 px-8 rounded text-white">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
