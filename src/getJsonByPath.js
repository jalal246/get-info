const { resolve } = require("path");
const fs = require("fs");

const { msg, success, error } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");

/**
 * Gets package json by path. Reads each passed directory. Then, returns
 * objects extracted form these json files including source and distention path.
 *
 * Note: this function validate accessability and throw error if there's
 * something wrong in src/index.ext
 *
 * @param {Object} input
 * @param {Array} input.path Array contains paths to each package
 * @param {Array} input.ext Array contains extension associated to each package
 *
 * @returns {Object[]} pkgInfo is an object of arrays
 * @returns {string} pkgInfo[].sourcePath
 * @returns {string} pkgInfo[].distPath
 * @returns {string} pkgInfo[].name
 * @returns {Object} pkgInfo[].peerDependencies
 * @returns {Object} pkgInfo[].dependencies
 * @returns {...*}   other
 */
function getJsonByPath({
  path: userInputPath,
  ext: userInputExt,

  buildName = "dist"
} = {}) {
  let path = userInputPath;
  let ext = userInputExt;

  if (!path || !ext) {
    msg(
      `Unable to find path || ext ${path || ext}. Extract them automatically.`
    );

    ({ path, ext } = getPackagesPath());

    if (!path) {
      error("Unable to detect path");
    }
  }

  msg("Reading package.json and setting path path");

  const filteredExt = [];

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

      filteredExt.push(pkgExt);

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

  return { json: filteredPkgJson, ext: filteredExt };
}

module.exports = getJsonByPath;
