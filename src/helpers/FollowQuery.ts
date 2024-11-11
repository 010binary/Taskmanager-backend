import connect from "@orm/connect";
import prisma from "@orm/index";
import {
  AddFollowing,
  FollowCount,
  Follows,
  Result,
  RemoveFollowing,
} from "../types/Follow";
import { Prisma } from "@prisma/client";

const FollowCount = async (userId: string): Promise<FollowCount> => {
  try {
    await connect();

    const [followedByCount, followingcount] = await Promise.all([
      prisma.follow.count({
        where: { followingId: userId },
      }),
      prisma.follow.count({
        where: { followerId: userId },
      }),
    ]);
    return {
      success: true,
      data: {
        followedByCount,
        followingcount,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const Follower = async (userId: string): Promise<Result<Follows[]>> => {
  try {
    await connect();
    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });

    const followersData = followers.map((follower) => {
      const { id, fullname, occupation } = follower.follower;
      return { id, fullname, occupation };
    });

    return {
      success: true,
      data: followersData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const Following = async (userId: string): Promise<Result<Follows[]>> => {
  try {
    await connect();
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
    const followersData = following.map((following) => {
      const { id, fullname, occupation } = following.following;
      return { id, fullname, occupation };
    });

    return {
      success: true,
      data: followersData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const AddFollowing = async (
  followerId: string,
  followingId: string
): Promise<AddFollowing> => {
  try {
    await connect();
    const _ = await prisma.follow.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    return {
      success: true,
      data: { message: "following added" },
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "You are already following this user.",
      };
    }
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const RemoveFollowing = async (
  followerId: string,
  followingId: string
): Promise<RemoveFollowing> => {
  try {
    await connect();
    const _ = await prisma.follow.deleteMany({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    return {
      success: true,
      data: { message: "following remove" },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  } finally {
    await prisma.$disconnect();
  }
};

const FollowQuery = {
  FollowCount,
  Follower,
  Following,
  AddFollowing,
  RemoveFollowing,
};

export default FollowQuery;
