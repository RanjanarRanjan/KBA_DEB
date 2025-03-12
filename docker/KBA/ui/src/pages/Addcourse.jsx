import React from 'react'
import { useState } from 'react'


const Addcourse = () => {
  const [courseName,setCourseName]=useState("");
  const [courseId,setCourseID]=useState("");
  const [courseType,setCourseType]=useState("Self-paced")
  const [description,setdescription]=useState("")
  const [price,setprice]=useState("") 
  const [error,setError]=useState('')

  const [courseImage,setCourseImage]=useState(null)

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try{
      const formData=new FormData();
      formData.append("CourseName",courseName);
      formData.append("CourseId",courseId);
      formData.append("CourseType",courseType);
      formData.append("description",description);
      formData.append("Price",price);

      if(courseImage)
      {
        formData.append("courseImage",courseImage)
      }
      const res =await fetch("api/addcourse",{
        method:"POST",
        credentials:"include",
        body:formData,
      })
      if(!res.ok)
      {
        throw new Error("Error adding course")
      }
      alert("Course added Successfully")
      setCourseName("")
      setCourseID("")
      setCourseType("Self-Paced")
      setdescription("")
      setprice("")
      setCourseImage(null)
    }
    catch(error)
    {
      console.log(error)
      alert("Internal Server error")
    }
  }

  return (
    <>
    <section className="bg-white mb-20">
    <div className="container m-auto max-w-2xl py-2">
      <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      {error&&<p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
            Add Course
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
             value={courseName}
             onChange={(e)=>setCourseName(e.target.value)}
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Certified Blockchain Associate"
              required
              
            />
          </div>

          <div class="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Id
            </label>
            <input
              type="text"
              value={courseId}
              onChange={(e)=>setCourseID(e.target.value)}
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 1"
              required
              
            />
          </div>

          <div class="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Course Type
            </label>
            <select
            value={courseType}
            onChange={(e)=>setCourseType(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            
            >
              <option value="Self-Paced">Self-Paced</option>
              <option value="Instructor-Led">Instructor-Led</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e)=>setdescription(e.target.value)}
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Small description on the course"
            
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <select
              value={price}
              onChange={(e)=>setprice(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
              
            >
              <option value="Rs.5000">Rs.5000</option>
              <option value="Rs.3500">Rs.3500</option>
              <option value="Rs.15000">Rs.15000</option>
            </select>
          </div>
          <div>
            <label className='block text-gray-700 font-boldvmb-2'>
              CourseImage
            </label>
            <input 
            type='file'
            accept='image/*'//  /*-means it accept all image files
            onChange={(e)=>{
              if(e.target.files&&e.target.files[0])
              {
                setCourseImage(e.target.files[0])
              }
            }}/>
          </div>

          <div>
            <button
              className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
    </>
  )
}

export default Addcourse