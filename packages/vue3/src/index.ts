import rm from "rimraf";
import { logger, getUserConfig } from "@charrue/vue-bundler-shared";
import { build } from "./build";

export const clean = (dir: string) => {
  rm.sync(dir);
};

export const start = async () => {
  const userConfig = await getUserConfig();
  logger.info("Clean dist directory...");
  clean("dist");
  logger.info("Start Build Vue File...");
  await build(userConfig);
};

export { defineConfig } from "@charrue/vue-bundler-shared";
export { build } from "./build";
