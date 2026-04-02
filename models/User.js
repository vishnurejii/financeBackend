import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type: String , unique: true},
    password: String,
    role: {type:String,
        enum:["customer","analyst","admin"],
        default:"customer"
    },
    isActive:{type:Boolean, default:true},

},{timestamps: true})


const userModel=mongoose.model("User",userSchema)
export default userModel
