import { Request, Response } from "express";
import UserQuery from "@helpers/AuthQuery";
import { invalidateToken, rotateTokens, generateTokens } from "@utils/jwt";
import { RegisterParams } from "../types/Auth";

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

    const tokens = await generateTokens({
      email: result.data.email,
      id: result.data.id,
    });

    res.status(201).json({
      user: result.data,
      tokens,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
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

    const tokens = await generateTokens({
      email: result.data.email,
      id: result.data.id,
    });

    res.status(200).json({
      user: result.data,
      tokens,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body as { refreshToken: string };
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const newAccessToken = await rotateTokens(refreshToken);

    res.json({ accessToken: newAccessToken });
    return;
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Invalid refresh token",
    });
    return;
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken, accessToken } = req.body as {
    refreshToken: string;
    accessToken: string;
  };
  if (accessToken && refreshToken) {
    await invalidateToken(accessToken, refreshToken);
  }
  res.status(204).json({ message: "Logged out successfully" });
};

const checkmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as { email: string };

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const result = await UserQuery.User(email);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }
    const tokens = await generateTokens({
      email: result.data.email,
      id: result.data.id,
    });

    const { refreshToken: _, ...token } = tokens;

    res.status(200).json({ message: "Email found", user: result.data, token });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const result = await UserQuery.ForgotPassword(email, password);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({ message: "Password Changed success" });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body as {
      oldPassword: string;
      newPassword: string;
    };
    const { id } = req.body.payload as { id: string };

    if (!oldPassword || !newPassword) {
      res
        .status(400)
        .json({ message: "Old password and new password required" });
      return;
    }

    const result = await UserQuery.changePassword(id, oldPassword, newPassword);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({ message: "Password changed successfully" });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export {
  register,
  login,
  logout,
  refresh,
  changePassword,
  forgotPassword,
  checkmail,
};
