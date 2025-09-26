import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ global login context

const LoginScreen = () => {
  const [username, setUsername] = useState("kminchelle"); // ✅ default valid
  const [password, setPassword] = useState("0lelplR");     // ✅ default valid
  const [error, setError] = useState(null);
  const { login } = useAuth(); // ✅ gets login() from AuthContext
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    login(data);       // Save in context
    navigate("/home");     // Redirect after login
  } catch (err) {
    console.error("Login failed:", err.message);
    setError("Invalid username or password");
  }
};



  return (
    <div className=" h-screen flex justify-center items-center bg-black">
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="border p-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-[#101355] text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginScreen;
