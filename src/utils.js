const fs = require("fs");
const { resolve } = require("path");

const { warning, error } = require("@mytools/print");

/**
 * Loop inside a given directory looking for index. When find it, gets its
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
 * @returns {string} extension.
 */
function validateAccessability(dir, srcName = "src") {
  const pkgJson = resolve(dir, "package.json");
  const src = resolve(dir, srcName);

  let ext;

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);

    ext = getFileExtension(src);
    const fullSrc = resolve(src, `index.${ext}`);
    fs.accessSync(fullSrc, fs.constants.R_OK);
  } catch (e) {
    warning(e);

    return false;
  }

  return ext;
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
function filterPathAccessability(pkgPath = []) {
  const ext = [];

  const filteredPaths = pkgPath.filter(pkgDir => {
    const pkgExt = validateAccessability(pkgDir);

    if (pkgExt) {
      ext.push(pkgExt);
      return true;
    }
    return false;
  });

  return {
    path: filteredPaths,
    ext
  };
}

module.exports = {
  getFileExtension,
  validateAccessability,
  filterPathAccessability
};
