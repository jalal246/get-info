const { resolve } = require("path");
const fs = require("fs");

const { msg, success, error } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");

/**
 * Gets package json by path. Reads each passed directory. Then, Returns
 * objects extracted form these json files including source and distention path.
 *
 * Note: this function validate accessability and throw error if there's
 * something wrong in src/index.
 *
 * @export
 * @param {Object} input
 * @param {Array} input.packagesPath
 * @param {string} input.buildName [buildName="dist"]
 * @param {string} input.srcName [srcName="src"]
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
  packagesPath = getPackagesPath(),

  buildName = "dist",
  srcName = "src"
} = {}) {
  msg("Reading package.json and setting packagesPath paths");

  const packagesJson = packagesPath.map(pkg => {
    const path = resolve(pkg, "package.json");

    try {
      /**
       * check path readability
       */
      fs.accessSync(path, fs.constants.R_OK);

      const json = fs.readFileSync(path, "utf8");

      const { name, peerDependencies, dependencies, ...other } = JSON.parse(
        json
      );

      /**
       * check src/index readability
       */
      const sourcePath = resolve(pkg, srcName, "index.js");

      fs.accessSync(sourcePath, fs.constants.R_OK);

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
