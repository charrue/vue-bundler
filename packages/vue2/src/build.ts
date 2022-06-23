import { resolve } from "path";
import { rollup } from "rollup";
import vue from "rollup-plugin-vue";
import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import Esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import {
  generateExternal,
  writeBundles,
  getBuildConfigEntries,
  formatPkgName,
  getPkgName,
} from "@charrue/vue-bundler-shared";
import type { OutputOptions } from "rollup";
import type { BuildConfig } from "@charrue/vue-bundler-shared";

const getRollupBuildConfig = async (
  options: BuildConfig & { isProd: boolean; minify: boolean },
) => {
  const { input, isProd, minify } = options;

  const plugins = [
    vue({
      css: false,
    }),
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".ts"],
    }),
    commonJs(),
    Esbuild({
      sourceMap: minify,
      loaders: {
        ".vue": "ts",
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
      },
      treeShaking: isProd,
    }),
  ];
  if (minify) {
    plugins.push(minifyPlugin());
  }

  const config = await rollup({
    input,
    plugins,
    treeshake: isProd,
    external: await generateExternal(input, isProd),
  });
  return config;
};

export const build = async (options: BuildConfig) => {
  const { outputDir } = options;
  const bundle = await getRollupBuildConfig({
    ...options,
    minify: false,
    isProd: false,
  });

  await writeBundles(
    bundle,
    getBuildConfigEntries(outputDir).map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === "cjs" ? "named" : undefined,
        preserveModules: true,
        preserveModulesRoot: outputDir,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    }),
  );
};

export const buildProduction = async (options: BuildConfig, minify: boolean) => {
  const { outputDir } = options;
  const bundle = await getRollupBuildConfig({
    ...options,
    minify,
    isProd: true,
  });

  await writeBundles(bundle, [
    {
      format: "umd",
      file: resolve(outputDir, minify ? "index.min.js" : "index.js"),
      exports: "named",
      name: options.name || formatPkgName(getPkgName(options.input)),
      globals: {
        vue: "Vue",
      },
      sourcemap: minify,
    },
    {
      format: "esm",
      file: resolve(outputDir, minify ? "index.min.mjs" : "index.mjs"),
      sourcemap: minify,
    },
  ]);
};
