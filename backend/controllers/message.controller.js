import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id; // Extract receiverId from URL params
        const messageContent = req.body.message; // Extract message content from request body
        const senderId = req.user._id; // Access authenticated user's ID from req.user

        // Validate if senderId, receiverId, and message content are available
        if (!senderId || !receiverId || !messageContent) {
            return res.status(400).json({ error: "SenderId, receiverId, and message content are required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message: messageContent,
        });


        conversation.messages.push(newMessage._id);
       
        await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) =>{
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]},
        }).populate("messages");
        res.status(200).json(conversation.messages);
    }
    catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
