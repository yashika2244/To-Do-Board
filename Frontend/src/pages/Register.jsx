import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
         toast.success("✅ Registered successfully! Please login.");

      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section with gradient and illustration */}
      <div className="w-full  hidden lg:w-1/2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 md:flex flex-col items-center justify-center p-10 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
          Join To-Do Board
        </h1>
        <p className="text-sm md:text-lg text-center font-light text-white/90 max-w-md">
          Create your account and start organizing tasks efficiently!
        </p>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Register Visual"
          className="mt-8 w-3/4 max-w-xs sm:max-w-sm md:max-w-md drop-shadow-xl"
        />
      </div>

      {/* Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create an account
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 cursor-pointer font-medium hover:underline "
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
