import { Router } from "express";
import profileController from "../controllers/profileController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/:userID", profileController.getProfileById);
router.post("/",verifyToken, profileController.createProfile);

export default router;
