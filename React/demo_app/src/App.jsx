import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Logos from './Logos'

//mport Logos from './Components/Logos'

function App() {
  const [count, setCount] = useState(0)
  const [like ,setLike]= useState(false)
  const [darkMode, setDarkMode] = useState(false);

  function tolike()
  {
    setLike((prevLike) => !prevLike);
  }

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }


  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
    <Logos/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button  onClick={tolike}>
         {like ? "disliked":"like"}
      </button>

      <button onClick={toggleDarkMode} className="button">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

    </div>
  )
}

export default App
