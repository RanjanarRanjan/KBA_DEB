import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeImage } from '../assets/images/Index.jsx';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';

const Register = () => {
    const [Username, setusername] = useState('');
    const [Email, setemail] = useState('');
    const [Phone, setphone] = useState('');
    const [DOB, setdob] = useState('');
    const [Gender, setgender] = useState('');
    const [UserRole, setuserrole] = useState('user');
    const [Address, setaddress] = useState('');
    const [Password, setpassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Phone number validation (must be exactly 10 digits)
        if (!/^\d{10}$/.test(Phone)) {
            setError('Phone number must be exactly 10 digits.');
            return;
        }

        // Date of birth validation (must not be in the future)
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        if (DOB > today) {
            setError('Date of birth cannot be in the future.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                credentials: 'include', // Used to get or add cookie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username,
                    Email,
                    phone: Phone,
                    dob: DOB,
                    gender: Gender,
                    user_role: UserRole,
                    address: Address,
                    password: Password
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Signup failed');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
    };

    return (
        <div className="h-fit w-full  bg-gradient-to-tr from-[#ffffff] to-[#0098B9] pt-[20px] px-4 md:px-[30px]">
            <Nav />
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-between">
                
                {/* Image - Hidden on Small Screens */}
                <div className="hidden md:block">
                    <img className="w-[90%] mt-[50px]" src={homeImage} alt="home_img" />
                </div>

                {/* Form Section */}
                <form onSubmit={handleSignup} className="w-full md:w-[400px] max-w-sm md:max-w-md mr-0 md:mr-[60px] mt-[10px]">
                    <h1 className="text-white text-4xl mb-[20px] text-center">Register</h1>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    <input type="text" 
                        value={Username}
                        onChange={(e) => setusername(e.target.value)}
                        placeholder="Enter your Full Name" 
                        className="w-full mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>

                    <input type="email"
                        value={Email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter your Email" 
                        className="w-full mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <input type="number"  
                        value={Phone}
                        onChange={(e) => setphone(e.target.value)}
                        placeholder="Enter your Phone number"
                        className="w-full mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <input type="date" 
                        value={DOB}
                        onChange={(e) => setdob(e.target.value)}
                        className="w-full mb-[10px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <div className="text-white mb-[10px]">
                        <label className="block">Gender:</label>
                        <label className="mr-3">
                            <input type="radio" id="female" value="female" name="gender"
                                checked={Gender === "female"} onChange={(e) => setgender(e.target.value)} required/>
                            Female
                        </label>
                        <label className="mr-3">
                            <input type="radio" id="male" value="male" name="gender"
                                checked={Gender === "male"} onChange={(e) => setgender(e.target.value)} required/>
                            Male
                        </label>
                        <label>
                            <input type="radio" id="Other" value="Other" name="gender"
                                checked={Gender === "Other"} onChange={(e) => setgender(e.target.value)} required/>
                            Other
                        </label>
                    </div>

                    <textarea 
                        placeholder="Address" 
                        value={Address}
                        onChange={(e) => setaddress(e.target.value)}
                        className="w-full h-[40px] mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white resize-none" required></textarea><br/>
                    
                    <select id="role" 
                        value={UserRole}
                        onChange={(e) => setuserrole(e.target.value)}
                        className="w-full mb-[20px] bg-transparent border-b-2 border-white text-white" required>
                        <option value="" disabled>Select your role</option>
                        <option value="admin" className="text-black">Admin</option>
                        <option value="user" className="text-black">User</option>
                    </select><br/> 

                    <input type="password" 
                        value={Password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full mb-[20px] bg-transparent border-b-2 border-white text-white placeholder-white" required/><br/>
                    
                    <button type="submit" className="w-full bg-[#1799B6] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black">
                        Register
                    </button><br/>
                    
                    <p className="mt-[20px] text-white text-center">Already have an account? <Link to="/Login" className="text-sky-700">Login</Link></p>
                </form> 
            </div>
        </div>
    );
}

export default Register;
