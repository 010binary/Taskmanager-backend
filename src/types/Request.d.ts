import type { TokenPayload } from "./Token";
import { Request } from "express";

export interface CustomRequest extends Request {
    payload?: TokenPayload;
}
