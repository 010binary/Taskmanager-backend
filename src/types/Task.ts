import { Todo } from "@prisma/client";

type Task = Todo;

type Params<T> = T;

type CreateTaskParams = Params<
  Omit<Task, "userId" | "id" | "createdAt" | "updatedAt">
>;
type UpdateTaskParams = Params<
  Omit<Task, "userId" | "id" | "createdAt" | "updatedAt">
>;

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type CreateTask = Result<Omit<Task, "createdAt" | "updatedAt">>;
type UpdateTask = Result<Omit<Task, "createdAt" | "updatedAt">>;

export type {
  Task,
  Result,
  CreateTask,
  UpdateTaskParams,
  CreateTaskParams,
  UpdateTask,
};
