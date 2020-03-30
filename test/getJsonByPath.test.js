const { expect } = require("chai");

const { getPackagesPath, getJsonByPath, setIsSilent } = require("../src");

describe("getJsonByPath", () => {
  setIsSilent(true);
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const { json, pkgInfo } = getJsonByPath();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    const { name } = json[0];

    const { srcPath, ext } = pkgInfo[name];

    expect(srcPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("returns all packages for given path", () => {
    const { path } = getPackagesPath("./test/packages-valid/*");

    const { json, pkgInfo } = getJsonByPath(...path);

    expect(json.length).to.be.equal(5);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("dependencies");

    const { name } = json[0];

    const { srcPath, ext } = pkgInfo[name];

    expect(name).to.be.equal("@folo/forms");
    expect(srcPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("filters unfiltered paths then get packages Json for each", () => {
    const { path } = getPackagesPath("./test/packages-invalid/*");

    const { json, pkgInfo } = getJsonByPath(...path);

    expect(json.length).to.be.equal(1);

    const { name, dependencies } = json[0];

    expect(name).to.be.equal("@folo/forms");
    expect(dependencies).to.be.an("Object");

    const { srcPath, ext } = pkgInfo[name];

    expect(srcPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });
});
