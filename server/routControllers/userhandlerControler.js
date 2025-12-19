import Conversation from "../DB/Models/conversationModel";

export const getUserBySearch= async(requestAnimationFrame,res)=>{
    try{
        const search=req.query.search ||'';
        const currentUserID=req.user._conditions._id;
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

        res.status(200).send(users);

    }catch(error){
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
}
export const getcurrentChatters =async(req,res)=>{
    try{
        const cureentUserID= req.res._conditions._id;
        const currentchatters=await Conversation.find({
            participants:cureentUserID
        }).sort({
            updatedAt: -1
        })
        if(!currentchatters || currentchatters.length===0) return res.status(200).send([]);
        const participants = currentchatters.reduce((ids,conversation)=>{
            const otherParticipants = conversation.participants.find(id => id !== currentUserID);
            return [...ids, ...otherParticipants]
        })
        const otherParticipantsIDS= participantsIDS.filter(id => id.tostring() !== currentUserID.tostring());

        const user =await User.find({
            _id:{$in:otherParticipantsIDS}
        }).select("-password").select("email");

        const users= otherParticipantsIDS.map(id=>
             user = User.find(user => user._id.tostring() === id.tostring())
            
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