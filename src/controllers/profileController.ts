import { Response } from "express";
import ProfileQuery from "@helpers/ProfileQuery";
import { CustomRequest } from "../types/Request";

const changestatus = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.payload as { id: string };

    const result = await ProfileQuery.Status(id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({
      message: "Status changed successfully",
      value: result.data.isVisible,
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

const updateprofile = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.payload as { id: string };

    const result = await ProfileQuery.Update({ id, ...req.body });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({
      message: "Status changed successfully",
      result: result.data,
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

const getUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.payload as { id: string };
    const result = await ProfileQuery.User(id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({
      message: "User data",
      result: result.data,
    });
    return;

  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
}

export { changestatus, updateprofile, getUser };
