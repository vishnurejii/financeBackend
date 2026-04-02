import express from "express"
import{createUser,deleteUser,getUsers, updateUSer} from "../controllers/userController.js"
import { authUser,auth } from "../middleware/auth.js"

const router=express.Router()

router.post("/",authUser,auth("admin"),createUser)
router.get("/",authUser,auth("admin"),getUsers)
router.put("/:id",auth("admin"),updateUSer)
router.delete("/:id",auth("admin"),deleteUser)



export default router