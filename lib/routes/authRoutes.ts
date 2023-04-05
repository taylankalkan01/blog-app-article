import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.registerUser);

export default router;
