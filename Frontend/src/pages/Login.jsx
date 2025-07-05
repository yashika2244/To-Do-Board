import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user, data.token);
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f2fe] flex flex-col lg:flex-row">
      {/* Mobile Top Logo */}
      <div className="lg:hidden flex justify-center items-center py-4 bg-[#115d83ad]">
        <h1 className="text-3xl font-bold italic text-white">
          To-<span className="text-yellow-300">Do</span> Board
        </h1>
      </div>

      {/* Left Section (desktop only) */}
      <div className="w-full lg:w-1/2 hidden lg:flex flex-col items-center justify-center bg-[#115d83ad] text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to <br /> To-Do Board
        </h1>
        <p className="text-lg font-light text-white/90">
          Stay organized. Achieve more every day.
        </p>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Login Visual"
          className="mt-10 w-3/4 max-w-sm drop-shadow-xl"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#e0f2fe] px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold text-[#1e293b] text-center mb-6">
            Sign in to your account
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#115d83ad]  outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#115d83ad]  outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#115d83ad] cursor-pointer hover:bg-[#0e4a68d1]
 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#0369a1] font-medium hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
