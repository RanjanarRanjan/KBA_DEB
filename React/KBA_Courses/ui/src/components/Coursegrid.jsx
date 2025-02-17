import React,{useState,useEffect} from 'react'
import Coursecard from './Coursecard'

const Coursegrid = ({isHome=false}) => {
  const [courses,setCourses]=useState([])
  const [loading,setLoading]=useState(true)
  const courseList=isHome?courses.slice(0,3):courses;

  useEffect(()=>{
    const fetchcourses = async () => {
      try{
        const res = await fetch('http://localhost:5000/courses')
        const data = await res.json();
        setCourses(data);
      }
      catch(error)
      {
        console.log(error)
      }
      finally
      {
        setLoading(false)
      }
    }
    fetchcourses();
  },[])

  return (
    <div>
      <h1 className='flex flex-col items-center font-bold text-2xl md:text-4xl text-purple-800 pt-10'>
      {isHome?"Top Courses":"All courses"}</h1>
      {loading?
      (<h1>Loading</h1>)
      :
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {courseList.map((course)=>(
            <Coursecard key={course.Id} course={course} />
        ))}
      </div>
      }
    </div>
  )
}

export default Coursegrid