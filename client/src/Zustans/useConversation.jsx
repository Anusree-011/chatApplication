import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    // Support both direct value and functional updates
    setMessage: (messages) => set((state) => ({
        messages: typeof messages === 'function' ? messages(state.messages) : messages
    })),
    unreadCounts: {},
    setUnreadCounts: (unreadCounts) => set({ unreadCounts }),
    incrementUnreadCount: (senderId) => set((state) => ({
        unreadCounts: {
            ...state.unreadCounts,
            [String(senderId)]: (state.unreadCounts[String(senderId)] || 0) + 1
        }
    })),
    resetUnreadCount: (senderId) => set((state) => ({
        unreadCounts: {
            ...state.unreadCounts,
            [String(senderId)]: 0
        }
    })),
    conversations: [],
    setConversations: (conversations) => set({ conversations }),
    updateConversation: (newMessage) => set((state) => {
        const senderId = String(newMessage.senderId);
        const receiverId = String(newMessage.receiverId);

        const existingConversations = [...state.conversations];
        const index = existingConversations.findIndex(c =>
            String(c._id) === senderId || String(c._id) === receiverId
        );

        if (index !== -1) {
            const updatedConv = { ...existingConversations[index], lastMessage: newMessage };
            existingConversations.splice(index, 1);
            existingConversations.unshift(updatedConv);
        }

        return { conversations: existingConversations };
    }),
}));

export default useConversation;
