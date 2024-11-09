import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import { createTodo } from "@controller/taskController";

const router: Router = express.Router();

router.post("/create", authMiddleware, createTodo);

export default router;
