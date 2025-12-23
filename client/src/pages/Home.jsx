import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import useListenMessages from "../hooks/useListenMessages";

const Home = () => {
  useListenMessages();
  const { authUser } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSelectUser = (user) => {
    setIsSidebarVisible(false);
  }

  const handleBackToSidebar = () => {
    setIsSidebarVisible(true);
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex w-full md:w-[80%] lg:w-[70%] h-[90vh] md:h-[85vh] 
                      rounded-2xl overflow-hidden shadow-2xl 
                      bg-gray-900/60 backdrop-blur-md border border-white/10">
        <div className={`w-full md:w-[350px] bg-black/20 ${isSidebarVisible ? 'block' : 'hidden md:block'}`}>
          <Sidebar onSelectUser={handleSelectUser} />
        </div>
        <div className={`flex-1 bg-black/40 ${!isSidebarVisible ? 'block' : 'hidden md:flex'}`}>
          <MessageContainer onBackUser={handleBackToSidebar} />
        </div>
      </div>
    </div>
  );
}

export default Home;
