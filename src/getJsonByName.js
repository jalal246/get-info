/* eslint-disable func-names */
const getJsonByPath = require("./getJsonByPath");

/**
 * Extracts package json, extension, and resolved source path for each given
 * name.
 *
 * @param {string} names required packages name
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {ext, srcPath}
 */
function getJsonByName(...names) {
  /**
   * extract all then filters it.
   */
  const { json, pkgInfo } = getJsonByPath();

  if (names.length === 0) {
    // msg(`Getting all packages`);

    return {
      json,
      pkgInfo
    };
  }

  const filteredJson = [];
  const filteredPkgInfo = {};

  names.forEach(packageName => {
    for (let j = 0; j < json.length; j += 1) {
      const { name } = json[j];

      if (name.includes(packageName)) {
        filteredJson.push(json[j]);

        /**
         * Add extracted extra info to pkgInfo and keep pkgJson as it is.
         */
        filteredPkgInfo[name] = pkgInfo[name];

        // remove element from array so we don't check it again.
        json.splice(j, 1);

        break;
      }
    }
  });

  // success(`> Done finding ${filteredJson.length} packages`);

  return {
    json: filteredJson,
    pkgInfo: filteredPkgInfo
  };
}

module.exports = getJsonByName;
