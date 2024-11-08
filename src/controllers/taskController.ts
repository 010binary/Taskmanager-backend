import { Request, Response } from "express";
import TaskQuery from "@helpers/TaskQuery";

const createtodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    const data = req.body;
    const {
      title,
      day,
      date,
      note,
      time,
      repeat,
      priority,
      status,
      fnshTime,
    } = data;
    const value = {
      title,
      day,
      date,
      note,
      time,
      repeat,
      status,
      priority,
      fnshTime,
    };
    console.log("data: ", value);
    console.log("id: ", id);
    const result = await TaskQuery.CreateUserTask(value, id);
    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }
    res
      .status(200)
      .json({ message: "Task created successfully", data: result.data });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export { createtodo };
