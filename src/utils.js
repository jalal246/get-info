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

module.exports = { validateAccessability };
