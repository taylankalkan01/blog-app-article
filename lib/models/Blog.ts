import mongoose, { Document } from "mongoose";
import moment from "moment";

export interface Blog extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: string;
}

const blogSchema = new mongoose.Schema<Blog>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        content: {
          type: String,
          required: true
        },
        createdAt: {
          type: String,
          default: moment().format("MMMM Do YYYY, h:mm:ss a")
        }
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

const Blog = mongoose.model<Blog>("Blog", blogSchema);

export default Blog;
