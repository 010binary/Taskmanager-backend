import connect from "@orm/connect";
import prisma from "@orm/index";
import type { UpdateResult, UpdateParams, Status } from "../types/Profile";

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

const Status = async (id: string): Promise<Status> => {
  try {
    await connect();

    // Fetch the current value of `isVisible`
    const currentValue = await prisma.user.findUnique({
      where: { id },
      select: { isVisible: true },
    });

    if (!currentValue) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Toggle the `isVisible` value
    const updatedValue = await prisma.user.update({
      where: { id },
      data: { isVisible: !currentValue.isVisible },
      select: {
        id: true,
        isVisible: true,
      },
    });

    return {
      success: true,
      data: updatedValue,
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

const ProfileQuery = {
  Update,
  Status,
};

export default ProfileQuery;
