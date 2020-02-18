const { resolve } = require("path");
const fs = require("fs");

const { msg, success, error } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");
const { filterPathAccessability } = require("./utils");

/**
 * Gets package json by path. Reads each passed directory. Then, Returns
 * objects extracted form these json files including source and distention path.
 *
 * Note: this function validate accessability and throw error if there's
 * something wrong in src/index.
 *
 * @param {Object} input
 * @param {Array} input.pkgPath Array contains path
 * @param {string} input.buildName [buildName="dist"]
 * @param {string} input.srcName [srcName="src"]
 *  @param {boolean} input.isFilter isFilter path [isFilter=true]
 *
 * @returns {Object[]} packInfo
 * @returns {string} packInfo[].sourcePath
 * @returns {string} packInfo[].distPath
 * @returns {string} packInfo[].name
 * @returns {string} packInfo[].peerDependencies
 * @returns {string} packInfo[].dependencies
 * @returns {...*}   other
 */
function getJsonByPath({
  pkgPath,

  buildName = "dist"
} = {}) {
  let packagesPath;

  let ext;

  if (!pkgPath) {
    ({ path: packagesPath, ext } = getPackagesPath());

    if (!packagesPath) {
      error("Unable to detect pkgPath");
    }
  } else {
    ({ filtered: packagesPath, ext } = filterPathAccessability(pkgPath));
  }

  msg("Reading package.json and setting packagesPath path");

  const packagesJson = packagesPath.map((pkg, i) => {
    const path = resolve(pkg, "package.json");

    try {
      const json = fs.readFileSync(path, "utf8");

      const { name, peerDependencies, dependencies, ...other } = JSON.parse(
        json
      );

      const pkgExt = ext[i];

      const sourcePath = resolve(pkg, "src", `index.${pkgExt}`);

      const distPath = resolve(pkg, buildName);

      return {
        sourcePath,
        distPath,
        name,
        peerDependencies,
        dependencies,
        ...other
      };
    } catch (e) {
      error(`${e}`);
      return false;
    }
  });

  const filtered = packagesJson.filter(Boolean);

  success(`> Done extracting ${filtered.length} packagesPath`);

  return filtered;
}

module.exports = getJsonByPath;
