import React, { useState } from 'react';
import { homeImage } from '../assets/images/Index.jsx';
import Nav from '../components/Nav.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if the user is trying to log in as an admin
    const isAdminLogin = location.pathname === '/admin-login';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include', // it is used to get cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, password }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Login failed');
                
            }
            const data = await response.json();

            if (data.user_role === 'admin') {
                navigate('/Dashboard'); // Redirect admin to dashboard
            } else {
                navigate('/Home'); // Redirect user to home page
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-tr from-[#ffffff] to-[#0098B9] pt-[20px] pr-[30px]">
            <nav className="flex flex-col justify-end">
                <Nav />
            </nav>
            <div className="flex justify-between">
                <div>
                    <a><img className="w-[90%] mt-[30px]" src={homeImage} alt="home_img" /></a>
                </div>
                <form onSubmit={handleLogin} className="mr-[60px] mt-[50px]">
                    {/* Dynamic Heading */}
                    <h1 className="text-white text-5xl mb-[20px] text-center">
                        {isAdminLogin ? 'Admin Login' : 'Login'}
                    </h1>
                    {error && <p className='text-red-500 mb-4'>{error}</p>}
                    
                    <input 
                        type="Email" 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email" 
                        className="w-[300px] mb-[60px] bg-transparent border-b-2 border-white text-white placeholder-white"
                    /><br/>
                    
                    <input 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password" 
                        className="w-[300px] mb-[60px] bg-transparent border-b-2 border-white text-white placeholder-white"
                    /><br/>
                    
                    <button type="submit" className="w-[300px] bg-[#1799B6] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black">
                        Login
                    </button><br/>

                    {/* Show Register link only if it's a user login */}
                    {!isAdminLogin && (
                        <p className="mt-[20px] md:text-white text-center">
                            Don't have an account? <Link to="/Register" className="text-sky-700">Register</Link>
                        </p>
                    )}
                </form>
            </div> 
        </div>
    );
};

export default Login;
