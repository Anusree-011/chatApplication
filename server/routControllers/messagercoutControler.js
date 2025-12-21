import Conversation from "../DB/Models/conversationModel.js";
import Message from "../DB/Models/messageSchema.js";

export const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body
        const {id: receiverId} = req.params;
        const senderId = req.user._id; 

        let chats= await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        })
        
        if(!chats){
            chats = await Conversation.create({
                participants:[senderId, receiverId],
            })
        }

        const newMessages = new Message({
            senderId,
            receiverId,
            message,
            conversationId: chats._id
        }) 
       
        if(newMessages){
            chats.messages.push(newMessages._id)
        }
        
        // Save both conversation and message
        await Promise.all([chats.save(), newMessages.save()]);
        
        // // Socket.IO real-time messaging
        // const io = req.app.get('io');
        // const getReceiverSocketId = req.app.get('getReceiverSocketId');
        // const receiverSocketId = getReceiverSocketId(receiverId);
        
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMessages);
        // }

        res.status(201).json(newMessages)

    }catch (error){
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}

export const getMessages = async(req, res)=>{
    try{
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        const chats = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages");

        if(!chats) return res.status(200).send([]);

        const messages = chats.messages;

        res.status(200).send(messages);

    }catch (error){
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}