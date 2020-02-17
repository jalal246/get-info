const { msg } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");
const getJsonByPath = require("./getJsonByPath");

/**
 * Gets package json by passing packages name. It depends on `getPackagesPath`
 * to get correct path for each packages name then use `getJsonByPath` to
 * extract objects form `package.json`.
 *
 * @param {Array} packagesName
 * @param {string} [buildName="dist"]
 * @param {string} [srcName="src"]
 * @returns {Object} info
 * @returns {boolean} info.isFiltered
 * @returns {Array} info.json
 * @returns {Array} info.path
 */
function getPackageInfo({
  packagesName,
  buildName = "dist",
  srcName = "src"
} = {}) {
  /**
   * get all packagesName.
   */
  const allPackagesPath = getPackagesPath();

  /**
   * extract json form each package.
   */
  const allPackagesJson = getJsonByPath({
    packagesName: allPackagesPath,

    buildFileName: buildName,
    srcFileName: srcName
  });

  let isFiltered = false;
  let filteredJson = [];
  let filteredPath = [];

  if (packagesName.length !== 0) {
    msg(`Matching given packagesName name with dir`);

    isFiltered = true;

    filteredJson = allPackagesJson.filter(({ name }, i) => {
      if (packagesName.includes(name)) {
        filteredPath.push(allPackagesPath[i]);
        return true;
      }

      return false;
    });
  } else {
    msg(`Getting all packagesName ${allPackagesPath.length}`);

    filteredJson = allPackagesJson;
    filteredPath = allPackagesPath;
  }

  return {
    isFiltered,
    json: filteredJson,
    path: filteredPath
  };
}

module.exports = getPackageInfo;
