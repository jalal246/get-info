const { expect } = require("chai");
const { getPackagesInfo, getPackagesPath, setIsSilent } = require("../src");

describe("getPackagesInfo", () => {
  setIsSilent(true);
  it("Default: gets current path with ext and json", () => {
    const { ext, json, path } = getPackagesInfo()();

    expect(json).to.be.an("Array");
    expect(ext).to.be.an("Array");
    expect(path).to.be.an("Array");

    expect(json.length).to.be.equal(1);
    expect(ext.length).to.be.equal(1);
    expect(path.length).to.be.equal(1);

    expect(ext[0]).to.be.equal("js");
    expect(path[0]).to.be.equal(".");
    expect(json[0]).to.have.own.property("distPath");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    expect(json[0].name).to.be.equal("extractJson");
  });

  it("gets array of json with default path", () => {
    const { json } = getPackagesInfo()("extractJson");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0].name).to.be.equal("extractJson");
  });

  it("returns empty array when name is wrong", () => {
    const { json } = getPackagesInfo()("nothingTrue");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(0);
  });

  it("gets array of path with ext and json for given path", () => {
    const { path, ext } = getPackagesPath({
      dir: "./test/packages-valid/*"
    });

    const { json } = getPackagesInfo({
      path,
      ext
    })("folo/form", "folo/values");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(2);

    expect(json[0].name).to.be.equal("@folo/forms");
    expect(json[1].name).to.be.equal("@folo/values");
  });
});
