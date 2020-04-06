# get-info

> Utility functions extract project(s) Json by providing> project root path or package names.

`get-info` Works with monorepos `./packages/**/` as well as for a single package project `./MyFiles`.

```bash
npm install get-info
```

## API

### getJsonByName

Extracts package json, and resolved path for each project name. If `names` are
not passed, it returns all json objects can be found in
`./packages/**/package.json` or `./package json`

```js
/**
 * @param {string} names required packages name
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given name
 * @returns {Object} results[].pkgInfo - {path}
 */
const { json, pkgInfo } = getJsonByName(...names);
```

#### Example(1)

```js
import { getJsonByName } from "get-info";

const { json, pkgInfo } = getJsonByName("myFav/project", "another/project");

// json
//[{name: @myFav/project, version: "1.1.1", main: "index.js", ...}, {name: @another/project,}]

// pkgInfo[@myFav/project]
// {path: "root/to/myFav-project"}

// Note: to get default entry and resolved dist path:

const { path } = pkgInfo["@myFav/project"];

const srcPath = resolve(path, "src", `index.js`);
const buildPath = resolve(path, "dist");
```

What if passed invalid name? It returns empty array `[]`

#### Example(2)

```js
const { json, pkgInfo } = getJsonByName("pkg-no-valid-json");

// json
// []

if (json.length === 0) console.log("do something");
```

### getJsonByPath

Extracts package json, and its associated resolved path. If `paths` are not
passed, it returns all json objects can be found in `./packages/**/package.json`
or `./package.json`

```js
/**
 *
 * @param {sting} paths  contains paths to resolve and extracts info form.
 *
 * @returns {Object} results
 * @returns {Array} results[].json - packages json related to given path
 * @returns {Object} results[].pkgInfo - {path}
 */
const { json, pkgInfo } = getJsonByPath(...paths);
```

#### Example(3)

```js
import { getJsonByPath } from "get-info";

const { json, pkgInfo } = getJsonByPath(`${__dirname}/myProject`);

// json
// [{name: myProject, version: "1.1.1", main: "index.js", ...}]

// pkgInfo[myProject]
// {path: "root/to/myProject"}
```

How it works with monorepo?

#### Example(4)

```js
const { json, pkgInfo } = getJsonByPath(
  `${__dirname}/myProject1`,
  `${__dirname}/myProject2`
);

// json
// [{name: myProject1, version: "1.1.1", main: "index.js", ...}]

// Since path is exported and associated with  package name you can easily do:

const { path } = pkgInfo["myProject1"];

const srcPath = resolve(path, "src", `index.js`);
const buildPath = resolve(path, "dist");
```

### Related projects

- [validate-access](https://github.com/jalal246/validate-access) - Validate
  project accessibility files

- [packageSorter](https://github.com/jalal246/packageSorter) - Sorts a group of
  packages that depends on each other.

- [builderz](https://github.com/jalal246/builderz) - JavaScript Bundler with zero configuration.

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
