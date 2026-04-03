import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { validateRecord } from "../middleware/validateMiddleware.js";
import * as rc from "../controllers/recordController.js";

const router = express.Router();

router.post("/", auth, allowRoles("admin"), validateRecord, rc.createRecord);
router.get("/", auth, allowRoles("admin", "analyst"), rc.getRecords);
router.put("/:id", auth, allowRoles("admin"), rc.updateRecord);
router.delete("/:id", auth, allowRoles("admin"), rc.deleteRecord);

export default router;