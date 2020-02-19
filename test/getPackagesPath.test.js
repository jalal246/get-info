const { expect } = require("chai");

const { getPackagesPath, setIsSilent } = require("../src");

describe("getPackagesPath", () => {
  setIsSilent(true);
  it("Default: gets root path", () => {
    const { path, ext } = getPackagesPath();
    expect(path).to.deep.equal(["."]);
    expect(ext).to.deep.equal(["js"]);
  });

  it("returns array contains path for all-valid packages", () => {
    const { path, ext } = getPackagesPath({
      dir: "./test/packages-valid/*"
    });

    const expectedPaths = [
      "./test/packages-valid/folo-forms",
      "./test/packages-valid/folo-layout",
      "./test/packages-valid/folo-utils",
      "./test/packages-valid/folo-values",
      "./test/packages-valid/folo-withcontext"
    ];

    const expectedExtensions = ["js", "js", "js", "js", "js"];
    expect(path).to.deep.equal(expectedPaths);
    expect(ext).to.deep.equal(expectedExtensions);
  });

  it("returns filtered array contains only valid packages", () => {
    const { path, ext } = getPackagesPath({
      dir: "./test/packages-invalid/*"
    });

    const expectedExtensions = ["js"];

    const expected = ["./test/packages-invalid/folo-forms"];

    expect(path).to.deep.equal(expected);
    expect(ext).to.deep.equal(expectedExtensions);
  });
});
