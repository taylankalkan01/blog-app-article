import { Application } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";

export function initRoutes(app: Application) {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/profile", profileRoutes);
}
