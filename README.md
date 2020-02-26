# get-info

> Utility functions deal with files in your project. Make production easier :mag_right:

`get-info` Contains a bunch od functions read packages in root project,
validate each package, return the path, JSON, and extension(js|ts) used for each
one. As it is essentially created to deal with monorepos, it works as well for a
single package project.

```bash
npm install get-info
```

## API

If not passed path or ext (more likely you don't need to), then all functions
can automatically read the current project directory whether it is
`packages/**/src` or `./src`

### getJsonByName

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
const { json, ext } = getJsonByName({ buildName, path, ext })(...packagesName);
```

#### Example(1)

```js
import { getJsonByName } from "get-info";

const { ext, json, path } = getJsonByName()("myFav/project another/project");

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
import { getJsonByPath } from "get-info";

const { json, ext } = getJsonByPath();

expect(json).to.be.an("Array");
expect(json.length).to.be.equal(1);
expect(json[0].name).to.be.equal("get-info");
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
import { getPackagesPath } from "get-info";

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

### Utils

Utility functions used in this project are also exported for further use.

#### utils.getFileExtension

```js
import { utils } from "get-info";

/**
 * Loop inside a given directory looking for index. When find it, gets its
 * extension.
 *
 * @param {string} dir - given directory
 * @returns {string} extension.
 */
const { getFileExtension } = utils;
const extension = getFileExtension(dir);
```

#### utils.validateAccess

```js
import { utils } from "get-info";
const { validateAccess } = utils;

/**
 * Validates access readability `package.json` & `src` for given path.
 *
 * @param {string} [dir="."]
 * @param {string} [ext=getFileExtension(dir/src)]
 * @param {string} [srcName="src"]
 *
 * @returns {Object} result
 * @returns {boolean} result.isValid
 * @returns {string} result.ext
 */
const { isValid, ext } = validateAccess(dir, ext, srcName);
```

#### utils.filterPathAccess

```js
import { utils } from "get-info";
const { filterPathAccess } = utils;

/**
 * Filters array of paths by validate each path. Makes sure it has
 * `package.json` and `src`.
 *
 * @param {Array} [pkgPath=[]]
 * @returns {Object} results[]
 * @returns {Array} results[].path filtered valid paths
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
const { path, ext } = filterPathAccess(pkgPath);
```

### Related projects

- [packageSorter](https://github.com/jalal246/packageSorter) - Sorting packages
  for monorepos production.

- [builderz](https://github.com/jalal246/builderz) - Building your project with zero config.

- [corename](https://github.com/jalal246/corename) - Extracts package name.

## Tests

```sh
npm test
```

## License

This project is licensed under the [GPL-3.0 License](https://github.com/jalal246/get-info/blob/master/LICENSE)
