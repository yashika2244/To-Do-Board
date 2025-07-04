import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';
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

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user, data.token);
      navigate("/login");
      toast.success("login Successfully")
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - image / gradient */}
      <div className="w-1/2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white hidden lg:flex flex-col items-center justify-center p-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to <br className="block md:hidden" /> To-Do Board
        </h1>
        <p className="text-lg font-light text-white/90">
          Manage tasks, stay connected, and be productive.
        </p>
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Login Visual"
          className="mt-10 w-3/4 max-w-sm drop-shadow-xl"
        />
      </div>

      {/* Right side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Sign in to your account
          </h2>

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
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 font-medium hover:underline cursor-pointer"
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
