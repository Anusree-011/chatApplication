import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="p-2 w-s creen h-screen items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
