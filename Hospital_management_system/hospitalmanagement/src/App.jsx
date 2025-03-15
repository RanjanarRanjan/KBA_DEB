import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from '../src/screens/Register.jsx'
import Login from './screens/Login.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Home from './screens/Home.jsx'
import Mainpage from './screens/Mainpage.jsx'
import DoctorList from './screens/DoctorList.jsx'
import Userlist from './screens/Userlist.jsx'
import Appointments from './screens/Appointments.jsx'
import AddDoctor from './screens/AddDoctor.jsx'
import BookAppointment from './screens/BookAppointment.jsx'
import History from './screens/History.jsx'
import Profile from './screens/Profile.jsx'
import UpdateProfile from './screens/UpdateProfile.jsx'
import DoctorDetails from './screens/DoctorDetails.jsx'

const  App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Mainpage/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path="/admin-login" element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />}/>
            <Route path='/Doctor_list' element={<DoctorList/>}/>
            <Route path='/patient-list' element={<Userlist/>}/>
            <Route path='/booking_details' element={<Appointments/>}/>
            <Route path='/add_doctor' element={<AddDoctor/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Book_appointment' element={<BookAppointment/>}/>
            <Route path='/History' element={<History/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path="/update-profile" element={<UpdateProfile/>} />
           <Route path="/doctor_details/:id" element={<DoctorDetails/>} />
        </Routes>
    </BrowserRouter>
  )
}
export default  App