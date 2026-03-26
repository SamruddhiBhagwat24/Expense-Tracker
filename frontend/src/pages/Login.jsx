import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, onSwitchToRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({ email: "", password: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold transition"
        >
          Clear
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>
    </>
  );
}

export default Login;
