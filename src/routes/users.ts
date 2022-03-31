import express from "express";
import { usersController } from "../controllers/users";
const router = express.Router();
const { signUp, getUsers, checkUsername  } = usersController;

router.get("/", getUsers);
router.post("/check/nickname", checkUsername);

router.post("/signup", signUp);




export default router;
