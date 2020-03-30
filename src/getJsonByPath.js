/* eslint-disable no-console */
/* eslint-disable func-names */
const { resolve } = require("path");
const fs = require("fs");

const getPackagesPath = require("./getPackagesPath");

const { getFileExtension } = require("./utils");

/**
 * Extracts package json, extension, and resolved source path for each given
 * path.
 *
 * @param {sting} defaultPaths  contains paths to resolve and extracts info form.
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {ext, srcPath}
 */
function getJsonByPath(...defaultPaths) {
  let ext = [];
  let foundPaths;

  if (defaultPaths.length === 0) {
    // msg(`Getting all paths`);

    ({ path: foundPaths, ext } = getPackagesPath());
  } else {
    foundPaths = defaultPaths;
  }

  const pkgInfo = {};

  const packagesJson = foundPaths.map((pkgPath, i) => {
    const pkgJson = resolve(pkgPath, "package.json");

    try {
      const json = fs.readFileSync(pkgJson, "utf8");

      const { name, peerDependencies, dependencies, ...other } = JSON.parse(
        json
      );

      const pkgExt = ext[i] || getFileExtension(resolve(pkgPath, "src"));

      const srcPath = resolve(pkgPath, "src", `index.${pkgExt}`);

      /**
       * Add extracted extra info to pkgInfo and keep pkgJson as it is.
       */
      pkgInfo[name] = {
        ext: pkgExt,
        srcPath
      };

      return {
        name,
        peerDependencies,
        dependencies,
        ...other
      };
    } catch (e) {
      console.error(`${e}`);
      return false;
    }
  });

  const filteredPkgJson = packagesJson.filter(Boolean);

  // success(`> Done extracting ${filteredPkgJson.length} packages json`);

  return { json: filteredPkgJson, pkgInfo };
}

module.exports = getJsonByPath;
