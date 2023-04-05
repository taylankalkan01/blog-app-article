import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { registerUserInput } from "../schemas/authValidation";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {

    //validation
    registerUserInput.parse(req.body);

    //check if email is exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Email already exist"
      });
    }

    //hash password
    const saltPass = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(password, saltPass);

    //register
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hassPass
    });
    const data = await newUser.save();

    //response
    res.status(201).json({
      error: false,
      message: "User Account Created Succesfully!",
      data: data
    });
  } catch (err) {   
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

export default {
  registerUser
};
