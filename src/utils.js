const fs = require("fs");
const { resolve } = require("path");

const { warning, error } = require("@mytools/print");

/**
 * Loop inside a given directory looking for index. When finds it, gets its
 * extension.
 *
 * @param {string} dir - given directory
 * @returns {string} extension.
 */
function getFileExtension(dir) {
  const files = fs.readdirSync(dir);

  const indx = files.find(file => {
    return file.includes("index");
  });

  if (!indx) {
    error(`Unable to detect extension. Can't find src/index`);
  }
  const extension = indx.split(".").pop();

  return extension;
}

/**
 * Validates access readability `package.json` & `src` for given path.
 *
 * @param {string} dir
 * @param {string} [srcName="src"]
 * @param {string} [ext="js"]
 * @returns {boolean} true|false
 */
function validateAccess(dir, ext = "js", srcName = "src") {
  if (!dir) return false;

  const pkgJson = resolve(dir, "package.json");
  const src = resolve(dir, srcName);

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);

    const fullSrc = resolve(src, `index.${ext}`);
    fs.accessSync(fullSrc, fs.constants.R_OK);
  } catch (e) {
    warning(e);

    return false;
  }

  return true;
}

/**
 * Filters array of path by validate each path. Make sure it has `package.json`
 * and `src`.
 *
 * @param {Array} [pkgPath=[]]
 * @returns {Object} result
 * @returns {Array} result.path filtered valid paths
 * @returns {Array} result.ext extension for each path (js, ts)
 */
function filterPathAccess(pkgPath = []) {
  return pkgPath.filter(pkgDir => {
    return validateAccess(pkgDir);
  });
}

module.exports = {
  getFileExtension,
  validateAccess,
  filterPathAccess
};
