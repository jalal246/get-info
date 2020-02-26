const { msg, error } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");
const getJsonByPath = require("./getJsonByPath");

/**
 * Gets package full info by passed name of packages.
 *
 * @param {Object} input
 * @param {Array} input.path Array contains paths to each package
 * @param {Array} input.ext Array contains extension associated to each package
 * @param {string} [input.buildName="dist"]
 * @returns {Object[]} results
 * @returns {Array} results[].ext
 * @returns {Array} results[].json
 * @returns {Array} results[].path
 */
function getJsonByName({
  buildName = "dist",
  path: userInputPath,
  ext: userInputExt
} = {}) {
  let path = userInputPath;
  let ext = userInputExt;

  if (!path || !ext) {
    ({ path, ext } = getPackagesPath());
  }

  // eslint-disable-next-line func-names
  return function(...packagesName) {
    if (!path) {
      error("Unable to detect path");
    }

    /**
     * extract json form each package.
     */
    const { json } = getJsonByPath({
      path,
      ext,
      buildName
    });

    if (packagesName.length === 0) {
      msg(`Getting all packages`);

      return {
        ext,
        json,
        path
      };
    }
    console.log("TCL: packagesName", packagesName);

    msg(`Matching given packages name with dir`);

    const filteredExt = [];
    const filteredPath = [];
    const filteredJson = [];

    packagesName.forEach(packageName => {
      for (let j = 0; j < json.length; j += 1) {
        const { name } = json[j];

        if (name.includes(packageName)) {
          filteredJson.push(json[j]);
          filteredPath.push(path[j]);
          filteredExt.push(ext[j]);

          break;
        }
      }
    });

    return {
      ext: filteredExt,
      json: filteredJson,
      path: filteredPath
    };
  };
}

module.exports = getJsonByName;
