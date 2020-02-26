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
    error(`getFileExtension: Unable to detect extension. Can't find src/index`);
  }
  const extension = indx.split(".").pop();

  return extension;
}

/**
 * Validates access readability `package.json` & `src` for given path.
 *
 * @param {string} [dir="."]
 * @param {string} [ext=getFileExtension(dir/src)]
 * @param {string} [srcName="src"]
 *
 * @returns {Object} result
 * @returns {boolean} result.isValid
 * @returns {string} result.ext
 */
function validateAccess(dir = ".", ext, srcName = "src") {
  const pkgJson = resolve(dir, "package.json");
  const src = resolve(dir, srcName);

  const fileExt = ext || getFileExtension(src);

  let isValid = true;

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);

    const fullSrc = resolve(src, `index.${fileExt}`);
    fs.accessSync(fullSrc, fs.constants.R_OK);
  } catch (e) {
    warning(e);

    isValid = false;
  }

  return { isValid, ext: fileExt };
}

/**
 * Filters array of paths by validate each path. Makes sure it has
 * `package.json` and `src`.
 *
 * @param {Array} [pkgPath=[]]
 * @returns {Object} results[]
 * @returns {Array} results[].path filtered valid paths
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
function filterPathAccess(pkgPath = []) {
  const filteredExt = [];

  const filteredPath = pkgPath.filter(_pkgPath => {
    const { isValid, ext } = validateAccess(_pkgPath);

    if (isValid) {
      filteredExt.push(ext);
      return true;
    }
    return false;
  });

  return { path: filteredPath, ext: filteredExt };
}

module.exports = {
  getFileExtension,
  validateAccess,
  filterPathAccess
};
