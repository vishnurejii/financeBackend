import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, allowRoles("admin"), getUsers);
router.post("/", auth, allowRoles("admin"), createUser);
router.put("/:id", auth, allowRoles("admin"), updateUser);
router.delete("/:id", auth, allowRoles("admin"), deleteUser);

export default router;