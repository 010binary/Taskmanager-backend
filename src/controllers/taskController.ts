import { Request, Response } from "express";
import TaskQuery from "@helpers/TaskQuery";

const createTodo = async (req: Request, res: Response): Promise<void> => {
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

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload, ...taskdata } = req.body;
    const { taskId } = taskdata.id as { taskId: string };

    if (!taskId) {
      res.status(400).json({
        message: "task Id was not provided in the request",
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

const fetchAllTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    if (!id) {
      res.status(400).json({
        message: "Id was not provided in the request",
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

const fetchTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id as string;

    if (!taskId) {
      res.status(400).json({
        message: "Id was not provided in the request",
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

const fetchTodoByDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload, date } = req.body;
    const { id } = payload as { id: string };

    if (!date) {
      res.status(400).json({
        message: "date was not provided in the request",
      });
      return;
    }

    const result = await TaskQuery.FetchTaskByDate(id, date);

    if (!result.success) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(200).json({
        message: `Task with the ${id} found`,
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

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id as string;

    if (!taskId) {
      res.status(400).json({
        message: "Id was not provided in the request",
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
  fetchTodoByDay,
};
