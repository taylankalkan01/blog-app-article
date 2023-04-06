import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  const key = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
  let user;
  try {
    if (!token) {
      return res.status(403).json({
        error: true,
        message: "Invalid Auth token(req.cookies.jwt) "
      });
    }

    user = jwt.verify(token, key);
    (req as CustomRequest).token = user;

    next();
  } catch (err) {
    res.status(500).json({ error: true, message: err });
  }
};
