import { findUp } from "@charrue/node-toolkit";

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
