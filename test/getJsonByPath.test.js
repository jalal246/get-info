const { expect } = require("chai");

const { getPackagesPath, getJsonByPath, setIsSilent } = require("../src");

describe("getJsonByPath", () => {
  setIsSilent(true);
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const { json, ext, distPath } = getJsonByPath()();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(ext).to.be.an("Array");
    expect(ext.length).to.be.equal(1);

    expect(distPath).to.be.an("Array");
    expect(distPath.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    expect(json[0].name).to.be.equal("get-info");
    expect(ext[0]).to.be.equal("js");
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

    const { json } = getJsonByPath()(...path);

    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    expect(json[0].name).to.be.equal("@folo/forms");
  });
});
