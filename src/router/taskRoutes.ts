import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { createtodo } from "@controller/taskController";

const router: Router = express.Router();

router.post("/create", authMiddleware, createtodo);

export default router;
