import connect from "@orm/connect";
import prisma from "@orm/index";
import {
  CreateTask,
  CreateTaskParams,
  Result,
  Task,
  UpdateTask,
  UpdateTaskParams,
} from "../types/Task";

const CreateUserTask = async (
  CreateTaskParams: CreateTaskParams,
  userId: string
): Promise<CreateTask> => {
  try {
    await connect();
    const task = await prisma.todo.create({
      data: {
        title: CreateTaskParams.title,
        day: CreateTaskParams.day,
        date: CreateTaskParams.date,
        note: CreateTaskParams.note,
        status: CreateTaskParams.status,
        time: CreateTaskParams.time,
        repeat: CreateTaskParams.repeat,
        priority: CreateTaskParams.priority,
        fnshTime: Number(CreateTaskParams.fnshTime),
        userId: userId,
      },
    });
    return {
      success: true,
      data: task,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const UpdateUserTask = async (
  taskId: string,
  updateData: UpdateTaskParams
): Promise<UpdateTask> => {
  try {
    await connect();

    const updatedata = Object.fromEntries(
      Object.entries({
        title: updateData.title,
        day: updateData.day,
        date: updateData.date,
        note: updateData.note,
        status: updateData.status,
        time: updateData.time,
        repeat: updateData.repeat,
        priority: updateData.priority,
        fnshTime: updateData.fnshTime,
      }).filter(([_, value]) => value !== undefined)
    );

    const task = await prisma.todo.update({
      where: { id: taskId },
      data: updatedata,
    });
    return {
      success: true,
      data: task,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const FetchUserTasks = async (userId: string): Promise<Result<Task[]>> => {
  try {
    await connect();
    const tasks = await prisma.todo.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: tasks,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const FetchTaskById = async (taskId: string): Promise<Result<Task>> => {
  try {
    await connect();
    const task = await prisma.todo.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      return { success: false, error: "Task not found" };
    }
    return { success: true, data: task };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const FetchTaskByDate = async (
  userId: string,
  date: string
): Promise<Result<Task[]>> => {
  try {
    await connect();
    const task = await prisma.todo.findMany({
      where: { userId: userId, date: date },
    });
    if (!task) {
      return { success: false, error: "No task is avaliable for this day" };
    }
    return { success: true, data: task };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const DeleteUserTask = async (taskId: string): Promise<Result<null>> => {
  try {
    await connect();
    await prisma.todo.delete({
      where: { id: taskId },
    });
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const TaskQuery = {
  DeleteUserTask,
  FetchTaskById,
  FetchUserTasks,
  UpdateUserTask,
  FetchTaskByDate,
  CreateUserTask,
};
export default TaskQuery;
