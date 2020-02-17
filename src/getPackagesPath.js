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
 * @returns {Object} result
 * @returns {Array} result.paths valid paths directory
 * @returns {Array} result.ext extension for each path (js, ts)
 */
function getPackagesPath({ dir = "./packages/*", isFilter = true } = {}) {
  msg(`Getting packages path in ${dir}`);

  let folders = [];
  let ext = [];

  folders = glob.sync(dir);

  /**
   * If length is zero, not monorepo.
   */
  if (folders.length === 0) {
    ext = validateAccessability(".");

    if (ext) {
      folders.push(".");
      ext.push(ext);
    } else {
      error("Unable to read package form project root directory");
    }
  } else if (isFilter) {
    ({ filtered: folders, ext } = filterPathAccessability(folders));
  }

  success(`> Found ${folders.length} packages`);

  return { paths: folders, ext };
}

module.exports = getPackagesPath;
