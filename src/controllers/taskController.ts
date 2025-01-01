import { Response } from "express";
import { CustomRequest } from "../types/Request";
import TaskQuery from "@helpers/TaskQuery";

const createTodo = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { ...taskData } = req.body;
    const { id } = req.payload as { id: string };

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const result = await TaskQuery.CreateUserTask(taskData, id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(201).json({
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

const updateTodo = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { ...taskdata } = req.body;
    const taskId = taskdata.id as string;

    if (!taskId) {
      res.status(400).json({
        message: "task Id was not provided in the CustomRequest",
      });
      return;
    }

    const result = await TaskQuery.UpdateUserTask(taskId, taskdata);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: "Task Updated successfully",
        data: result.data,
      });
    }

    return;
  } catch (error) {
    console.error("error updating task: ", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const fetchAllTodo = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.payload as { id: string };

    if (!id) {
      res.status(400).json({
        message: "Id was not provided in the CustomRequest",
      });
      return;
    }

    const result = await TaskQuery.FetchUserTasks(id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: "All Avaliable User Task",
        data: result.data,
      });
    }

    return;
  } catch (error) {
    console.error("error fetching task: ", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const fetchTodoById = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id as string;

    if (!taskId) {
      res.status(400).json({
        message: "Id was not provided in the CustomRequest",
      });
      return;
    }

    const result = await TaskQuery.FetchTaskById(taskId);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: `Task with the ${taskId} found`,
        data: result.data,
      });
    }

    return;
  } catch (error) {
    console.error("error fetching task: ", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const fetchTodoByDate = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.payload as { id: string };
    const { startdate, enddate } = req.query;

    if (!startdate) {
      res.status(400).json({ message: "Start date must be provided" });
      return;
    }

    const result = await TaskQuery.FetchTaskByDate(
      id,
      startdate as string,
      (enddate as string) || new Date().toISOString().split("T")[0] // Default to today's date if no enddate
    );

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: "Tasks found",
        data: result.data,
      });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

const deleteTodo = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id as string;

    if (!taskId) {
      res.status(400).json({
        message: "Id was not provided in the CustomRequest",
      });
      return;
    }

    const result = await TaskQuery.DeleteUserTask(taskId);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: `Task with the ${taskId} deleted`,
        data: result.data,
      });
    }

    return;
  } catch (error) {
    console.error("error fetching task: ", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export {
  createTodo,
  updateTodo,
  fetchAllTodo,
  fetchTodoById,
  deleteTodo,
  fetchTodoByDate,
};
