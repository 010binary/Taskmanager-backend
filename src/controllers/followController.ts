import { Request, Response } from "express";
import FollowQuery from "@helpers/FollowQuery";

const getFollowsCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    const result = await FollowQuery.FollowCount(id);

    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
    } else {
      res.status(200).json({
        message: "Follow data",
        data: result.data,
      });
    }

    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export { getFollowsCount };
