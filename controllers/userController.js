import User from "../models/User.js";
import bcrypt from "bcryptjs";

//to display users
export const getUsers=async (req, res) => {
  const users=await User.find().select("-password");
  res.json(users);
};

//to create users
export const createUser=async(req,res)=>{
  const{name,email,password,role}=req.body;

  const hashed=await bcrypt.hash(password, 10);

  const user=await User.create({
    name,
    email,
    password: hashed,
    role
  });

  res.json(user);
};

//to update user
export const updateUser=async(req,res)=>{
  const{role,isActive}=req.body;

  const user=await User.findByIdAndUpdate(
    req.params.id,
    {role,isActive},
    {new:true}
  );

  res.json(user);
};

//to delete user
export const deleteUser=async(req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json({message:"User deleted" });
};