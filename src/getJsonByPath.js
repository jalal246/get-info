/* eslint-disable no-console */

"use_strict";

const { resolve } = require("path");
const fs = require("fs");

function discoverProjectRoot() {
  const isValid = fs.existsSync("./packages");
  const rootPath = [];

  if (isValid) {
    rootPath.push(fs.readdirSync("./packages"));
  } else {
    rootPath.push(".");
  }

  return rootPath;
}

/**
 * Extracts package json and resolved source path for each given
 * path.
 *
 * @param {sting} defaultPaths  contains paths to resolve and extracts info form.
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - { path }
 */
function getJsonByPath(...defaultPaths) {
  let foundPaths;

  if (defaultPaths.length === 0) {
    foundPaths = discoverProjectRoot();
  } else {
    foundPaths = defaultPaths;
  }

  const pkgInfo = {};

  const packagesJson = foundPaths
    .map((pkgPath) => {
      const pkgJson = resolve(pkgPath, "package.json");

      const isValid = fs.existsSync(pkgJson);

      if (!isValid) {
        return null;
      }

      const json = fs.readFileSync(pkgJson, "utf8");

      const { name, peerDependencies, dependencies, ...other } = JSON.parse(
        json
      );

      /**
       * Add extracted extra info to pkgInfo and keep pkgJson as it is.
       */
      pkgInfo[name] = {
        path: pkgPath,
      };

      return {
        name,
        peerDependencies,
        dependencies,
        ...other,
      };
    })
    .filter(Boolean);

  return { json: packagesJson, pkgInfo };
}

module.exports = getJsonByPath;
