// jwt.ts
import { SignJWT, jwtVerify, JWTPayload } from "jose";

/**
 * Signs a JWT with the provided payload.
 * @param payload {JWTPayload} - The payload to include in the JWT.
 * @returns {Promise<string>} - The signed JWT as a string.
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: process.env.ALGO || "HS256" })
    .setExpirationTime("5d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

/**
 * Verifies a JWT token and returns its payload.
 * @param token {string} - The JWT token to verify.
 * @returns {Promise<JWTPayload | Error>} - Returns the decoded payload if the token is valid, or an error if invalid.
 */
export async function verifyToken(token: string): Promise<JWTPayload | Error> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return error as Error;
  }
}
