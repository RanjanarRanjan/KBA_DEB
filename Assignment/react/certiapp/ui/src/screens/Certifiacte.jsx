import React from 'react'
import Nav from '../components/Nav'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Certifiacte = () => {
    const [certiID, setCertiID] = useState("");
    const [course, setCourse] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [grade, setGrade] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        const response = await fetch("/api/addcerti", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certi_id: certiID,
            course_name: course,
            candidate_name: candidateName,
            grade: grade,
            date: date,
          }),
        });
  
        const data = await response.text();
        if (response.ok) {
          alert("Certificate Issued Successfully!");
          navigate("/dashboard");
        } else {
          setError(data);
        }
      } catch (err) {
        setError("Something went wrong. Try again.");
      }
    };
  

  return (
    <div className="min-h-screen bg-gray-100 p-5 ">
        <Nav />
        <div className="bg-gray-100 p-5 mt-2.5 flex flex-col items-center min-h-screen">
      <h3 className="text-3xl mb-5">Certificate Dapp</h3>
      <form onSubmit={handleSubmit} className="bg-white border border-black p-5 w-96">
        <h3 className="text-2xl mb-4">Issue New Certificate</h3>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <label>Select Course*</label>
        <select
          className="w-full border border-black p-2 mt-1"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Blockchain">Certified Blockchain Associate</option>
          <option value="PCB">PCB</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>

        <label className="mt-3">Certificate ID*</label>
        <input
          type="text"
          className="w-full border border-black p-2 mt-1"
          placeholder="Certificate ID"
          value={certiID}
          onChange={(e) => setCertiID(e.target.value)}
          required
        />

        <label className="mt-3">Candidate Name*</label>
        <input
          type="text"
          className="w-full border border-black p-2 mt-1"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          required
        />

        <label className="mt-3">Select Grade*</label>
        <select
          className="w-full border border-black p-2 mt-1"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <label className="mt-3">Issue Date*</label>
        <input
          type="date"
          className="w-full border border-black p-2 mt-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-5 w-full bg-sky-400 text-white py-2 rounded-md hover:bg-sky-500"
        >
          Issue Certificate
        </button>
      </form>
    </div>
    </div>
  )
}

export default Certifiacte

