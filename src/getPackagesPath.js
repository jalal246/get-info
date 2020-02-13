const fs = require("fs");
const glob = require("glob");
const { resolve } = require("path");

const { msg, success, error, warning } = require("@mytools/print");

/**
 * Validate `package.json` & `src` for given path.
 *
 * @param {string} dir
 * @returns {boolean} true if valid
 */
function validateAccessability(dir) {
  const pkgJson = resolve(dir, "package.json");
  const src = resolve(dir, "src");

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);
    fs.accessSync(src, fs.constants.R_OK);
  } catch (e) {
    warning(e);

    return false;
  }

  return true;
}

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
    folders = folders.filter(pkgDir => validateAccessability(pkgDir));
  }

  success(`> Found ${folders.length} packages`);

  return folders;
}

module.exports = getPackagesPath;
