import Record from "../models/Record.js";

//to create record
export const createRecord=async(req,res)=>{
  try{
      const data={ ...req.body };
      if(!data.notes && data.note) {
          data.notes = data.note;
      }
      
      const record=await Record.create(data);
      res.json(record);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

//to display records
export const getRecords=async (req, res)=>{
  const{ type, category, startDate, endDate }=req.query;

  let filter={ isDeleted: { $ne: true }};

  if(type) filter.type=type;
  if(category) filter.category = category;

  if(startDate && endDate){
    filter.date={
      $gte:new Date(startDate),
      $lte:new Date(endDate)
    };
  }

  const records=await Record.find(filter);
  res.json(records);
};

//for update record
export const updateRecord=async (req, res)=>{
  const record=await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
        new: true
     }
  );
  res.json(record);
};

//for delete record
export const deleteRecord=async(req, res)=>{
  await Record.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Soft deleted" });
};