import prisma from ".";

/**
 * This file is used to connect to the Prisma client.
 * @returns {Promise<void | Error>} - Returns void or an error.
 */

export default async function connect(): Promise<void | Error> {
  try {
    await prisma.$connect();
  } catch (error) {
    const err = error as Error;
    return err;
  }
}
