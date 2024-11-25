import { Request, Response, NextFunction } from "express";

export const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.headers["x-refresh-token"] as string | undefined;
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken || !accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.body.accessToken = accessToken;
    req.body.refreshToken = refreshToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
