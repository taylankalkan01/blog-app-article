import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { registerUserInput } from "../schemas/authValidation";
import { generateToken } from "../helpers/generateToken";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    //validation
    registerUserInput.parse(req.body);

    //check if email is exist -> email must be unique
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Email already exist"
      });
    }

    //check if username is exist -> username must be unique
    const username = await User.findOne({ userName });
    if (username) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, username already exist"
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

const loginUser = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { userName: emailOrUsername }]
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: `User not found!  ${emailOrUsername}` });
    }

    //check password
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ error: true, message: "Password is wrong!" });
    }

    //generate token
    let token = await generateToken(user);
    if (!token) {
      return res
        .status(400)
        .json({
          error: true,
          message: `cannot generate token for user: ${emailOrUsername}`
        });
    }

    //send cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", //cross-site cookie ** boolean | 'lax' | 'strict' | 'none' | undefined;
      maxAge: 24 * 60 * 60 * 1000 //maxAge = 1 day
      // signed: true
      // path?: string | undefined;
      // domain?: string | undefined;
    });

    //response
    res.status(200).json({
      error: false,
      message: "User Login Succesfully!",
      data: user,
      token: token
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

export default {
  registerUser,
  loginUser
};
