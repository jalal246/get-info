const fs = require("fs");
const { resolve } = require("path");

const { warning, error } = require("@mytools/print");

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
 * Validate `package.json` & `src` for given path.
 *
 * @param {string} dir
 * @returns {boolean} true if valid
 */
function validateAccessability(dir, srcName = "src") {
  const pkgJson = resolve(dir, "package.json");
  const src = resolve(dir, srcName);

  try {
    fs.accessSync(pkgJson, fs.constants.R_OK);

    const ext = getFileExtension(src);
    const fullSrc = resolve(src, `index.${ext}`);
    fs.accessSync(fullSrc, fs.constants.R_OK);
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

module.exports = {
  getFileExtension,
  validateAccessability,
  filterPathAccessability
};
