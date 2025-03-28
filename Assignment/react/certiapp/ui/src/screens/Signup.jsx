import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserName: userName,
          Email: email,
          password: password,
          // user_role: role,
        }),
      });

      const data = await response.text();

      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/"); // Redirect to login page
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center bg-slate-300 h-screen items-center font-semibold">
      <div className="w-80 bg-white px-5 py-5 rounded-lg">
        <p className="text-center text-4xl">Sign Up</p>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSignup} className="ml-4 mt-6">
          <label>User Name:</label> <br />
          <input
            type="text"
            className="w-11/12 border border-black mt-2 p-1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          /> <br />

          <label>Email:</label> <br />
          <input
            type="email"
            className="w-11/12 border border-black mt-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> <br />

          <label>Password:</label> <br />
          <input
            type="password"
            className="w-11/12 mt-2 border border-black p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> <br />

          {/* <label>Role:</label> <br /> */}
          {/* <select
            className="w-11/12 mt-2 border border-black p-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="others">Others</option>
          </select> */}

          <div className="flex justify-center mt-6">
            <button type="submit" className="px-3 py-1 bg-cyan-400 rounded-lg">
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-sm mt-6">
          Already have an account? <a href="/" className="text-cyan-400 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
