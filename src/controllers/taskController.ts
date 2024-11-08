import { Request, Response } from "express";
import TaskQuery from "@helpers/TaskQuery";

const createtodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload, ...taskData } = req.body;
    const { id } = payload as { id: string };

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const result = await TaskQuery.CreateUserTask(taskData, id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: "Task created successfully",
        data: result.data,
      });
    }
    return;
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export { createtodo };
