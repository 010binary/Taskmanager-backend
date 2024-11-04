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
type UpdateResult = Result<Omit<User, "password">>;
type Status = Result<
  Omit<
    User,
    | "fullname"
    | "email"
    | "occupation"
    | "password"
    | "social"
    | "image"
    | "createdAt"
    | "updatedAt"
  >
>;

export type { UpdateParams, UpdateResult, Status };
