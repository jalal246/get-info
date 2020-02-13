const { setIsSilent } = require("@mytools/print");

const getJsonByPath = require("./getJsonByPath");
const getPackagesPath = require("./getPackagesPath");
const getPackageInfo = require("./getPackageInfo");

module.exports = {
  getPackageInfo,
  getPackagesPath,
  getJsonByPath,

  setIsSilent
};
