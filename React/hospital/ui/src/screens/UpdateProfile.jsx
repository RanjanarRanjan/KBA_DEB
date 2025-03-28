// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';

// const UpdateProfile = () => {
//     const [user, setUser] = useState({
//         fullname: '',
//         address: '',
//         phone: '',
//         Email: '', // Add Email to state
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch('/api/getuser', {
//                     method: 'GET',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data');
//                 }
//                 const data = await response.json();
//                 setUser(data); // Make sure Email is also set
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Include Email in the update request
//         const updatedUser = {
//             fullname: user.fullname,
//             phone: user.phone,
//             address: user.address,
//             Email: user.Email, // Add Email to match backend expectations
//         };

//         try {
//             const response = await fetch('/api/updateuser', {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify(updatedUser),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update profile');
//             }

//             navigate('/profile');
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div className="text-red-500">Error: {error}</div>;

//     return (
//         <div className="bg-[#0098B9] min-h-screen flex flex-col">
//             <Header />
//             <div className="py-4 mt-[100px] px-4 md:px-[200px]">
//                 <div className="bg-white md:h-[80vh] border border-cyan-300 rounded-lg p-4">
//                     <form className="flex flex-col p-8 gap-4" onSubmit={handleSubmit}>
//                         <label className="text-lg">Name:</label>
//                         <input type="text" name="fullname" value={user.fullname} onChange={handleChange} className="border-b border-black outline-none" />
                        
//                         <label className="text-lg">Address:</label>
//                         <input type="text" name="address" value={user.address} onChange={handleChange} className="border-b border-black outline-none" />
                        
//                         <label className="text-lg">Phone:</label>
//                         <input type="text" name="phone" value={user.phone} onChange={handleChange} className="border-b border-black outline-none" />

//                         <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Save</button>
//                         <button type="button" onClick={() => navigate('/profile')} className="bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-600">Cancel</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UpdateProfile;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const UpdateProfile = () => {
    const [user, setUser] = useState({
        fullname: '',
        address: '',
        phone: '',
        Email: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/getuser', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhoneNumber(user.phone)) {
            alert("Phone number must be exactly 10 digits and contain only numbers!");
            return;
        }

        const updatedUser = {
            fullname: user.fullname,
            phone: user.phone,
            address: user.address,
            Email: user.Email,
        };

        try {
            const response = await fetch('/api/updateuser', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-[#0098B9] min-h-screen flex flex-col">
            <Header />
            <div className="py-4 mt-[100px] px-4 md:px-[200px]">
                <div className="bg-white md:h-[80vh] border border-cyan-300 rounded-lg p-4">
                    <form className="flex flex-col p-8 gap-4" onSubmit={handleSubmit}>
                        <label className="text-lg">Name:</label>
                        <input type="text" name="fullname" value={user.fullname} onChange={handleChange} className="border-b border-black outline-none" />
                        
                        <label className="text-lg">Address:</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange} className="border-b border-black outline-none" />
                        
                        <label className="text-lg">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="border-b border-black outline-none"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            title="Phone number must be 10 digits"
                        />

                        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Save</button>
                        <button type="button" onClick={() => navigate('/profile')} className="bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-600">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
