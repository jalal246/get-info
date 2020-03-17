/* eslint-disable func-names */
const { msg, success } = require("@mytools/print");

const getJsonByPath = require("./getJsonByPath");

let json;
let pkgInfo;

/**
 * Extracts package json, extension, and resolved distention path for each given
 * packages name.
 *
 * @param {Array} names required packages name
 *
 * @returns {Object[]} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {dist, ext}
 */
function byName(names) {
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

  success(`> Done finding ${filteredJson.length} packages`);

  return {
    json: filteredJson,
    pkgInfo: filteredPkgInfo
  };
}

/**
 * Wrapper function inits json, ext, distPath and buildName.
 *
 * @param {string} buildName
 * @param {string} paths
 * @returns {function}
 */
function getJsonByName(buildName, ...paths) {
  return function(...defaultNames) {
    /**
     * extract json form each package.
     */
    ({ json, pkgInfo } = getJsonByPath(buildName)(...paths));

    if (defaultNames.length === 0) {
      msg(`Getting all packages`);

      return {
        json,
        pkgInfo
      };
    }

    return byName(defaultNames);
  };
}

module.exports = getJsonByName;
