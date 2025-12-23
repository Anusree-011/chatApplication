import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../Zustans/useConversation";
import notificationSound from "../assets/sounds/notification.wav";
import { toast } from "react-toastify";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessage, selectedConversation, incrementUnreadCount, updateConversation } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            // Convert to string for safe comparison
            const senderId = String(newMessage.senderId);
            const selectedId = selectedConversation ? String(selectedConversation._id) : null;

            const isFromSelectedConversation = selectedId === senderId;

            if (isFromSelectedConversation) {
                setMessage((prev) => [...prev, newMessage]);
            } else {
                incrementUnreadCount(senderId);
                toast.info(`New message received`, {
                    position: "bottom-right",
                    autoClose: 2500,
                });
            }

            // Update conversation list in the store (reorder and update last message)
            updateConversation(newMessage);

            // Play notification sound
            try {
                const sound = new Audio(notificationSound);
                sound.play().catch(err => {
                    console.warn("Sound playback blocked by browser:", err);
                });
            } catch (err) {
                console.error("Error playing sound:", err);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => socket.off("newMessage");
    }, [socket, setMessage, selectedConversation, incrementUnreadCount, updateConversation]);
};

export default useListenMessages;
