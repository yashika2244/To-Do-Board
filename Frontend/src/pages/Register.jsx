import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      {/* Desktop Left Section */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex-col items-center justify-center p-10">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Join To-Do Board
        </h1>
        <p className="text-lg font-light text-white/90 text-center max-w-md">
          Create your account and start organizing tasks efficiently!
        </p>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Register Visual"
          className="mt-8 w-3/4 max-w-sm drop-shadow-xl"
        />
      </div>

      <div className="lg:hidden w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 py-5 text-center">
        <h1 className="text-3xl font-bold italic text-white">
          To-<span className="text-yellow-300">Do</span> Board
        </h1>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-10">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Create an account
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Name</label>
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
            <label className="block text-sm text-gray-600 mb-1">Email</label>
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
            <label className="block text-sm text-gray-600 mb-1">Password</label>
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 font-medium cursor-pointer hover:underline"
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
