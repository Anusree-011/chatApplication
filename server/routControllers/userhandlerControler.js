import Conversation from "../DB/Models/conversationModel.js";
import User from "../DB/Models/userModels.js";

export const getUserBySearch = async(req,res)=>{
    try{
        const search=req.query.search ||'';
        const currentUserID=req.user._id;
        const user=await User.find({
            $and:[
                {
                    $or:[
                        {username:{$regex:'.*'+search+'.*',$options:'i'}},
                        {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                },{
                    _id:{$ne:currentUserID}
                }
            ]
           
        }).select("-password").select("email")

        res.status(200).send(user);

    }catch(error){
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
}
export const getcurrentChatters = async(req,res)=>{
    try{
        const currentUserID = req.user._id;
        const currentchatters=await Conversation.find({
            participants: currentUserID
        }).sort({
            updatedAt: -1
        })
        if(!currentchatters || currentchatters.length===0) return res.status(200).send([]);
        const participantsIDS = currentchatters.reduce((ids,conversation)=>{
            const otherParticipants = conversation.participants.filter(id => id.toString() !== currentUserID.toString());
            return [...ids, ...otherParticipants]
        }, [])
        const otherParticipantsIDS = participantsIDS.filter(id => id.toString() !== currentUserID.toString());

        const user = await User.find({
            _id:{$in:otherParticipantsIDS}
        }).select("-password").select("email");

        const users = otherParticipantsIDS.map(id =>
            user.find(u => u._id.toString() === id.toString())
        )
      

        res.status(200).send(users);
    }catch(error){
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
}