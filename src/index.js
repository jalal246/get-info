const { setIsSilent } = require("@mytools/print");

const extractPackagesInfo = require("./getJsonByPath");
const getPackagesPath = require("./getPackagesPath");
const getJson = require("./getJson");

module.exports = {
  getJson,
  getPackagesPath,
  extractPackagesInfo,

  setIsSilent
};
