import Record from "../models/Record.js";

export const getSummary = async (req, res) => {
  const match = { isDeleted: { $ne: true } };

  const summaryData = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  const categoryData = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: { type: "$type", category: "$category" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpense = 0;
  
  summaryData.forEach(item => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
  });

  const categories = {
      income: {},
      expense: {}
  };

  categoryData.forEach(item => {
      const type = item._id?.type;
      const cat = item._id?.category;
      if (type && cat) {
          categories[type][cat] = item.total;
      }
  });

  res.json({
      summary: {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense
      },
      categories
  });
};