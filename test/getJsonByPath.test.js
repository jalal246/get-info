// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require("chai");
const { resolve } = require("path");
const fs = require("fs");

const { getJsonByPath } = require("../src");

const toFixtures = resolve(__dirname, "fixtures");

const rootPath = fs
  .readdirSync(toFixtures)
  .map((pkgPath) => resolve(toFixtures, pkgPath));

describe("getJsonByPath", () => {
  it("Default: Checks if monorepo or not and gets the json info", () => {
    const { json, pkgInfo } = getJsonByPath();

    expect(json).to.be.an("Array");
    expect(json.length).to.be.equal(1);

    expect(json[0]).to.have.own.property("name");
    expect(json[0]).to.have.own.property("files");

    /**
     * By default, will read the project scr and package json.
     */
    const { name } = json[0];

    const { path } = pkgInfo[name];

    expect(path).to.be.an("string");
  });

  it("returns all valid packages contains json for given path", () => {
    const { json, pkgInfo } = getJsonByPath(...rootPath);

    expect(json.length).to.be.equal(6);

    json.forEach(({ name }) => {
      expect(name).to.be.an("string");

      expect(pkgInfo[name].path).to.be.an("string");
    });
  });
});
