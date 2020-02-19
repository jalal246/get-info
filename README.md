# extractJson

> Utility functions deal with files in your project. Make production easier :mag_right:

`extractJson` Contains a bunch od functions read packages in root project,
validate each package, return the path, JSON, and extension(js|ts) used for each
one. As it is essentially created to deal with monorepos, it works as well for a
single package project.

```bash
npm install extractJson
```

## API

If not passed path or ext (more likely you don't need to), then all functions
can automatically read the current project directory whether it is `packages/**/src`or
`./src`

### getPackagesInfo

```js
/**
 * Gets package full info by passed name of packages.
 *
 * @param {Object} input
 * @param {Array} input.path Array contains paths to each package
 * @param {Array} input.ext Array contains extension associated to each package
 * @param {string} [input.buildName="dist"]
 * @returns {Object[]} results
 * @returns {Array} results[].ext
 * @returns {Array} results[].json
 * @returns {Array} results[].path
 */
const { json, ext } = getPackagesInfo({ buildName, path, ext })(
  ...packagesName
);
```

#### Example(1)

```js
import { getPackagesInfo } from "extractJson";

const { ext, json, path } = getPackagesInfo()("myFav/project another/project");

expect(json).to.be.an("Array");

expect(json.length).to.be.equal(2);

expect(json[0].name).to.be.equal("@myFav/project");
expect(json[1].name).to.be.equal("@another/project");
```

### getJsonByPath

```js
/**
 * Gets package json by path. Reads each passed directory. Then, returns
 * objects extracted form these json files including source and distention path.
 *
 * Note: this function validate accessability and throw error if there's
 * something wrong in src/index.ext
 *
 * @param {Array} path Array contains paths to each package
 * @param {Array} ext Array contains extension associated to each package
 *
 * @returns {Object[]} pkgInfo is an object of arrays
 * @returns {string} pkgInfo[].sourcePath
 * @returns {string} pkgInfo[].distPath
 * @returns {string} pkgInfo[].name
 * @returns {Object} pkgInfo[].peerDependencies
 * @returns {Object} pkgInfo[].dependencies
 * @returns {...*}   other
 */
const { json, ext } = getJsonByPath({ path, ext });
```

#### Example(2)

```js
import { getJsonByPath } from "extractJson";

const { json, ext } = getJsonByPath();

expect(json).to.be.an("Array");
expect(json.length).to.be.equal(1);
expect(json[0].name).to.be.equal("extractJson");
```

### getPackagesPath

```js
/**
 * Gets packages path for a given project source root. It filters each path
 * returns only packages contain valid src/index and have package.json
 *
 * @param {string} dir packages main directory [path="./packages/*"]
 * @returns {Object[]} results
 * @returns {Array} results[].path valid path directory
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
const { path, ext } = getPackagesPath({ dir });
```

#### Example(3)

```js
import { getPackagesPath } from "extractJson";

const { path, ext } = getPackagesPath();

const expectedPaths = [
  "./packages/myProj1",
  "./packages/myProj2",
  "./packages/myProj3"
];

const expectedExtensions = ["js", "ts", "ts"];

expect(path).to.deep.equal(expectedPaths);
expect(ext).to.deep.equal(expectedExtensions);
```

### utils

utility functions used in this project is also exported for further use.

```js
import { utils } from "extractJson";

const {
  getFileExtension,
  validateAccessability,
  filterPathAccessability
} = utils;
```

## Tests

```sh
npm test
```

## License

This project is licensed under the [GPL-3.0 License](https://github.com/jalal246/extractJson/blob/master/LICENSE)
