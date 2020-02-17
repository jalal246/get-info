const { expect } = require("chai");

const { getPackagesPath, getJsonByPath, setIsSilent } = require("../src");

describe("getJsonByPath", () => {
  setIsSilent(true);
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const packagesJson = getJsonByPath();
    expect(packagesJson).to.be.an("Array");
    expect(packagesJson.length).to.be.equal(1);
    expect(packagesJson[0]).to.have.own.property("name");
    expect(packagesJson[0]).to.have.own.property("distPath");
    expect(packagesJson[0]).to.have.own.property("sourcePath");
    expect(packagesJson[0]).to.have.own.property("dependencies");
    /**
     * By default, will read the project scr and package json.
     */
    expect(packagesJson[0].name).to.be.equal("extractJson");
  });

  it("filters unfiltered paths then get packages Json for each", () => {
    const packagesPath = getPackagesPath({
      path: "./test/packages/invalid",
      isFilter: false
    });

    const packagesJson = getJsonByPath({
      pkgPath: packagesPath
    });

    expect(packagesJson.length).to.be.equal(1);

    expect(packagesJson[0]).to.have.own.property("name");
    expect(packagesJson[0]).to.have.own.property("distPath");
    expect(packagesJson[0]).to.have.own.property("sourcePath");
    expect(packagesJson[0]).to.have.own.property("dependencies");
  });
});
