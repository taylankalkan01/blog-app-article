import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  try {
    const payload = { user: user._id };

    const key = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
    if (key === "" || key === undefined) {
      return Promise.reject("Token key error");
    }

    const accessToken = jwt.sign(payload, key, { expiresIn: "3d" });
    return Promise.resolve(accessToken);
  } catch (err) {
    return Promise.reject(err);
  }
};
