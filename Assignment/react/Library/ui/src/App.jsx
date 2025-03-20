import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Addbook from './screens/Addbook'
import Managebook from './screens/Managebook'
import Updatebook from './screens/Updatebook'
import Bookdetails from './screens/Bookdetails'
import Main from './screens/Main'
import Userhome from './screens/Userhome'
import Usersinglebook from './screens/Usersinglebook'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
          <Route path='/Login' element={<Login/>} />
          <Route path='/dashboard'  element={<Dashboard/>}/>
          <Route path='/managebook' element={<Managebook/>}/>
          <Route path='/addbook' element={<Addbook/>}/>
          <Route path='/update/:id' element={<Updatebook/>}/>
          <Route path="/book/:id" element={<Bookdetails/>}/>
          <Route path='/user-dashboard' element={<Userhome/>}/>
          <Route path='/singlebook/:id' element={<Usersinglebook/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App