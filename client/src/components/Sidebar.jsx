import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from "react-icons/bi";
import userConversation from '../Zustans/useConversation';
import { useSocketContext } from '../context/socketContext';

const Sidebar = ({ onSelectUser }) => {

  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [searchUser, setSearchuser] = useState([]);
  const {
    messages,
    setMessage,
    selectedConversation,
    setSelectedConversation,
    unreadCounts,
    setUnreadCounts,
    resetUnreadCount,
    conversations,
    setConversations
  } = userConversation();
  const { onlineUsers, socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSetSelectedUserId] = useState(null);

  // Reset unread count when conversation is selected
  useEffect(() => {
    if (selectedConversation?._id) {
      resetUnreadCount(selectedConversation?._id);
    }
  }, [selectedConversation, resetUnreadCount]);

  // Fetch current chatters
  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true)
      try {
        const chatters = await axios.get(`/api/user/currentchatters`)
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false)
          console.log(data.message);
          return;
        }
        setLoading(false)
        setConversations(data)

        // Initialize unread counts from server data
        const counts = {};
        data.forEach(user => {
          if (user.unreadCount > 0) {
            counts[user._id] = user.unreadCount;
          }
        });
        setUnreadCounts(counts);

      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
    chatUserHandler()
  }, [setUnreadCounts, setConversations])

  // Search users
  const handelSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false)
        console.log(data.message);
      }
      setLoading(false)
      if (data.length === 0) {
        toast.info("User Not Found")
      } else {
        setSearchuser(data)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  // Handle user click
  const handelUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSetSelectedUserId(user._id);
    // Reset unread count for this user
    resetUnreadCount(user._id);
  }

  // Back from search result
  const handSearchback = () => {
    setSearchuser([]);
    setSearchInput('')
  }

  // Logout
  const handelLogOut = async () => {
    const confirmlogout = window.confirm("Are you sure you want to logout?");
    if (confirmlogout) {
      setLoading(true)
      try {
        await axios.post('/api/auth/logout')
        localStorage.removeItem('chatapp')
        setAuthUser(null)
        setLoading(false)
        navigate('/login')
        toast.info("Logged out successfully");
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='h-full w-full md:w-auto px-2 flex flex-col border-r border-white/20'>
      {/* Header / Search */}
      <div className='flex justify-between items-center gap-2 py-3'>
        <form onSubmit={handelSearchSubmit} className='flex-1 flex items-center bg-gray-100/10 border border-white/20 rounded-full px-3 py-2'>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            className='w-full bg-transparent outline-none text-white placeholder-gray-300 ml-2'
            placeholder='Search users...'
          />
          <button type="submit" className='text-gray-300 hover:text-white transition'>
            <FaSearch />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser?._id}`)}
          src={authUser?.profilepic?.includes('avatar.iran.liara.run')
            ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${authUser?.username}`
            : authUser?.profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${authUser?.username}`}
          onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${authUser?.username}`; }}
          className='h-10 w-10 rounded-full border border-white/30 cursor-pointer hover:opacity-80 transition'
          alt="Profile"
        />
      </div>

      <div className='divider px-3 my-0 h-px bg-white/20'></div>

      {/* User List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar mt-2">
        {searchUser?.length > 0 ? (
          <>
            <div className="flex items-center justify-between px-2 mb-2 text-white/50 text-sm">
              <span>Search Results</span>
              <button onClick={handSearchback} className='hover:text-white'><IoArrowBackSharp size={20} /></button>
            </div>
            {searchUser.map((user, index) => (
              <div key={user._id} onClick={() => handelUserClick(user)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/10
                                    ${selectedUserId === user?._id ? 'bg-sky-500/40 border border-sky-400/50' : ''}`}>
                <div className={`avatar ${onlineUsers.includes(user._id) ? 'online' : ''}`}>
                  <div className="w-10 rounded-full">
                    <img
                      src={user.profilepic?.includes('avatar.iran.liara.run')
                        ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`
                        : user.profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`}
                      alt='user'
                      onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`; }}
                    />
                  </div>
                </div>
                <div className='flex flex-col flex-1'>
                  <p className='font-medium text-gray-100'>{user.username}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {conversations.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-center text-gray-300 px-4 opacity-70'>
                <div className="text-4xl mb-2">👋</div>
                <h2 className="text-lg font-semibold mb-1">No chats yet</h2>
                <p className="text-sm">Search for a user above to start chatting!</p>
              </div>
            ) : (
              conversations.map((user, index) => (
                <div key={user._id} onClick={() => handelUserClick(user)}
                  className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer transition-all hover:bg-white/10 group
                                       ${selectedUserId === user?._id ? 'bg-sky-500/40 border border-sky-400/50' : 'border border-transparent'}`}>

                  <div className={`avatar ${onlineUsers.includes(user._id) ? 'online' : ''}`}>
                    <div className="w-12 h-12 rounded-full ring-2 ring-white/10 overflow-hidden">
                      <img
                        src={user.profilepic?.includes('avatar.iran.liara.run')
                          ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`
                          : user.profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`}
                        alt='user'
                        onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`; }}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col flex-1 min-w-0'>
                    <div className='flex justify-between items-center'>
                      <p className='font-semibold text-gray-100 truncate text-base'>{user.username}</p>
                      <span className='text-[10px] text-gray-400'>
                        {user.lastMessage ? formatTime(user.lastMessage.createdAt) : ''}
                      </span>
                    </div>

                    <div className='flex justify-between items-center mt-1'>
                      <p className='text-sm text-gray-400 truncate max-w-[140px]'>
                        {user.lastMessage
                          ? (user.lastMessage.senderId === authUser._id ? 'You: ' : '') + user.lastMessage.message
                          : 'Start a conversation'}
                      </p>
                      <div>
                        {unreadCounts[user._id] > 0 && (
                          <div className="rounded-full bg-green-700 text-[10px] text-white px-2 py-0.5 min-w-[20px] text-center">
                            {unreadCounts[user._id]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Footer / Logout */}
      <div className='mt-auto py-3 px-2 border-t border-white/20 flex items-center justify-between text-gray-300 hover:text-white transition cursor-pointer' onClick={handelLogOut}>
        <span className="text-sm font-medium ml-2">Logout</span>
        <BiLogOut size={20} />
      </div>
    </div>
  )
}

export default Sidebar