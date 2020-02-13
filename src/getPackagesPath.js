const glob = require("glob");

const { msg, success, error } = require("@mytools/print");

const { validateAccessability, filterPathAccessability } = require("./utils");

/**
 *
 * Gets packages path for a given project source root. It filters each path
 * using `validateAccessability`
 *
 * @param {Object} input
 * @param {string} input.dir  packages path [path="./packages/*"]
 * @param {boolean} input.isFilter isFilter paths [isFilter=true]
 * @returns {Array} contains packages directory
 */
function getPackagesPath({ dir = "./packages/*", isFilter = true } = {}) {
  msg(`Getting packages path in ${dir}`);

  let folders = [];

  folders = glob.sync(dir);

  /**
   * If length is zero, not monorepo.
   */
  if (folders.length === 0) {
    if (validateAccessability(".")) {
      folders.push(".");
    } else {
      error("Unable to read package form project root directory");
    }
  } else if (isFilter) {
    folders = filterPathAccessability(folders);
  }

  success(`> Found ${folders.length} packages`);

  return folders;
}

module.exports = getPackagesPath;
