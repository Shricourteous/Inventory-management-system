import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../reducer-store/employees/employees.action";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for star animations

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Send POST request to your login API endpoint
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });

      // Handle success response (e.g., save JWT token)
      console.log("Login successful:", response.data);
      localStorage.setItem("userData", JSON.stringify(response.data._doc));
      dispatch(setCurrentUser(response.data._doc));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password."); // Set error message for display
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-300 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated stars */}
        <div className="stars">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`} />
          ))}
        </div>
      </div>
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-3 transition duration-200 focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-3 transition duration-200 focus:outline-none focus:ring focus:ring-green-300 hover:border-green-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
