import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Dashboard from './screens/Dashboard'
import Nav from './components/Nav'
import Certifiacte from './screens/Certifiacte'
import View from './screens/View'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/nav' element={<Nav/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/certificate' element={<Certifiacte />}/>
      <Route path='/view' element={<View/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App