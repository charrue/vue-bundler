import rm from "rimraf";
import { logger, getUserConfig } from "@charrue/vue-bundler-shared";
import { build, buildProduction } from "./build";

export const clean = (dir: string) => {
  rm.sync(dir);
};

export const start = async () => {
  const userConfig = await getUserConfig();
  logger.info("Clean output directory...", { color: true });
  clean(userConfig.outputDir);

  logger.info("Start Build Vue File...", { color: true });
  await build(userConfig);
  await buildProduction(userConfig, false);
  await buildProduction(userConfig, true);
};

export { defineConfig } from "@charrue/vue-bundler-shared";
export { build } from "./build";
