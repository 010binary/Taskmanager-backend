import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { changestatus } from "@controller/profileController";

const router: Router = express.Router();

router.post("/changestatus", authMiddleware, changestatus);

export default router;
