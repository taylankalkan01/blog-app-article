import { Router } from "express";
import profileController from "../controllers/profileController";
import { verifyToken } from "../middlewares/verifyToken";
import {uploadImage} from "../middlewares/uploadImage"

const router = Router();

router.get("/:userID", profileController.getProfileById);
router.post("/",verifyToken, uploadImage, profileController.createProfile);

export default router;
