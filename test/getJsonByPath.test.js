const { expect } = require("chai");

const { getPackagesPath, getJsonByPath } = require("../src");

describe("getJsonByPath", () => {
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

    const { path, ext } = pkgInfo[name];

    expect(path).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("returns all packages for given path", () => {
    const { path } = getPackagesPath("./test/packages-valid/*");

    const { json, pkgInfo } = getJsonByPath(...path);

    expect(json.length).to.be.equal(5);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("dependencies");

    const { name } = json[0];

    const { path: pkgPath, ext } = pkgInfo[name];

    expect(name).to.be.equal("@folo/forms");
    expect(pkgPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });

  it("filters unfiltered paths then get packages Json for each", () => {
    const { path } = getPackagesPath("./test/packages-invalid/*");

    const { json, pkgInfo } = getJsonByPath(...path);

    expect(json.length).to.be.equal(1);

    const { name, dependencies } = json[0];

    expect(name).to.be.equal("@folo/forms");
    expect(dependencies).to.be.an("Object");

    const { path: pkgPath, ext } = pkgInfo[name];

    expect(pkgPath).to.be.an("string");
    expect(ext).to.be.equal("js");
  });
});
