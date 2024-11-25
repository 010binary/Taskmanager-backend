import { JWTPayload } from "jose";

interface TokenPayload extends JWTPayload {
  jti?: string;
  type?: "access" | "refresh";
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export type { TokenPayload, TokenResponse };
