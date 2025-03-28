import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState(""); // Changed from email to UserName
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/login", { // Ensure correct backend URL
        method: "POST",
        credentials: "include", // Ensures cookies are sent with requests
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: userName, password }),
      });

      const data = await response.text(); // Get the response as text

      if (response.ok) {
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to another page
      } else {
        setError(data); // Show backend error message
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center bg-slate-300 h-screen items-center font-semibold">
      <div className="w-80 bg-white px-5 py-5 rounded-lg">
        <p className="text-center text-4xl">Login</p>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="ml-4 mt-6">
          <label>User Name:</label> <br />
          <input
            type="text" // Changed from email to text
            className="w-11/12 border border-black mt-2 p-1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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

          <div className="flex justify-between mt-6">
            <a href="#" className="text-sm text-cyan-400">Forgot password?</a>
            <button type="submit" className="mr-9 px-3 py-1 bg-cyan-400 rounded-lg">
              Login
            </button>
          </div>
        </form>

        <p className="text-sm mt-6">
          Don't have an account? <Link to="/signup" className="text-cyan-400 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
