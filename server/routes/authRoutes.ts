import express from "express";
import { signup, login, getUserInfo } from "../controller/userController";
import { verifyToken } from "../middleware/auth";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userinfo", verifyToken, getUserInfo);

export default router;
