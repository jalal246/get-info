/* eslint-disable func-names */
const { msg, success } = require("@mytools/print");

const getJsonByPath = require("./getJsonByPath");

let json;
let ext;
let distPath;

/**
 * Extracts package json, extension, and resolved distention path for each given
 * packages name.
 *
 * @param {Array} names required packages name
 *
 * @returns {Object[]} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Array} results[].ext - extension (js|ts) related to every path
 */
function byName(names) {
  const filteredExt = [];
  const filteredJson = [];
  const filteredDistPath = [];

  names.forEach(packageName => {
    for (let j = 0; j < json.length; j += 1) {
      const { name } = json[j];

      if (name.includes(packageName)) {
        filteredJson.push(json[j]);
        filteredExt.push(ext[j]);
        filteredDistPath.push(distPath[j]);

        // remove element from array so we don't check it again.
        json.splice(j, 1);

        break;
      }
    }
  });

  success(`> Done finding ${filteredJson.length} packages`);

  return {
    json: filteredJson,
    ext: filteredExt,
    distPath: filteredDistPath
  };
}

/**
 * Wrapper function inits json, ext, distPath and buildName.
 *
 * @param {string} buildName
 * @returns {function}
 */
function getJsonByName(buildName, path) {
  return function(...defaultNames) {
    /**
     * extract json form each package.
     */
    ({ json, ext, distPath } = getJsonByPath(buildName)(...path));

    if (defaultNames.length === 0) {
      msg(`Getting all packages`);

      return {
        json,
        ext,
        distPath
      };
    }

    return byName(defaultNames);
  };
}

module.exports = getJsonByName;
