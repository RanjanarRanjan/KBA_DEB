import React from 'react'
import Nav from './components/Nav.jsx'
import Headings from './components/Headings.jsx'
import Coursegrid from './components/Coursegrid.jsx'
import Coursecard from './components/Coursecard.jsx'
//import coursedata from './assets/data/courses.json'

export const App = () => {
  return (
  <>
     <Nav/>
     <Headings/>
     <Coursegrid />
  </>
  )
}
export default App
