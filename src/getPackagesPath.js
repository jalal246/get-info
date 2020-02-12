const fs = require("fs");
const glob = require("glob");

const { msg, success, error } = require("@mytools/print");

/**
 *
 * Gets packages path for a given project source root.
 *
 * @param {Object} input
 * @param {string} input.dir  packages path [path="./packages/*"]
 * @returns Array contains packages directory
 */
function getPackagesPath({ dir = "./packages/*" } = {}) {
  msg(`Getting packages path in ${dir}`);

  let folders = [];

  folders = glob.sync(dir);

  /**
   * If length is zero, not monorepo.
   */
  if (folders.length === 0) {
    try {
      fs.accessSync("./src", fs.constants.R_OK);
    } catch (e) {
      error(e);
    }

    folders.push(".");
  }

  success(`> Found ${folders.length} packages`);

  return folders;
}

module.exports = getPackagesPath;
