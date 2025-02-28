import React from 'react'
import Coursegrid from '../components/Coursegrid'
import Nav from '../components/Nav'


const HomePage = () => {
  return (
    <div>
        <Nav />
        <Coursegrid isHome={true} />
    </div>
  )
}

export default HomePage