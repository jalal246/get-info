const { expect } = require("chai");

const { getPackagesPath, setIsSilent } = require("../src");

describe("testing getPackagesPath()", () => {
  setIsSilent(true);
  it("returns array contains paths for all-valid packages", () => {
    const { paths: packagesPath, ext } = getPackagesPath({
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
    expect(packagesPath).to.deep.equal(expectedPaths);
    expect(ext).to.deep.equal(expectedExtensions);
  });

  it("returns filtered array contains only valid packages", () => {
    const { paths: packagesPath } = getPackagesPath({
      dir: "./test/packages-invalid/*"
    });

    const expected = ["./test/packages-invalid/folo-forms"];

    expect(packagesPath).to.deep.equal(expected);
  });

  it("returns non-filtered Array even if there's no package.json or src folder", () => {
    const { paths: packagesPath } = getPackagesPath({
      dir: "./test/packages-invalid/*",
      isFilter: false
    });

    const expected = [
      "./test/packages-invalid/folo-forms",
      "./test/packages-invalid/folo-layout",
      "./test/packages-invalid/folo-values"
    ];

    expect(packagesPath).to.deep.equal(expected);
  });
});
