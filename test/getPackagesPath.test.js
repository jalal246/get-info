const { expect } = require("chai");

const { getPackagesPath } = require("../src");

describe.only("getPackagesPath", () => {
  it("Default: gets root path", () => {
    const { path, ext } = getPackagesPath(undefined, {
      isValidateEntry: true
    });

    expect(path).to.deep.equal(["."]);
    expect(ext).to.deep.equal(["js"]);
  });

  it("returns array contains path for all-valid packages", () => {
    const { path, ext } = getPackagesPath("./test/packages-valid/*", {
      isValidateEntry: true
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

  it.only("returns filtered array contains only valid packages", () => {
    const { path, ext } = getPackagesPath("./test/packages-invalid/*", {
      isValidateEntry: true
    });

    const expectedExtensions = ["js"];

    const expected = ["./test/packages-invalid/folo-forms"];

    expect(path).to.deep.equal(expected);
    expect(ext).to.deep.equal(expectedExtensions);
  });

  it("returns unfiltered array when isValidateEntry is false", () => {
    const { path } = getPackagesPath("./test/packages-invalid/*");

    const expected = [
      "./test/packages-invalid/folo-forms",

      "./test/packages-invalid/folo-layout"
    ];

    expect(path).to.deep.equal(expected);
  });
});
