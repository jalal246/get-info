const { setIsSilent } = require("@mytools/print");

const getJsonByPath = require("./getJsonByPath");
const getPackagesPath = require("./getPackagesPath");
const getPackagesInfo = require("./getPackagesInfo");

module.exports = {
  getPackagesInfo,
  getPackagesPath,
  getJsonByPath,

  setIsSilent
};
