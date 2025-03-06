
// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import { user_profile } from '../assets/images/Index';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();


//     const handleEditProfile = () => {
//       navigate('/Register', { state: { user } }); // Pass user data to signup
//   };
  

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch('/api/getuser', { // Ensure this matches backend route
//                     method: 'GET',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data');
//                 }

//                 const data = await response.json();
//                 setUser(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div className="text-red-500">Error: {error}</div>;

//     return (
//         <div className="bg-[#0098B9] min-h-screen flex flex-col">
//             <Header />
//             <div className="py-4 px-4 md:px-[200px]">
//                 <div className="bg-white md:h-[80vh] border border-cyan-300 rounded-lg p-4">
//                     <form className="flex flex-col md:flex-row md:justify-between">
//                         <div className="flex flex-col md:ml-[100px] gap-4">
//                             <div className="flex justify-center">
//                                 <img className="w-[100px] md:w-[150px]" src={user_profile} alt="User Profile" />
//                             </div>
//                             <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                                 <label className="text-lg md:text-xl">Name :</label>
//                                 <input type="text" value={user?.fullname || ''} readOnly className="flex-1 border-b border-black outline-none" />
//                                 <label className="text-lg md:text-xl md:ml-2">Gender :</label>
//                                 <input type="text" value={user?.gender || ''} readOnly className="md:w-[100px] border-b border-black outline-none" />
//                             </div>
//                             <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                                 <label className="text-lg md:text-xl">Address :</label>
//                                 <input type="text" value={user?.address || ''} readOnly className="flex-1 border-b border-black outline-none" />
//                             </div>
//                             <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                                 <label className="text-lg md:text-xl">Phone :</label>
//                                 <input type="text" value={user?.phone?.toString() || ''} readOnly className="md:w-[200px] border-b border-black outline-none" />
//                                 <label className="text-lg md:text-xl">Email :</label>
//                                 <input type="email" value={user?.Email || ''} readOnly className="md:w-[200px] border-b border-black outline-none" />
//                             </div>
//                             <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                                 <label className="text-lg md:text-xl">DOB :</label>
//                                 <input type="date" value={user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''} readOnly className="md:w-[150px] border-b border-black outline-none" />
//                             </div>
//                         </div>

//                         <div className="mt-6 md:mt-0 md:self-start md:mr-[40px]">
//                         <button onClick={handleEditProfile} className="bg-orange-300 w-[80px] h-[40px] rounded hover:bg-orange-400">
//                                 Edit
//                           </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;



import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { user_profile } from '../assets/images/Index';
import { useNavigate } from "react-router-dom";



const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/getuser', { // Ensure this matches backend route
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-[#0098B9] min-h-screen flex flex-col">
            <Header />
            <div className="py-4 px-4 md:px-[200px]">
                <div className="bg-white md:h-[80vh] border border-cyan-300 rounded-lg p-4">
                    <form className="flex flex-col md:flex-row md:justify-between">
                        <div className="flex flex-col md:ml-[100px] gap-4">
                            <div className="flex justify-center">
                                <img className="w-[100px] md:w-[150px]" src={user_profile} alt="User Profile" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                <label className="text-lg md:text-xl">Name :</label>
                                <input type="text" value={user?.fullname || ''} readOnly className="flex-1 border-b border-black outline-none" />
                                <label className="text-lg md:text-xl md:ml-2">Gender :</label>
                                <input type="text" value={user?.gender || ''} readOnly className="md:w-[100px] border-b border-black outline-none" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                <label className="text-lg md:text-xl">Address :</label>
                                <input type="text" value={user?.address || ''} readOnly className="flex-1 border-b border-black outline-none" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                <label className="text-lg md:text-xl">Phone :</label>
                                <input type="text" value={user?.phone?.toString() || ''} readOnly className="md:w-[200px] border-b border-black outline-none" />
                                <label className="text-lg md:text-xl">Email :</label>
                                <input type="email" value={user?.Email || ''} readOnly className="md:w-[200px] border-b border-black outline-none" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                <label className="text-lg md:text-xl">DOB :</label>
                                <input type="date" value={user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''} readOnly className="md:w-[150px] border-b border-black outline-none" />
                            </div>
                        </div>

                        <button
    onClick={() => navigate("/update-profile")}
    className="bg-orange-300 w-[80px] h-[40px] rounded hover:bg-orange-400"
>
    Edit
</button>;
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
