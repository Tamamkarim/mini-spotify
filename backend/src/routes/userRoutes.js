import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";

const router = Router();

router.post("/login", loginUser);
router.post("/", createUser);
router.get("/", getUsers);

export default router;
