import jwt from 'jsonwebtoken';
import User from '../../models/user.models.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, "FFJHFGJK");
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export default protectRoute;
