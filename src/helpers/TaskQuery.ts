import { PrismaClient, priority } from '@prisma/client';
import {
  Task,
  CreateTask,
  UpdateTask,
  CreateTaskParams,
  UpdateTaskParams,
} from '../types/task';

const prisma = new PrismaClient();

class TaskQuery {
  static async CreateUserTask(
    taskData: CreateTaskParams,
    userId: string
  ): Promise<CreateTask> {
    try {
      const task = await prisma.todo.create({
        data: {
          ...taskData,
          userId,
          status: false,
          priority: taskData.priority as priority,
          fnshTime: taskData.fnshTime ? parseInt(taskData.fnshTime) : null,
        },
      });

      return {
        success: true,
        data: {
          id: task.id,
          title: task.title,
          day: task.day,
          date: task.date,
          note: task.note,
          status: task.status,
          time: task.time,
          repeat: task.repeat,
          priority: task.priority,
          fnshTime: task.fnshTime,
          userId: task.userId
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create task',
      };
    }
  }

  static async UpdateUserTask(
    taskId: string,
    taskData: UpdateTaskParams
  ): Promise<UpdateTask> {
    try {
      const task = await prisma.todo.update({
        where: { id: taskId },
        data: {
          ...taskData,
          fnshTime: taskData.fnshTime ? parseInt(taskData.fnshTime) : undefined,
        },
      });

      return {
        success: true,
        data: {
          id: task.id,
          title: task.title,
          day: task.day,
          date: task.date,
          note: task.note,
          status: task.status,
          time: task.time,
          repeat: task.repeat,
          priority: task.priority,
          fnshTime: task.fnshTime,
          userId: task.userId
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update task',
      };
    }
  }

  static async FetchUserTasks(userId: string): Promise<Result<Task[]>> {
    try {
      const tasks = await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return {
        success: true,
        data: tasks.map(task => ({
          id: task.id,
          title: task.title,
          day: task.day,
          date: task.date,
          note: task.note,
          status: task.status,
          time: task.time,
          repeat: task.repeat,
          priority: task.priority,
          fnshTime: task.fnshTime,
          userId: task.userId
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
      };
    }
  }

  static async FetchTaskById(taskId: string): Promise<Result<Task>> {
    try {
      const task = await prisma.todo.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        return {
          success: false,
          error: 'Task not found',
        };
      }

      return {
        success: true,
        data: {
          id: task.id,
          title: task.title,
          day: task.day,
          date: task.date,
          note: task.note,
          status: task.status,
          time: task.time,
          repeat: task.repeat,
          priority: task.priority,
          fnshTime: task.fnshTime,
          userId: task.userId
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch task',
      };
    }
  }

  static async FetchTaskByDate(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<Result<Task[]>> {
    try {
      const tasks = await prisma.todo.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      return {
        success: true,
        data: tasks.map(task => ({
          id: task.id,
          title: task.title,
          day: task.day,
          date: task.date,
          note: task.note,
          status: task.status,
          time: task.time,
          repeat: task.repeat,
          priority: task.priority,
          fnshTime: task.fnshTime,
          userId: task.userId
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
      };
    }
  }

  static async DeleteUserTask(taskId: string): Promise<Result<boolean>> {
    try {
      await prisma.todo.delete({
        where: { id: taskId },
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete task',
      };
    }
  }
}

export default TaskQuery;