import express from "express";
import { createRecord,getRecords,updateRecord,deleteRecord } from "../controllers/recordController.js";
import { authUser,auth } from "../middleware/auth.js";

const router=express.Router()

router.use(authUser)

router.post("/",auth("admin"),createRecord)
router.get("/",auth("customer","analyst","admin"),getRecords)
router.put("/:id",auth("admin"),updateRecord)
router.delete("/:id",auth("admin"),deleteRecord)

export default router