const fs = require("fs");
const { resolve } = require("path");

const { warning } = require("@mytools/print");

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
 * Filters array of paths by validate each path. Make sure it has `package.json`
 * and `src`.
 *
 * @param {Array} pkgPath
 * @returns {Array} filter Array
 */
function filterPathAccessability(pkgPath = []) {
  const filtered = pkgPath.filter(pkgDir => validateAccessability(pkgDir));

  return filtered;
}

module.exports = { validateAccessability, filterPathAccessability };
