export const validateRecord = (req, res, next) => {
  const { amount, type, category, date } = req.body;

  if (!amount || amount <= 0)
    return res.status(400).json({ msg: "Invalid amount" });

  if (!["income", "expense"].includes(type))
    return res.status(400).json({ msg: "Invalid type" });

  if (!category)
    return res.status(400).json({ msg: "Category required" });

  if (!date)
    return res.status(400).json({ msg: "Date required" });

  next();
};