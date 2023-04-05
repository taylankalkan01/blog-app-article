//npm packages
import express, { Application, Response } from "express";
import cookieParser from "cookie-parser";
require("dotenv").config();

// Custom Modules, Packages, Configs, etc.
import { connectDB } from "./databases/mongoDB";
import { initRoutes } from "./routes/routes";

//Application
const app: Application = express();
app.use(express.json());
app.use(cookieParser());

//healthcheck
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ error: false, message: "healthcheck" });
});

connectDB();
initRoutes(app);
export default app;
