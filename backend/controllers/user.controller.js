import User from '../models/user.models.js';
export const getUserForSidebar = async(req, res) =>{
    try{
        const loggedInUserId = req.user._id;
        const filterusers = await User.find().select("-password");
        res.status(200).json(filterusers);
    }
    catch(error){
        console.log("Error for getUserForSidebar: ", error.message);
    }
}