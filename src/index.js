const { setIsSilent } = require("@mytools/print");

const getJsonByPath = require("./getJsonByPath");
const getPackagesPath = require("./getPackagesPath");
const getJsonByName = require("./getJsonByName");

const utils = require("./utils");

module.exports = {
  getJsonByName,
  getPackagesPath,
  getJsonByPath,

  setIsSilent,

  utils
};
