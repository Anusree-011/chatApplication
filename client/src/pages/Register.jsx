
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


const Register = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Handle input change
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  // Select gender
  const selectGender = (gender) => {
    setInputData((prev) => ({
      ...prev,
      gender: prev.gender === gender ? "" : gender,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (inputData.password !== inputData.confirmPassword) {
      setLoading(false);
      return toast.error("Password and Confirm Password do not match");
    }

    try {
      const res = await axios.post("/api/auth/register", inputData);
      const data = res.data;

      if (data.success === false) {

        setLoading(false);
        return toast.error(data.message)
        console.log(data.message);
      }

      toast.success(data.message || "Registration successful");
      localStorage.setItem("token", JSON.stringify(data.token));
      setAuthUser(data)
      setLoading(false)
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 my-8">
        <h1 className="text-3xl mb-6 font-bold text-center text-white">
          Register <span className="text-sky-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Fullname */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Full Name</label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter full name"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Gender */}
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-info border-gray-500"
                checked={inputData.gender === "male"}
                onChange={() => selectGender("male")}
              />
              <span className="text-gray-300 group-hover:text-white transition text-sm">Male</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-info border-gray-500"
                checked={inputData.gender === "female"}
                onChange={() => selectGender("female")}
              />
              <span className="text-gray-300 group-hover:text-white transition text-sm">Female</span>
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:scale-100 disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner text-white"></span> : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?
            <Link to="/login" className="text-sky-400 font-bold hover:text-sky-300 hover:underline ml-1 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
