import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Register from '../screens/Register.jsx'
import Login from '../screens/Login.jsx'
import Dashboard from '../screens/Dashboard.jsx'
import Home from '../screens/Home.jsx'
import Mainpage from '../screens/Mainpage.jsx'
import DoctorList from '../screens/DoctorList.jsx'
import Userlist from '../screens/Userlist.jsx'
import Appointments from '../screens/Appointments.jsx'
import AddDoctor from '../screens/AddDoctor.jsx'

const  MainRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Mainpage/>} />
            <Route path='/Register' element={<Register/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path="/admin-login" element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Doctor_list' element={<DoctorList/>}/>
            <Route path='/patient-list' element={<Userlist/>}/>
            <Route path='/booking_details' element={<Appointments/>}/>
            <Route path='/add_doctor' element={<AddDoctor/>}/>
        </Routes>
    </BrowserRouter>
  )
}
export default  MainRouter