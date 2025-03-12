import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Additem from './route/Additem';
import Viewitem from './route/Viewitem';


const App = () => {
   
    return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Additem/>}/>
        <Route path='/view' element={<Viewitem/>}/>

    </Routes>
          
    </BrowserRouter>        
      
    );
}

export default App





// const [message, setMessage] = useState("");

// useEffect(() => {
//     fetch("http://localhost:8011/api/test")
//         .then(response => response.json())
//         .then(data => setMessage(data.message))
//         .catch(error => console.error("Error fetching data:", error));
// }, []);


// <div>
// <h1>Test API Connection</h1>
// <p>{message}</p>
// </div>