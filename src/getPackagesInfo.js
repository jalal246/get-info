const { msg, error } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");
const getJsonByPath = require("./getJsonByPath");

/**
 * Gets package json by passing packages name. It depends on `getPackagesPath`
 * to get correct path for each packages name then use `getJsonByPath` to
 * extract objects form `package.json`.
 *
 * @param {Array} packagesName
 * @param {string} [buildName="dist"]
 * @returns {Object} result
 * @returns {Array} result.ext
 * @returns {Array} result.json
 * @returns {Array} result.path
 */
function getPackagesInfo({
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

    msg(`Matching given packagesName name with dir`);

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

module.exports = getPackagesInfo;
