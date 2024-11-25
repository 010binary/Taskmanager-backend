import { SignJWT, jwtVerify } from "jose";
import { TokenPayload, TokenResponse } from "../types/Token";
import crypto from "crypto";

// Store revoked JTIs and their expiry timestamps
const revokedTokens: Map<string, number> = new Map();

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [jti, expiry] of revokedTokens.entries()) {
    if (expiry < now) {
      revokedTokens.delete(jti);
    }
  }
}, 1000 * 60 * 60);

async function signAccessToken(payload: TokenPayload): Promise<string> {
  const jti = crypto.randomBytes(16).toString("hex");
  return new SignJWT({ ...payload, jti, type: "access" })
    .setProtectedHeader({ alg: process.env.ALGO || "HS256" })
    .setExpirationTime("10m")
    .setIssuedAt()
    .setNotBefore(0)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

async function signRefreshToken(payload: TokenPayload): Promise<string> {
  const jti = crypto.randomBytes(16).toString("hex");
  return new SignJWT({ ...payload, jti, type: "refresh" })
    .setProtectedHeader({ alg: process.env.ALGO || "HS256" })
    .setExpirationTime("5d")
    .setIssuedAt()
    .setNotBefore(0)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

/**
 * Verifies the token and returns the payload
 */
export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const jti = payload.jti as string;
    if (jti && revokedTokens.has(jti)) {
      throw new Error("Token has been revoked");
    }

    if (!payload.type) {
      throw new Error("Invalid token type");
    }

    return payload as TokenPayload;
  } catch (error) {
    throw error;
  }
}

/**
 * Generates access and refresh tokens during login and registration
 */
export async function generateTokens(
  payload: TokenPayload
): Promise<TokenResponse> {
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload),
  ]);

  return {
    accessToken,
    refreshToken,
    expiresIn: 600,
    tokenType: "Bearer",
  };
}

/**
 * Invalidates both tokens during logout
 */
export async function invalidateToken(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  // Invalidate both tokens
  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(
        refreshToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (payload.jti && payload.exp) {
        revokedTokens.set(payload.jti, payload.exp * 1000);
      }
    } catch (error) {
      console.error("Failed to invalidate refresh token:", error);
    }
  }

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (payload.jti && payload.exp) {
        revokedTokens.set(payload.jti, payload.exp * 1000);
      }
    } catch (error) {
      console.error("Failed to invalidate access token:", error);
    }
  }
  return;
}

/**
 * Rotates tokens using the refresh token during token refresh
 */
export async function rotateTokens(refreshToken: string): Promise<string> {
  const verifiedPayload = await verifyToken(refreshToken);

  if (verifiedPayload instanceof Error) {
    throw new Error("Invalid token");
  }

  if (verifiedPayload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  if (verifiedPayload.jti && revokedTokens.has(verifiedPayload.jti)) {
    throw new Error("Refresh token has been revoked");
  }

  const { id, email } = verifiedPayload as { id: string; email: string };
  const payload = { id, email };

  // Generate new tokens
  return signAccessToken(payload);
}
