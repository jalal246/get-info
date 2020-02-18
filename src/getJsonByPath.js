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
 * @param {Array} input.userInputPath Array contains path
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
  path: userInputPath,

  buildName = "dist"
} = {}) {
  let path;

  let ext;

  if (!userInputPath) {
    ({ path, ext } = getPackagesPath());

    if (!path) {
      error("Unable to detect path");
    }
  } else {
    ({ path, ext } = filterPathAccessability(userInputPath));
  }

  msg("Reading package.json and setting path path");

  const packagesJson = path.map((pkg, i) => {
    const pkgPath = resolve(pkg, "package.json");

    try {
      const json = fs.readFileSync(pkgPath, "utf8");

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

  const filteredPkgJson = packagesJson.filter(Boolean);

  success(`> Done extracting ${filteredPkgJson.length} packages json`);

  return { json: filteredPkgJson, ext };
}

module.exports = getJsonByPath;
