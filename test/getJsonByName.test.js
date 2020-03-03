const { expect } = require("chai");
const { getJsonByName, getPackagesPath, setIsSilent } = require("../src");

describe("getJsonByName", () => {
  setIsSilent(true);
  it("Default: gets current path with ext and json", () => {
    const { ext, json, distPath } = getJsonByName()();

    expect(json).to.be.an("Array");
    expect(ext).to.be.an("Array");
    expect(distPath).to.be.an("Array");

    expect(json.length).to.be.equal(1);
    expect(ext.length).to.be.equal(1);
    expect(distPath.length).to.be.equal(1);

    expect(ext[0]).to.be.equal("js");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    expect(json[0].name).to.be.equal("get-info");
  });

  it("gets array of json with default path", () => {
    const { json } = getJsonByName()("get-info");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0].name).to.be.equal("get-info");
  });

  it("gets array of json with a given path", () => {
    const { path } = getPackagesPath("./test/packages-valid/*");

    const { json } = getJsonByName("dist", ...path)();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(5);

    expect(json[0].name).to.be.equal("@folo/forms");
    expect(json[1].name).to.be.equal("@folo/layout");
    expect(json[3].name).to.be.equal("@folo/values");
    expect(json[4].name).to.be.equal("@folo/withcontext");
  });

  it("gets array of json with a given path and names", () => {
    const { path } = getPackagesPath("./test/packages-valid/*");

    const { json } = getJsonByName("dist", ...path)("@folo/forms");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0].name).to.be.equal("@folo/forms");
  });

  it("returns empty array when name is wrong", () => {
    const { json } = getJsonByName()("nothingTrue");

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(0);
  });
});
