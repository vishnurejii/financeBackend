import express from "express"
import { getSummery } from "../controllers/dashboardController.js"
import { authUser } from "../middleware/auth.js"

const router=express.Router()

router.get("/summery",authUser,getSummery)

export default router