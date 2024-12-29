import { addAlias } from "module-alias";
import { resolve } from "path";

addAlias("@controller", resolve(__dirname, "controllers"));
addAlias("@helpers", resolve(__dirname, "helpers"));
addAlias("@utils", resolve(__dirname, "utils"));
addAlias("@orm", resolve(__dirname, "../prisma"));
addAlias("@middleware", resolve(__dirname, "middleware"));
