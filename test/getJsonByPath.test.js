const { expect } = require("chai");

const { getPackagesPath, getJsonByPath, setIsSilent } = require("../src");

describe("getJsonByPath", () => {
  setIsSilent(true);
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const { json } = getJsonByPath();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);
    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("distPath");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    /**
     * By default, will read the project scr and package json.
     */
    expect(json[0].name).to.be.equal("get-info");
  });

  it("filters unfiltered paths then get packages Json for each", () => {
    const { path, ext } = getPackagesPath({
      dir: "./test/packages-invalid/*"
    });

    const { json } = getJsonByPath({
      path,
      ext
    });

    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("distPath");
    expect(json[0]).to.have.own.property("sourcePath");
    expect(json[0]).to.have.own.property("dependencies");

    expect(json[0].name).to.be.equal("@folo/forms");
  });
});
