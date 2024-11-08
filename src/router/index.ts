import { Request, Response } from "express";
import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/tasks", taskRoutes);

router.get("/", (req: Request, res: Response) => {
  res.send(req.useragent).status(200);
});

export default router;
