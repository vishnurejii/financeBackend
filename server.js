import "dotenv/config";

import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log("DB Error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});