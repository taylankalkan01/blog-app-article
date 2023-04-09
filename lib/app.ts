//npm packages
import express, { Application, Response } from "express";
import cookieParser from "cookie-parser";
require("dotenv").config();
import path from "path"

// Custom Modules, Packages, Configs, etc.
import { connectDB } from "./databases/mongoDB";
import { initRoutes } from "./routes/routes";

//Application
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(express.urlencoded({extended:true}))

//healthcheck
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ error: false, message: "healthcheck" });
});

connectDB();
initRoutes(app);
export default app;
