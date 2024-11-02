type User = {
  fullname: string;
  email: string;
  occupation: string;
  password?: string;
  id: string;
  social: string | null;
  isVisible: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type RegisterParams = {
  fullname: string;
  email: string;
  occupation: string;
  password: string;
};

type UpdateParams = {
  id: string;
  fullname?: string;
  email?: string;
  occupation?: string;
  social?: string;
  image?: string;
};

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

// Specific result types
type RegisterResult = Result<Omit<User, "password">>;
type LoginResult = Result<Omit<User, "password">>;
type UpdateResult = Result<Omit<User, "password">>;
type ForgotPasswordResult = Result<{ message: string }>;
type ChangePasswordResult = Result<{ message: string }>;
type UserResult = Result<Omit<User, "password">>;
export type {
  User,
  RegisterParams,
  Result,
  UpdateParams,
  RegisterResult,
  LoginResult,
  UpdateResult,
  ForgotPasswordResult,
  ChangePasswordResult,
  UserResult,
};
