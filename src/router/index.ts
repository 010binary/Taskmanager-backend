import { Request, Response, Router } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import taskRoutes from "./taskRoutes";
import followRoutes from "./followRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/tasks", taskRoutes);
router.use("/follow", followRoutes);

export default router;
