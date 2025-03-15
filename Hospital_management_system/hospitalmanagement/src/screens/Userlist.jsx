import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/userdetailstoget", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Error fetching users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-[#0098B9] min-h-screen flex flex-col">
      <AdminHeader />
      <div className="p-4 mt-[100px]">
        <div className="h-[78vh] bg-[#ffffff] border border-cyan-300 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr className="border-b bg-cyan-300">
                <th className="py-2 px-4">Sl No.</th>
                <th className="py-2 px-4">Patient Name</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Dob</th>
                <th className="py-2 px-4">UserRole</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="border-b border-black">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{user.fullname}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">{user.Email}</td>
                    <td className="py-2 px-4">{user.dob.split('T')[0]}</td>
                    <td className="py-2 px-4">{user.user_role}</td>
                    <td className="py-2 px-4">{user.gender}</td>
                    <td className="py-2 px-4">{user.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;


