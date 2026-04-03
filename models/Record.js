import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  isDeleted: { type: Boolean, default: false },
  amount: {type:Number, 
        required:[ true, 'amount is required' ],
        min: [0.01, 'Amount must be greater than 0']
    },

    type: {type: String,
        enum:["income","expense"],
        required:[true,'type is required']
    },
    category: String,
   date: {type: Date,
        required:[true,'Date is required'],
        default:Date.now 
    },

    notes: {type: String, required:true},

    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
});

const recordModel=mongoose.model("Record",recordSchema)

export default recordModel