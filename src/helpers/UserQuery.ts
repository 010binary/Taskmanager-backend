import connect from "@orm/connect";
import prisma from "@orm/index";
import bcrypt from "bcrypt";

interface registerParams {
  fullname: string;
  email: string;
  occupation: string;
  password: string;
}

interface updateParams {
  id: string;
  fullname: string;
  email: string;
  occupation: string;
  social: string;
  image: string;
}

const Register = async (params: registerParams) => {
  try {
    await connect();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: params.email },
    });

    if (existingUser) {
      const err = new Error("User already exists");
      return err.message;
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

    delete (user as { password?: string }).password;
    return user;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return err.message;
  } finally {
    await prisma.$disconnect();
  }
};

const Login = async (email: string, password: string) => {
  try {
    await connect();

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      const err = new Error("User not found");
      return err.message;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const err = new Error("Invalid password");
      return err.message;
    }
    delete (user as { password?: string }).password;
    return user;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return err.message;
  } finally {
    await prisma.$disconnect();
  }
};

const Update = async (params: updateParams) => {
  try {
    await connect();

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        fullname: params.fullname,
        email: params.email,
        occupation: params.occupation,
        social: params.social,
        image: params.social,
      },
    });
    delete (user as { password?: string }).password;
    return user;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return err.message;
  } finally {
    await prisma.$disconnect();
  }
};

const ChangePassword = async (id: string, password: string) => {
  try {
    await connect();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        password: hashedPassword,
      },
    });

    return { message: "Password changed successfully" };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return err.message;
  } finally {
    await prisma.$disconnect();
  }
};

const User = async (email: string) => {
  try {
    await connect();

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      const err = new Error("User not found");
      return err.message;
    }
    delete (user as { password?: string }).password;
    return user;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return err.message;
  } finally {
    await prisma.$disconnect();
  }
};

const UserQuery = { User, Register, Update, Login, ChangePassword };

export { UserQuery };
