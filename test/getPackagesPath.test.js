const { expect } = require("chai");

const { getPackagesPath, setIsSilent } = require("../src");

setIsSilent(true);

describe("testing getPackagesPath()", () => {
  it("returns array contains paths for all-valid packages", () => {
    const packagesPath = getPackagesPath({ dir: "./test/packages-valid/*" });

    const expected = [
      "./test/packages-valid/folo-forms",
      "./test/packages-valid/folo-layout",
      "./test/packages-valid/folo-utils",
      "./test/packages-valid/folo-values",
      "./test/packages-valid/folo-withcontext"
    ];

    expect(packagesPath).to.deep.equal(expected);
  });

  it("returns filtered array contains only valid packages", () => {
    const packagesPath = getPackagesPath({ dir: "./test/packages-invalid/*" });

    const expected = ["./test/packages-invalid/folo-forms"];

    expect(packagesPath).to.deep.equal(expected);
  });

  it("returns non-array Array even if there's no package.json or src folder", () => {
    const packagesPath = getPackagesPath({
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
