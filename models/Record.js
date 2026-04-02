import mongoose from "mongoose";

const recordSchema=new mongoose.Schema({
    amount: {type:Number, 
        required:[ true, 'amount is required' ],
        min: [0.01, 'Amount must be greater than 0']
    },

    type: {type: String,
        enum:["income","expense"],
        required:[true,'type is required']
    },
    
    category:{type: String,
        enum:['salary',
            'freelance',
            'investment',
            'rent',
            'food',
            'transport',
            'utilities',
            'healthcare',
            'entertainment',
            'education',
            'shopping',
            'insurance',
            'other']
    },

    date: {type: Date,
        required:[true,'Date is required'],
        default:Date.now 
    },

    notes: {type: String, required:true},

    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
},{timestamps:true})

const recordModel=mongoose.model("Record",recordSchema)

export default recordModel