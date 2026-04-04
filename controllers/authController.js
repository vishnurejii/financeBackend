import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



//login
export const login=async(req,res)=>{
     try{
        const{email,password}=req.body;

        // validation
        if(!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        const user=await User.findOne({ email });

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token=jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};