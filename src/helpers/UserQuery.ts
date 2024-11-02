import connect from "@orm/connect";
import prisma from "@orm/index";
import bcrypt from "bcrypt";
import type {
  RegisterParams,
  RegisterResult,
  LoginResult,
  UpdateResult,
  UpdateParams,
  ChangePasswordResult,
  ForgotPasswordResult,
  UserResult,
} from "../types/User";

const Register = async (params: RegisterParams): Promise<RegisterResult> => {
  try {
    await connect();
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: params.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.password, salt);

    const user = await prisma.user.create({
      data: {
        fullname: params.fullname,
        email: params.email,
        occupation: params.occupation,
        password: hashedPassword,
      },
    });

    // Remove password from the returned user object
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: userWithoutPassword,
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

const Login = async (email: string, password: string): Promise<LoginResult> => {
  try {
    await connect();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
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

const Update = async (params: UpdateParams): Promise<UpdateResult> => {
  try {
    await connect();

    // Remove undefined values from update data
    const updateData = Object.fromEntries(
      Object.entries({
        fullname: params.fullname,
        email: params.email,
        occupation: params.occupation,
        social: params.social,
        image: params.image,
      }).filter(([_, value]) => value !== undefined)
    );

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
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

const ForgotPassword = async (
  email: string,
  password: string
): Promise<ForgotPasswordResult> => {
  try {
    await connect();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      data: { message: "Password changed successfully" },
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

const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordResult> => {
  try {
    await connect();

    // Find user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // Check if user exists
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Check if old password is valid
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      data: { message: "Password changed successfully" },
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

const User = async (email: string): Promise<UserResult> => {
  try {
    await connect();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
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

const UserQuery = {
  User,
  Register,
  Update,
  Login,
  ForgotPassword,
  changePassword,
};

export { UserQuery };
