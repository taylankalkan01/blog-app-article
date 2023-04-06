import { Router } from "express";
import profileController from "../controllers/profileController";

const router = Router();

router.get("/:userID", profileController.getProfileById);

export default router;
