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
