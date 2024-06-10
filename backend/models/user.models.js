import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: { 
         type: String,
         required: true },
    username: {
         type: String,
         required: true, unique: true },
    password: { 
        type: String,
         required: true },
    gender: { 
        type: String,
         required: true },
    profilePic: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
