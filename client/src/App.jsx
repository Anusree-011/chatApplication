import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { VerifyUser } from "./utils/VerifyUser";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="p-2 w-screen h-screen items-center justify-center">
      <Routes>
        <Route element={<VerifyUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
