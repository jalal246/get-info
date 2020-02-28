const { expect } = require("chai");
const { getJsonByName, getPackagesPath, setIsSilent } = require("../src");

describe("getJsonByName", () => {
  setIsSilent(true);
  it("Default: gets current path with ext and json", () => {
    const { ext, json, path } = getJsonByName()();

    expect(json).to.be.an("Array");
    expect(ext).to.be.an("Array");
    expect(path).to.be.an("Array");

    expect(json.length).to.be.equal(1);
    expect(ext.length).to.be.equal(1);
    expect(path.length).to.be.equal(1);

    expect(ext[0]).to.be.equal("js");
    expect(path[0]).to.be.equal(".");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    expect(json[0].name).to.be.equal("get-info");
  });

  // TODO
  // it("TODO: gets all packages for specific path", () => {
  //   const { path } = getPackagesPath({
  //     dir: "./test/packages-valid/*"
  //   });

  //   const { ext, json } = getJsonByName({
  //     path
  //   })();
  // });

  it("gets array of json with default path", () => {
    const { json } = getJsonByName()("get-info");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0].name).to.be.equal("get-info");
  });

  it("returns empty array when name is wrong", () => {
    const { json } = getJsonByName()("nothingTrue");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(0);
  });

  it("gets array of path with ext and json for given path", () => {
    const { path, ext } = getPackagesPath("./test/packages-valid/*");

    const { json } = getJsonByName({
      path,
      ext
    })("folo/form", "folo/values");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(2);

    expect(json[0].name).to.be.equal("@folo/forms");
    expect(json[1].name).to.be.equal("@folo/values");
  });
});
