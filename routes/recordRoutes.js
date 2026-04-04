import express from "express";
import {auth} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/roleMiddleware.js";
import {validateRecord} from "../middleware/validateMiddleware.js";
import {createRecord,getRecords,updateRecord,deleteRecord} from "../controllers/recordController.js";

const router = express.Router();

router.post("/", auth, allowRoles("admin"), validateRecord, createRecord);
router.get("/", auth, allowRoles("admin", "analyst"),getRecords);
router.put("/:id", auth, allowRoles("admin"),updateRecord);
router.delete("/:id", auth, allowRoles("admin"),deleteRecord);

export default router;