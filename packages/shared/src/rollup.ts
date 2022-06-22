import path from "path";
import { getPackageDependencies } from "./pkg";
import type { OutputOptions, RollupBuild, ModuleFormat, RollupOutput } from "rollup";

export function writeBundles(
  bundle: RollupBuild,
  options: OutputOptions[],
): Promise<RollupOutput[]> {
  return Promise.all(options.map((option) => bundle.write(option)));
}

const modules = ["esm", "cjs"] as const;

export type Module = typeof modules[number];

export interface BuildInfo {
  module: "ESNext" | "CommonJS";
  format: ModuleFormat;
  ext: "mjs" | "cjs" | "js";
  output: {
    name: string;
    path: string;
  };
}

export const getBuildConfig = (outputDir: string): Record<Module, BuildInfo> => {
  return {
    cjs: {
      module: "CommonJS",
      format: "cjs",
      ext: "js",
      output: {
        name: "es",
        path: path.resolve(outputDir, "lib"),
      },
    },
    esm: {
      module: "ESNext",
      format: "esm",
      ext: "mjs",
      output: {
        name: "es",
        path: path.resolve(outputDir, "es"),
      },
    },
  };
};

export function getBuildConfigEntries(outputDir: string) {
  return Object.entries(getBuildConfig(outputDir)) as [Module, BuildInfo][];
}

export const generateExternal = async (filePath: string, isProd: boolean) => {
  const { dependencies, peerDependencies } = getPackageDependencies(filePath);

  return (id: string) => {
    const packages: string[] = peerDependencies;
    if (!isProd) {
      packages.push("@vue", ...dependencies);
    }

    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};
