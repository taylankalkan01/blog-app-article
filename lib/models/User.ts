import mongoose, { Document } from "mongoose";
import moment from "moment";

export interface User extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a")
    },
    updatedAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a")
    }
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);

export default User;
