export const validateRecord = (req, res, next) => {
  const{ amount, type, category, date }=req.body;

  if(!amount || amount<=0)
    return res.status(400).json({message: "Invalid amount"});

  if(!["income", "expense"].includes(type))
    return res.status(400).json({message: "Invalid type"});

  if(!category)
    return res.status(400).json({message: "Category required"});

  if(!date)
    return res.status(400).json({message: "Date required"});

  next();
};