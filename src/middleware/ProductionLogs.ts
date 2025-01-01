
import crypto from "node:crypto";
import PinoHttp from "pino-http";

const pino = PinoHttp({
    ...(process.env.NODE_ENV !== "production" && {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
            },
        },
    }),
    level: process.env.LOG_LEVEL || "info",
    genReqId: () => crypto.randomUUID(),
});

export default pino;