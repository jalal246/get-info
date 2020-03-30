# get-info

> Utility functions deal with files in your project. Make production easier & faster :mag_right:

`get-info` Contains a bunch of functions that read packages in root project,
validate each one, return the path, JSON, and used extension(js|ts) .

These functions are essential to deal with monorepos `./packages/**/src`, and it works as well for a
single package project `./src`.

```bash
npm install get-info
```

## API

### getJsonByName

Extracts package json, extension, and resolved source path for each given name.
If `names` are not passed, it returns all json objects can be found in `./packages/**/package.json`
or `./package.json`

```js
/**
 *
 * @param {string} names required packages name
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {ext, srcPath}
 */
const { json, pkgInfo } = getJsonByName(...names);
```

#### Example(1)

```js
import { getJsonByName } from "get-info";

const { json, pkgInfo } = getJsonByName("myFav/project", "another/project");

// json [{name: @myFav/project, version: "1.1.1", main: "index.js", ...}, {...}]

// pkgInfo[@myFav/project] {ext: js, srcPath: "root/**/myFav-project/src/index.js"}
```

### getJsonByPath

Extracts package json, extension, and resolved source path for each given path.
If `paths` are not passed, it returns all json objects can be found in `./packages/**/package.json`
or `./package.json`

```js
/**
 *
 * @param {sting} paths  contains paths to resolve and extracts info form.
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {ext, srcPath}
 */
const { json, pkgInfo } = getJsonByPath(...paths);
```

#### Example(2)

```js
import { getJsonByPath } from "get-info";

const { json, pkgInfo } = getJsonByPath("./myProject");

// json [{name: myProject, version: "1.1.1", main: "index.js", ...}]

// pkgInfo[myProject] {ext: js, srcPath: "myProject/src/index.js"}
```

### getPackagesPath

It scans root directory, returns all project in there. It filters each path returns
only packages contain valid `src/index[ext]` and have `package.json`

```js
/**
 *
 * @param {string} [dir="./packages/*"]
 *
 * @returns {Object[]} results
 * @returns {Array} results[].path valid path directory
 * @returns {Array} results[].ext extension for each path (js|ts)
 */
const { path, ext } = getPackagesPath(dir);
```

#### Example(3)

```js
import { getPackagesPath } from "get-info";

const { path, ext } = getPackagesPath();

// path [
//   "./packages/myProj1",
//   "./packages/myProj2",
//   "./packages/myProj3"
// ];

// ext ["js", "ts", "ts"];
```

### Utils: functions used in this project exported for further use

#### utils.getFileExtension

Gets extension used for `project/**/src/**`

```js
import { utils } from "get-info";

/**
 *
 * @param {string} dir - given directory
 * @returns {string} extension.
 */
const { getFileExtension } = utils;
const extension = getFileExtension(dir);
```

#### utils.validateAccess

Validates access readability for `package.json` & `src`.

```js
import { utils } from "get-info";
const { validateAccess } = utils;

/**
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

Filters array of paths by validate each path. Make sure it has `package.json` & `src`.

```js
import { utils } from "get-info";
const { filterPathAccess } = utils;

/**
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

- [builderz](https://github.com/jalal246/builderz) - Build your project(s) with zero configuration

- [corename](https://github.com/jalal246/corename) - Extracts package name.

- [move-position](https://github.com/jalal246/move-position) - Moves element
  index in an array.

- [textics](https://github.com/jalal246/textics) & [textics-stream](https://github.com/jalal246/textics-stream) - Counts lines, words, chars and spaces for a given string.

## Tests

```sh
npm test
```

## License

This project is licensed under the [GPL-3.0 License](https://github.com/jalal246/get-info/blob/master/LICENSE)
