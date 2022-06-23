import { resolve, isAbsolute } from "path";
import { loadConfig, defineConfig as _defineConfig } from "@charrue/load-config";
import { logger } from "./logger";

const CONFIG_KEY = "vueBuild";

export type BuildConfig = {
  outputDir: string;
  input: string;
  name: string;
};

export type LoadConfigOptions = {
  [CONFIG_KEY]: Partial<BuildConfig>;
};

const defaultBuildConfig: BuildConfig = {
  input: "src/index.ts",
  outputDir: "dist",
  name: "",
};

/**
 * 加载用户自定义配置
 */
export const getUserConfig = async (): Promise<BuildConfig> => {
  try {
    const userConfig = await loadConfig("charrue.config");
    const config = {
      ...defaultBuildConfig,
      ...(userConfig?.config?.[CONFIG_KEY] || {}),
    };

    const pwd = process.cwd();
    config.input = isAbsolute(config.input) ? config.input : resolve(pwd, config.input);
    config.outputDir = isAbsolute(config.outputDir)
      ? config.outputDir
      : resolve(pwd, config.outputDir);
    return config;
  } catch (e: any) {
    logger.warn(e.toString());
    return defaultBuildConfig;
  }
};

export const defineConfig = (config: LoadConfigOptions) => _defineConfig<LoadConfigOptions>(config);
