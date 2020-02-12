const { msg } = require("@mytools/print");

const getPackagesPath = require("./getPackagesPath");
const getJsonByPath = require("./getJsonByPath");

/**
 *
 *
 * @param {Array} packagesName
 * @param {string} [buildName="dist"]
 * @param {string} [srcName="src"]
 * @returns {Object} info
 * @returns {boolean} info.isFiltered
 * @returns {Array} info.packagesInfo
 * @returns {Array} info.packagesPath
 */
function getJson(packagesName, buildName = "dist", srcName = "src") {
  /**
   * get all packagesName.
   */
  const allPackagesPath = getPackagesPath();

  /**
   * extract json form each package.
   */
  const allPackagesInfo = getJsonByPath({
    packagesName: allPackagesPath,

    buildFileName: buildName,
    srcFileName: srcName
  });

  let isFiltered = false;
  let filteredInfo = [];
  let filteredPath = [];

  if (packagesName.length !== 0) {
    msg(`Matching given packagesName name with dir`);

    isFiltered = true;

    filteredInfo = allPackagesInfo.filter(({ name }, i) => {
      if (packagesName.includes(name)) {
        filteredPath.push(allPackagesPath[i]);
        return true;
      }

      return false;
    });
  } else {
    msg(`Getting all packagesName ${allPackagesPath.length}`);

    filteredInfo = allPackagesInfo;
    filteredPath = allPackagesPath;
  }

  return {
    isFiltered,
    packagesInfo: filteredInfo,
    packagesPath: filteredPath
  };
}

module.exports = getJson;
