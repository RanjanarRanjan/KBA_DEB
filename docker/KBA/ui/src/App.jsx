import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard'
import Addcourse from './pages/Addcourse.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
// import Nav from './components/Nav.jsx'
// import Headings from './components/Headings.jsx'
// import Coursegrid from './components/Coursegrid.jsx'
// import Coursecard from './components/Coursecard.jsx'
//import coursedata from './assets/data/courses.json'

export const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/signup"/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard'element={<Dashboard />}/>
      <Route path='/Addcourse' element={<Addcourse />}/>
      <Route path='/coursepage' element={<CoursesPage/>} />
    </Routes>
  </BrowserRouter>
  )
}
export default App
