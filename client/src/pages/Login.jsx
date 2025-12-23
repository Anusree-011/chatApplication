import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setAuthUser } = useAuth();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", userInput);
      const data = res.data;

      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.setItem("token", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients for visual depth - optional but recommended for glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-900/60 backdrop-blur-md border border-white/10">
        <h1 className="text-3xl mb-6 font-bold text-center text-white">
          Login <span className="text-sky-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label p-2">
              <span className="text-base text-gray-300 label-text">
                Email
              </span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base text-gray-300">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="w-full h-11 px-4 text-sm text-white bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500/50 transition placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:scale-100 disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner text-white"></span> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?
            <Link to="/register">
              <span className="text-sky-400 font-bold hover:text-sky-300 hover:underline ml-1 transition">
                Register Now
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
