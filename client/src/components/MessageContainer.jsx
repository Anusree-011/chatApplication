import React, { useEffect, useState, useRef } from 'react'
import userConversation from '../Zustans/useConversation';
import { useAuth } from '../context/AuthContext';
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp, IoSend } from 'react-icons/io5';
import axios from 'axios';
import { useSocketContext } from '../context/socketContext';

const MessageContainer = ({ onBackUser }) => {
  const { messages, selectedConversation, setMessage, setSelectedConversation } = userConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSnedData] = useState("")
  const lastMessageRef = useRef();


  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const get = await axios.get(`/api/message/${selectedConversation?._id}`);
        const data = await get.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setMessage(data);
      } catch (error) {
        setLoading(false);
        console.log(error);

      }
    }

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessage])
  console.log(messages);

  const handelMessages = (e) => {
    setSnedData(e.target.value)
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(`/api/message/send/${selectedConversation?._id}`, { message: sendData });
      const data = await res.data;
      if (data.success === false) {
        setSending(false);
        console.log(data.message);
      }
      setSending(false);
      setSnedData('')
      // Functional update to avoid stale closure and duplication issues
      setMessage((prev) => [...prev, data])
      // Move this user to the top of the sidebar
      const { updateConversation } = userConversation.getState();
      updateConversation(data);
    } catch (error) {
      setSending(false);
      console.log(error);
    }
  }

  return (
    <div className='w-full h-full flex flex-col'>
      {selectedConversation === null ? (
        <div className='flex items-center justify-center w-full h-full'>
          <div className='px-4 text-center text-gray-200 font-semibold 
            flex flex-col items-center gap-4 animate-fade-in'>
            <TiMessages className='text-6xl md:text-8xl text-center text-white/80' />
            <div>
              <p className='text-2xl md:text-4xl font-bold mb-2'>Welcome Back, {authUser.username}!</p>
              <p className="text-lg md:text-xl font-light text-gray-300">Select a chat from the sidebar to start messaging</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className='flex items-center gap-2 bg-gray-900/40 backdrop-blur-md px-4 py-3 border-b border-white/10'>
            <div className='md:hidden'>
              <button onClick={() => onBackUser(true)} className='text-white hover:bg-white/10 rounded-full p-2 transition'>
                <IoArrowBackSharp size={24} />
              </button>
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-white/20">
                <img
                  src={selectedConversation?.profilepic?.includes('avatar.iran.liara.run')
                    ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${selectedConversation?.username}`
                    : selectedConversation?.profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${selectedConversation?.username}`}
                  alt="profile"
                  onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${selectedConversation?.username}`; }}
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-white font-bold text-lg'>
                {selectedConversation?.username}
              </span>
              <span className='text-xs text-gray-400'>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-auto p-4 space-y-4 custom-scrollbar'>
            {loading && (
              <div className="flex w-full h-full items-center justify-center">
                <div className="loading loading-spinner loading-lg text-sky-500"></div>
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <div className='flex flex-col items-center justify-center h-full text-gray-400'>
                <p>Send a message to start the conversation!</p>
              </div>
            )}
            {!loading && messages?.length > 0 && messages?.map((message) => (
              <div key={message?._id} ref={lastMessageRef}
                className={`flex w-full mt-2 space-x-3 max-w-full ${message.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>

                {/* Avatar for received messages only - optional, or keep for both but change order */}
                {message.senderId !== authUser._id && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={(message.senderId === authUser._id ? authUser.profilepic : selectedConversation?.profilepic)?.includes('avatar.iran.liara.run')
                        ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${message.senderId === authUser._id ? authUser.username : selectedConversation?.username}`
                        : (message.senderId === authUser._id ? authUser.profilepic : selectedConversation?.profilepic)}
                      alt="avatar"
                      onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${message.senderId === authUser._id ? authUser.username : selectedConversation?.username}`; }}
                    />
                  </div>
                )}

                <div className={`relative px-4 py-2 shadow-md max-w-[70%] break-words flex flex-col
                  ${message.senderId === authUser._id
                    ? 'bg-emerald-600 rounded-tr-none rounded-br-2xl rounded-bl-2xl rounded-tl-2xl' // Sent
                    : 'bg-gray-700 rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-2xl'   // Received
                  }`}>

                  <span className="text-white text-sm leading-relaxed">
                    {message?.message}
                  </span>

                  <div className={`text-[10px] mt-1 flex self-end
                    ${message.senderId === authUser._id ? 'text-emerald-100/70' : 'text-gray-300/70'}`}>
                    {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Avatar for sent messages could go here if desired, but WhatsApp usually doesn't show sender avatar in right chat */}
                {/* 
                // Currently omitted for right-side messages per standard WhatsApp style, 
                // but if we were to show it, we would use the optimization logic here too.
                */}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className='p-3 bg-gray-900/40 border-t border-white/10'>
            <form onSubmit={handelSubmit} className='flex items-center gap-2'>
              <div className='relative flex-1'>
                <input
                  value={sendData}
                  onChange={handelMessages}
                  required
                  type='text'
                  placeholder="Type a message..."
                  className='w-full bg-gray-800/50 text-white border border-white/10 rounded-full py-3 px-5 focus:outline-none focus:border-sky-500/50 transition'
                />
              </div>
              <button type='submit' className='text-sky-500 hover:text-sky-400 disabled:opacity-50 p-2 rounded-full hover:bg-white/5 transition' disabled={sending}>
                {sending ? <div className='loading loading-spinner loading-sm'></div> : <IoSend size={24} />}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default MessageContainer