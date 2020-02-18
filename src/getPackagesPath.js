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
 * @returns {Object} result
 * @returns {Array} result.path valid path directory
 * @returns {Array} result.ext extension for each path (js, ts)
 */
function getPackagesPath({ dir = "./packages/*" } = {}) {
  msg(`Getting packages path in ${dir}`);

  let path = [];
  let ext = [];

  path = glob.sync(dir);

  /**
   * If length is zero, not monorepo.
   */
  if (path.length === 0) {
    ext = validateAccessability(".");

    if (ext) {
      path.push(".");
      ext.push(ext);
    } else {
      error("Unable to read package form project root directory");
    }
  } else {
    ({ path, ext } = filterPathAccessability(path));
  }

  success(`> Found ${path.length} packages`);

  return { path, ext };
}

module.exports = getPackagesPath;
