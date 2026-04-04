import express from "express";
import {auth} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/roleMiddleware.js";
import {getSummary} from "../controllers/dashboardController.js";

const router=express.Router();

router.get("/", auth, allowRoles("admin", "analyst", "viewer"),getSummary);

export default router;