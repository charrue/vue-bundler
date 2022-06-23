import { findUp } from "@charrue/node-toolkit";
import { upperFirst, camelize } from "./utils";

export const getPackageManifest = (filePath: string) => {
  const pkgPath = findUp("package.json", {
    cwd: filePath,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as any;
};

export const getPackageDependencies = (
  pkgPath: string,
): Record<"dependencies" | "peerDependencies", string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

export const getPkgName = (input: string) => {
  return getPackageManifest(input).name;
};

export const formatPkgName = (pkgName: string): string => {
  if (pkgName.charAt(0) === "@") {
    return formatPkgName(pkgName.substring(1));
  }

  return upperFirst(camelize(pkgName.split("/").join("-")));
};
