// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [inputData, setInputData] = useState({});

//   const handleInput = (e) => {
//     setInputData({
//       ...inputData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   console.log(inputData);
//   const selectGender = (selectGender) => {
//     setInputData(
//       (prev = {
//         ...prev,
//         gender: selectGender === inputData.gender ? "" : selectGender,
//       })
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (inputData.password !== inputData.confirmPassword.toLowerCase()) {
//       setLoading(false);
//       return toast.error("Password and Confirm Password do not match");
//     }

//     try {
//       const res = await axios.post(`/api/auth/register`, inputData);
//       const data = register.data;
//       if (data.suucess === false) {
//         setLoading(false);
//         toast.error(data.message);
//         console.log(data.message);
//       }
//       toast.success(data?.message);
//       localStorage.setItem("token", JSON.stringify(data));
//       setLoading(false);
//       navigate("/login");

//       if (data.success === false) {
//         setLoading(false);
//         console.log(data.message);
//         toast.error(data.message);
//         return;
//       }

//       toast.success(data.message);
//       localStorage.setItem("token", JSON.stringify(data));
//       setLoading(false);
//       navigate("/");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Login failed");
//       console.log(error);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-lg">
//         <h1 className="text-3xl mb-4 font-semibold text-center text-gray-900">
//           Register <span className="text-gray-500">ChatApp</span>
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col text-black">
//           <div className="mb-4 mt-2">
//             <label className="label p-3 mb-2">
//               <span className="font-bold text-gray-950 text-xl">Fullname</span>
//             </label>
//             <input
//               id="fullname"
//               type="text"
//               placeholder="Enter Fullname"
//               onChange={handleInput}
//               className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
//               required
//             />
//           </div>
//           <div className="mb-4 mt-2">
//             <label className="label p-3 mb-2">
//               <span className="font-bold text-gray-950 text-xl">Username:</span>
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Enter username"
//               onChange={handleInput}
//               className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="label p-3 mb-2">
//               <span className="font-bold text-gray-950 text-xl label-text">
//                 Email :
//               </span>
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your Email"
//               onChange={handleInput}
//               className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
//               required
//             />
//           </div>

//           <div className="mb-4 mt-2">
//             <label className="label p-3 mb-2">
//               <span className="font-bold text-gray-950 text-xl">Password:</span>
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter Password"
//               onChange={handleInput}
//               className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
//               required
//             />
//           </div>
//           <div className="mb-4 mt-2">
//             <label className="label p-3 mb-2">
//               <span className="font-bold text-gray-950 text-xl">
//                 {" "}
//                 Confirm Password:
//               </span>
//             </label>
//             <input
//               id="password"
//               type="text"
//               placeholder="Enter Confirm Password"
//               onChange={handleInput}
//               className="w-full input input-bordered h-10 mt-2 text-black text-sm bg-white p-2 rounded-sm"
//               required
//             />
//           </div>
//           <div id="gender" className="flex gap-2">
//             <label className="cursor-pointer label flex gap-2">
//               <span className="label-text font-semibold text-gray-950">
//                 male{" "}
//               </span>
//               <input
//                 onChange={() => selectGender("male")}
//                 checked={InputData.gender === "male"}
//                 type="checkbox"
//                 className="checkbox checkbox-info"
//               />
//             </label>
//             <label className="ml-4 cursor-pointer label flex gap-2">
//               <span className="label-text font-semibold text-gray-950">
//                 female{" "}
//               </span>
//               <input
//                 onChange={() => selectGender("female")}
//                 checked={InputData.gender === "male"}
//                 type="checkbox"
//                 className="checkbox checkbox-info"
//               />
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full self-center px-2 py-1 bg-gray-950 text-lg hover:scale-105 text-white rounded-lg btn btn-block btn-sm mt-4"
//           >
//             {loading ? "Loading..." : "Register"}
//           </button>
//         </form>

//         <div className="pt-3 ml-15">
//           <p className="text-sm font-semibold text-gray-800">
//             Don&apos;t have an account?
//             <Link to="/login">
//               <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950 ml-1">
//                 Login Now!
//               </span>
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

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
        return toast.error(data.message);
      }

      toast.success(data.message || "Registration successful");
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl mb-4 font-semibold text-center text-gray-900">
          Register <span className="text-gray-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col text-black">
          {/* Fullname */}
          <div className="mb-4">
            <label className="font-bold">Full Name</label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter full name"
              onChange={handleInput}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="font-bold">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              onChange={handleInput}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="font-bold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInput}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="font-bold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={handleInput}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="font-bold">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleInput}
              className="w-full border p-2 mt-1 rounded"
              required
            />
          </div>

          {/* Gender */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inputData.gender === "male"}
                onChange={() => selectGender("male")}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inputData.gender === "female"}
                onChange={() => selectGender("female")}
              />
              Female
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded hover:opacity-80"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="ml-1 font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
