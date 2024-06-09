import bcrypt from "bcrypt";
import User from '../models/user.models.js';
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            console.error('Passwords do not match');
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.error('Username already exists');
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

       
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({error: "Invalid user"})
        }
       

    } catch (error) {
        console.error('Error during sign-up:', error); // Log the error to the console
        res.status(500).json({ error: error.message || "There was an error processing your request brother" });
    }
};

export const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password|| "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "inavalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id : user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch(error){
        console.error('Error during login:', error); // Log the error to the console
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const logout = (req, res) => {
   try{
    res.cookie("jwt","",{maxAge: 0});
    res.status(200).json("logged out succesfuly");

   }
   catch(error){
    console.error('Error during login:', error); // Log the error to the console
    res.status(500).json({ error: error.message || "Internal server error" });
   }
};
