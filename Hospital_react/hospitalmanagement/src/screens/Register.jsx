import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { homeImage } from '../assets/images/Index.jsx';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';

const Register = () => {
    const [Username,setusername]=useState('');
    const [Email,setemail]=useState('');
    const [Phone,setphone]=useState('');
    const [DOB,setdob]=useState('');
    const [Gender,setgender]=useState('');
    const [UserRole,setuserrole]=useState('user');
    const [Address,setaddress]=useState('');
    const [Password,setpassword]=useState('');
    // const [error,setError]=useState('');

    const navigate =useNavigate();

    const handleSignup = async (e) =>
        {
            e.preventDefault();
            try
            {  
                const response = await fetch('/api/signup',{
                    method:'POST',
                    credentials:'include',//it is used to get or add cookie
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        Username:Username,
                        Email:Email,
                        phone:Phone,
                        dob:DOB,
                        gender:Gender,
                        user_role:UserRole,
                        address:Address,
                        password:Password})                    
                })
                if(!response.ok)
                {
                    const errData =await response.json();
                    throw new Error(errData.msg||'signup faild')
                }
                navigate('/login');
            }
            catch(err)
            {
                setError(err.message||'signup failed')
            }
        }

  return (
    <div>
       <div className="h-screen bg-gradient-to-tr from-[#ffffff] to-[#0098B9] pt-[20px] pr-[30px]">
           <Nav />
            <div className="flex justify-between">
                <div>
                    <a><img className="w-[90%] mt-[50px]" src={homeImage} alt="home_img" /></a>
                </div>
                <form onSubmit={handleSignup} className="mr-[60px] mt-[10px]">
                    <h1 className="text-white text-5xl mb-[30px] text-center">Register</h1>
                    {/* {error && <p className='text-red-500 mb-4'>{error}</p>} */}
                    <input  type="text" 
                            value={Username}
                            onChange={(e)=>setusername(e.target.value)}
                            placeholder="Enter your Full Name" 
                            className="w-[300px] mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>

                    <input  type="email"
                            value={Email}
                            onChange={(e)=>setemail(e.target.value)}
                            placeholder="Enter your Email" 
                            className="w-[300px] mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <input  type="number"  
                            value={Phone}
                            onChange={(e)=>setphone(e.target.value)}
                            placeholder="Enter your Phone number" className="w-[300px] mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <input  type="date" 
                            value={DOB}
                            onChange={(e)=>setdob(e.target.value)}
                            placeholder="Enter your date of birth" 
                            className="w-[300px] mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <label className="text-white" >Gender :</label>
                        <label className="text-white mx-[10px]">
                            <input type="radio" id="female" value="female" name="gender"
                                checked={Gender === "female"} onChange={(e) => setgender(e.target.value)} required/>
                                Female
                        </label>
                        <label className="text-white mx-[10px]">
                            <input type="radio" id="male" value="male" name="gender"
                                checked={Gender === "male"} onChange={(e) => setgender(e.target.value)} required/>
                            Male
                        </label>
                        <label className="text-white mx-[10px]">
                            <input type="radio" id="Other" value="Other" name="gender"
                                checked={Gender === "Other"} onChange={(e) => setgender(e.target.value)} required/>
                            Other
                        </label><br />


                    <textarea 
                            placeholder="address" 
                            value={Address}
                            onChange={(e)=>setaddress(e.target.value)}
                            className="w-[300px] h-[25px] my-[5px] bg-transparent border-b-2 border-white text-white placeholder-white" required></textarea><br/>
                    
                     <select id="role" 
                            value={UserRole}
                            onChange={(e) => setuserrole(e.target.value)}
                            className="w-[300px] mb-[20px] bg-transparent border-b-2 border-white text-white" required>
                        <option value="" disabled>Select your role</option>
                        <option value="admin" className="text-black">Admin</option>
                        <option value="user" className="text-black">User</option>
                    </select><br/> 


                    <input  type="password" 
                            value={Password}
                            onChange={(e)=>setpassword(e.target.value)}
                            placeholder="Enter your password" className="w-[300px] mb-[40px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <button type="submit" className="w-[300px] bg-[#1799B6] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black">
                    Register
                    </button><br/>
                    
                    <p className="mt-[20px] text-white text-center">Already have an account ?<Link to="/Login" className="text-sky-700">Login</Link></p>
                
                </form> 
            </div>
        </div>
    </div>
  )
}

export default Register