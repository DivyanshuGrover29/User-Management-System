import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userController";


const router = express.Router();

router.route("/users").post(createUser);
router.route("/users").get(getAllUsers);
router.route("/users/:userId").put(updateUser);//using params we can do it
router.route("/users/:userId").delete(deleteUser);

export default router;