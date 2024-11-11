import connect from "@orm/connect";
import prisma from "@orm/index";
import { FollowCount, Follows, Result } from "../types/Follow";

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

const FollowQuery = {
  FollowCount,
  Follower,
};

export default FollowQuery;
