import recordModel from "../models/Record.js";

export const getSummery=async(req,res)=>{
    const income=await recordModel.aggregate([
        {$match: {type:"income"}},
        {$group:{_id:null, total:{$sum:"$amount"}}}
    ])


    const expense=await recordModel.aggregate([
        {$match:{type:"expense"}},
        {$group:{_id:null,total:{$sum:"$amount"}}}

    ])

    res.json({
        income:income[0]?.total||0,
        expense:expense[0]?.total||0,
        balance:(income[0]?.total||0 ) - (expense[0]?.total||0)
    })
}