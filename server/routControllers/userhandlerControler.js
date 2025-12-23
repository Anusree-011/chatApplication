import Conversation from "../DB/Models/conversationModel.js";
import User from "../DB/Models/userModels.js";
import Message from "../DB/Models/messageSchema.js";

export const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || '';
        const currentUserID = req.user._id;
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + search + '.*', $options: 'i' } },
                        { fullname: { $regex: '.*' + search + '.*', $options: 'i' } }
                    ]
                }, {
                    _id: { $ne: currentUserID }
                }
            ]

        }).select("-password");

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
}

export const getcurrentChatters = async (req, res) => {
    try {
        const currentUserID = req.user._id;

        const currentChatters = await Conversation.find({
            participants: currentUserID
        }).sort({ updatedAt: -1 });

        if (!currentChatters || currentChatters.length === 0) {
            return res.status(200).send([]);
        }

        const participantsIDs = currentChatters.reduce((acc, conversation) => {
            const others = conversation.participants.filter(id => id.toString() !== currentUserID.toString());
            return acc.concat(others);
        }, []);

        const otherParticipantsIDS = [...new Set(participantsIDs)];

        const users = await User.find({
            _id: { $in: otherParticipantsIDS }
        }).select("-password");

        // Map users to include last message and unread count
        const usersWithMessages = await Promise.all(users.map(async (user) => {
            const conversation = currentChatters.find(c =>
                c.participants.map(p => p.toString()).includes(user._id.toString())
            );

            if (!conversation) return { ...user._doc, unreadCount: 0, lastMessage: null };

            // Get last message
            const lastMessageId = conversation.messages[conversation.messages.length - 1];
            let lastMessage = null;
            if (lastMessageId) {
                lastMessage = await Message.findById(lastMessageId);
            }

            // Count unread messages from this user to me
            const unreadCount = await Message.countDocuments({
                _id: { $in: conversation.messages },
                senderId: user._id,
                receiverId: currentUserID,
                read: false
            });

            return {
                ...user._doc,
                lastMessage,
                unreadCount
            };
        }));

        // Sort by last message time (most recent first)
        usersWithMessages.sort((a, b) => {
            const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
            const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
            return dateB - dateA;
        });

        res.status(200).send(usersWithMessages);

    } catch (error) {
        console.error("Error in getcurrentChatters:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}