/* eslint-disable func-names */

"use_strict";

const getJsonByPath = require("./getJsonByPath");

/**
 * Extracts package json, extension, and resolved source path for each given
 * name.
 *
 * @param {string} names required packages name
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {ext, path}
 */
function getJsonByName(...names) {
  /**
   * extract all then filters it.
   */
  const { json, pkgInfo, unfoundJson } = getJsonByPath();

  if (names.length === 0) {
    /**
     * returns all.
     */
    return {
      json,
      pkgInfo,
      unfoundJson,
    };
  }

  const filteredJson = [];
  const filteredPkgInfo = {};

  names.forEach((pkgName) => {
    for (let j = 0; j < json.length; j += 1) {
      const { name } = json[j];

      if (name.includes(pkgName)) {
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
    pkgInfo: filteredPkgInfo,
    unfoundJson,
  };
}

module.exports = getJsonByName;
