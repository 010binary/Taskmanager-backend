import { SignJWT, jwtVerify, JWTPayload } from "jose";

// A mock blacklist to store invalidated tokens (use Redis or database in production)
const tokenBlacklist = new Set<string>();

/**
 * Signs an access token with a 10-minute expiration time.
 * @param payload {JWTPayload} - The payload to include in the JWT.
 * @returns {Promise<string>} - The signed JWT as a string.
 */
export async function signAccessToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: process.env.ALGO || "HS256" })
    .setExpirationTime("10min")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

/**
 * Signs a refresh token with a 5-day expiration time.
 * @param payload {JWTPayload} - The payload to include in the JWT.
 * @returns {Promise<string>} - The signed JWT as a string.
 */
export async function signRefreshToken(payload: JWTPayload): Promise<string> {
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
    if (tokenBlacklist.has(token)) {
      throw new Error("Token has been invalidated.");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return error as Error;
  }
}

/**
 * Invalidates an access and refresh token by adding them to the blacklist.
 * @param accessToken {string} - The access token to invalidate.
 * @param refreshToken {string} - The refresh token to invalidate.
 */
export function invalidateTokens(accessToken: string, refreshToken: string) {
  tokenBlacklist.add(accessToken);
  tokenBlacklist.add(refreshToken);
}
