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
      return;
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

const getFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    const result = await FollowQuery.Following(id);

    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
      return;
    } else {
      if (result.data == null || result.data.length == 0) {
        res.status(404).json({
          message: "No following found",
          data: result.data,
        });
        return;
      }

      res.status(200).json({
        message: "Following List",
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

const getFollower = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    const result = await FollowQuery.Follower(id);

    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
      return;
    } else {
      if (result.data == null || result.data.length == 0) {
        res.status(404).json({
          message: "No follower found",
          data: result.data,
        });
        return;
      }

      res.status(200).json({
        message: "Follower List",
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

const addfollow = async (req: Request, res: Response): Promise<void> => {
  try {
    const followerId = req.body.payload.id as string;
    const followingId = req.body.id as string;

    if (!followingId) {
      res.status(400).json({
        message: "Please pass a valid user Id ",
      });
      return;
    }

    const result = await FollowQuery.AddFollowing(followerId, followingId);

    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
      return;
    } else {
      res.status(200).json({
        message: "Follower List",
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

const removefollow = async (req: Request, res: Response): Promise<void> => {
  try {
    const followerId = req.body.payload.id as string;
    const followingId = req.body.id as string;

    if (!followingId) {
      res.status(400).json({
        message: "Please pass a valid user Id ",
      });
      return;
    }

    const result = await FollowQuery.RemoveFollowing(followerId, followingId);

    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
      return;
    } else {
      res.status(200).json({
        message: "Follower List",
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

export { getFollowsCount, getFollowing, getFollower, addfollow, removefollow };
