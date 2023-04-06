import { Request, Response } from "express";
import Profile from "../models/Profile";
import User from "../models/User";

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

export default {
  getProfileById
};
