import recordModel from "../models/Record.js";

export const createRecord=async(req,res)=>{
    const record=await recordModel.create({
        ...req.body,
        createdBy:req.user.id

    })

    res.json(record)
}

export const getRecords=async(req,res)=>{
    const{type, category, startDate, endDate}=req.query

    let filter={}

    if(type) filter.type=type
    if(category) filter.category=category

    if(startDate && endDate){
        filter.date={
            $gte:new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    const records=await recordModel.find(filter)
    res.json(records)
}
export const updateRecord=async(req,res)=>{
    const record=await recordModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    )
    res.json(record)
}

export const deleteRecord=async(req,res)=>{
    await recordModel.findByIdAndDelete(req.params.id)
    res.json({message: "deleted"})
}

