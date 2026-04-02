import bcrypt from "bcryptjs"
import userModel from "../models/User.js"

export const createUser=async(req,res)=>{
    const{name,email,password,role}=req.body

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        name,
        email,
        password:hashedPassword,
        role
    })
    res.json(user)
}

export const getUsers=async(req,res)=>{
    const users=await userModel.find().select("-password")
    res.json(users)
}

export const updateUSer=async(req,res)=>{
    const user=await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json(user)
}

export const deleteUser=async(req,res)=>{
    await userModel.findByIdAndDelete(req.params.id)
    res.json({message:"deleted"})
}