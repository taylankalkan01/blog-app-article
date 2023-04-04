import mongoose, { Document } from "mongoose";
import moment from "moment";

export interface Profile extends Document {
  user: mongoose.Types.ObjectId;
  bio?: string;
  image?: string;
  followers: mongoose.Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

const profileSchema = new mongoose.Schema<Profile>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    bio: {
      type: String
    },
    image: {
      type: String
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
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

const Profile = mongoose.model<Profile>("Profile", profileSchema);

export default Profile;
