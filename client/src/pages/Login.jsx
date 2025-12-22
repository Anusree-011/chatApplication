import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
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
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-lg">
        <h1 className="text-3xl mb-4 font-semibold text-center text-gray-900">
          Login <span className="text-gray-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-3 mb-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Email :
              </span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={handleInput}
              className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
              required
            />
          </div>

          <div className="mb-4 mt-2">
            <label className="label p-3 mb-2">
              <span className="font-bold text-gray-950 text-xl">Password:</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full self-center px-2 py-1 bg-gray-950 text-lg hover:scale-105 text-white rounded-lg btn btn-block btn-sm mt-4"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="pt-3 ml-15">
          <p className="text-sm font-semibold text-gray-800">
            Don&apos;t have an account?
            <Link to="/signup">
              <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950 ml-1">
                Register Now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
