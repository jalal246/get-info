const { expect } = require("chai");

const { getPackagesPath, getJsonByPath, setIsSilent } = require("../src");

describe("getJsonByPath", () => {
  setIsSilent(true);
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const { json, pkgInfo } = getJsonByPath()();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    const { name } = json[0];

    const { dist, ext } = pkgInfo[name];

    expect(dist).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("returns all packages for given path", () => {
    const { path } = getPackagesPath("./test/packages-valid/*");

    const { json } = getJsonByPath()(...path);

    expect(json.length).to.be.equal(5);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    expect(json[0].name).to.be.equal("@folo/forms");
  });

  it("filters unfiltered paths then get packages Json for each", () => {
    const { path } = getPackagesPath("./test/packages-invalid/*");

    const { json, pkgInfo } = getJsonByPath()(...path);

    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    expect(json[0].name).to.be.equal("@folo/forms");

    /**
     * By default, will read the project scr and package json.
     */
    const { name } = json[0];

    const { dist, ext } = pkgInfo[name];

    expect(dist).to.be.an("string");
    expect(ext).to.be.equal("js");
  });
});
