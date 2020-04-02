/* eslint-disable no-console */
const fs = require("fs");
const { resolve } = require("path");

/**
 * Loop inside a given directory looking for index. When finds it, gets its
 * extension.
 *
 * @param {string} dir - given directory
 * @returns {string} extension.
 */
function getFileExtension(dir, entry) {
  const files = fs.readdirSync(dir);

  const indx = files.find(file => {
    return file.includes(entry);
  });

  if (!indx) {
    console.error(`getFileExtension: Unable to detect extension In: ${dir}`);
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
function validateAccess(
  dir = ".",
  { isValidateEntry = false, entry = "index", srcName = "src" } = {}
) {
  const pkgJson = resolve(dir, "package.json");

  const isSrc = fs.existsSync(resolve(dir, srcName));

  const src = isSrc ? resolve(dir, srcName) : dir;

  let ext;

  let isValid = true;

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);

    if (isValidateEntry) {
      ext = getFileExtension(src, entry);
      const fullSrc = resolve(src, `${entry}.${ext}`);
      fs.accessSync(fullSrc, fs.constants.R_OK);
    }
  } catch (err) {
    isValid = false;
  }

  return { isValid, ext, isSrc };
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
function filterPathAccess(pkgPath = [], opts) {
  const filteredExt = [];

  const filteredPath = pkgPath.filter(_pkgPath => {
    const { isValid, ext } = validateAccess(_pkgPath, opts);

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
