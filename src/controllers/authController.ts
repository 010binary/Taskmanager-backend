import { Request, Response } from "express";
import { UserQuery } from "@helpers/UserQuery";
import { signAccessToken, signRefreshToken } from "@utils/jwt";
import { RegisterParams } from "../types/User";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as RegisterParams;

    // Validate the data
    const requiredFields: { key: keyof RegisterParams; name: string }[] = [
      { key: "fullname", name: "FullName" },
      { key: "email", name: "Email" },
      { key: "occupation", name: "Occupation" },
      { key: "password", name: "Password" },
    ];

    for (const { key, name } of requiredFields) {
      if (!data[key]) {
        res.status(400).json({ message: `${name} is required` });
        return;
      }
    }

    // Save the data to the database
    const result = await UserQuery.Register(data);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    const accessToken = await signAccessToken({
      email: result.data.email,
      id: result.data.id,
    });

    const refreshToken = await signRefreshToken({ id: result.data.id });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
    });

    res.status(201).json({
      user: result.data,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as {
      email: string;
      password: string;
    };

    // Validate the data
    const requiredFields: { key: keyof typeof data; name: string }[] = [
      { key: "email", name: "Email" },
      { key: "password", name: "Password" },
    ];
    for (const { key, name } of requiredFields) {
      if (!data[key]) {
        res.status(400).json({ message: `${name} is required` });
        return;
      }
    }
    const { email, password } = data;
    const result = await UserQuery.Login(email, password);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    const accessToken = await signAccessToken({
      email: result.data.email,
      id: result.data.id,
    });

    const refreshToken = await signRefreshToken({ id: result.data.id });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
    });

    res.status(200).json({
      user: result.data,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
}

export { register, login };
