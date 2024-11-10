import express, { Router } from "express";
import { authMiddleware } from "@middleware/authMiddleware";
import {
  createTodo,
  updateTodo,
  fetchAllTodo,
  fetchTodoById,
  deleteTodo,
  fetchTodoByDate,
} from "@controller/taskController";

const router: Router = express.Router();

router.post("/create", authMiddleware, createTodo);

router.put("/update", authMiddleware, updateTodo);

router.get("/getall", authMiddleware, fetchAllTodo);

router.get("/get/:id", authMiddleware, fetchTodoById);

router.get("/getquery", authMiddleware, fetchTodoByDate);

router.delete("/delete/:id", authMiddleware, deleteTodo);

export default router;
