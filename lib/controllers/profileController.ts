import { Request, Response} from "express";
import Profile from "../models/Profile";
import User from "../models/User";
import { CustomRequest } from "../middlewares/verifyToken";
import mongoose from "mongoose";

//view profile
const getProfileById = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID).exec();
    if (!user) {
      return res.status(400).json({
        error: true,
        message: `User is not found with user id: ${userID}`
      });
    }

    const profile = await Profile.findOne({ user: user._id }).populate(
      "followers"
    );
    if (!profile) {
      return res.status(400).json({
        error: true,
        message: `user profile is not found!`
      });
    }

    res.status(200).json({
      error: false,
      message: "User Profile listed Succesfully!",
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};



export const createProfile = async (req:Request, res:Response) => {
  const {bio} = req.body
  const file = req.file;

  const token = (req as CustomRequest).token;
  let userID: mongoose.Types.ObjectId;

  try {
    
    if (typeof token === "string") {
      throw new Error("Invalid token");
    }
    userID = new mongoose.Types.ObjectId(token.user);

    const newProfile = new Profile({
      user: userID,
      bio,
      image:file?.path,
      followers:[]
    })

    const data = await newProfile.save()
    
    res.status(200).json({
      error: false,
      message: "User Profile created Succesfully!",
      data: data
    });
    
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
}

export default {
  getProfileById,
  createProfile
};
