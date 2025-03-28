import React from "react";
import { useLocation, Link } from "react-router-dom";
import image from "../assets/image.png";

const View = () => {
  const location = useLocation();
  const certiData = location.state?.certiData;

  return (
    <div className="bg-gray-100 p-5 min-h-screen">
    
      <div className="flex justify-end gap-4">
        <Link className="text-sky-600 hover:underline" to="/dashboard">
          Home
        </Link>
      </div>

      {/* Certificate View */}
      <div className="flex flex-col bg-white text-center items-center mt-10 py-6 border border-black shadow-md">
        <div className="w-11/12 py-4">
          <h1 className="text-3xl font-extrabold">Kerala Blockchain Academy</h1>
          <img className="mt-4 w-52 mx-auto" src={image} alt="logo" />
          
          {certiData ? (
            <>
              <p className="mt-4">
                This is to certify that <b>{certiData.candidate_name}</b>
              </p>
              <p className="mt-4">
                has successfully completed <b>{certiData.course_name}</b>
              </p>
              <p className="mt-4">
                with <b>{certiData.grade}</b> on <b>{new Date(certiData.date).toLocaleDateString()}</b>
              </p>
            </>
          ) : (
            <p className="mt-5 text-red-500">No certificate data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
