import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import {
  createTodo,
  updateTodo,
  fetchAllTodo,
  fetchTodoById,
  deleteTodo,
  fetchTodoByDay,
} from "@controller/taskController";

const router: Router = express.Router();

router.post("/create", authMiddleware, createTodo);

router.put("/update", authMiddleware, updateTodo);

router.get("/getall", authMiddleware, fetchAllTodo);

router.get("/get/<date:string>", authMiddleware);

router.get("/get/<date:string>", authMiddleware);

router.delete("/delete", authMiddleware, deleteTodo);

export default router;
