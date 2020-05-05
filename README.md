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
getJsonByName(...packNames?string)
```

The result object:

- `json: Array <packJson>` - Contains objects of all retrieved package.json based on given names
- `pkgInfo: Array <packPath>` - Contains objects of package paths based on package name

```js
const { json, pkgInfo } = getJsonByName(...names);
```

#### Example(1)

```js
import { getJsonByName } from "get-info";

// workspace
// │
// ├───foo
// │   ├───src
// │   └───package.json
// ├───bar
// │   ├───src
// │   └───package.json
// ├───foobar
// │   ├───src
// │

const { json, pkgInfo } = getJsonByName("foo", "bar");

// json = [
//   { name: "foo", version: "1.0.0", main: "index.js" },
//   { name: "bar", version: "2.1.1", main: "bundle.js" },
// ];

// pkgInfo = {
//   foo: { path: "path/to/foo" },
//   bar: { path: "path/to/bar" },
// };
```

What if passed invalid name? It returns empty array `[]`

#### Example(2)

```js
// workspace
// │
// ├───foo
// │   ├───src
// │   └───package.json
// ├───bar
// │   ├───src
// │   └───package.json
// ├───foobar
// │   ├───src
// │

const { json, pkgInfo } = getJsonByName("baz");

// json =[]

if (json.length === 0) console.log("do something");
```

### getJsonByPath

Extracts package json, and its associated resolved path. If `paths` are not
passed, it returns all json objects can be found in `./packages/**/package.json`
or `./package.json`

```js
getJsonByPath(...paths?string)
```

The result object:

- `json: Array <packJson>` - Contains objects of all retrieved package.json based on given paths
- `pkgInfo: Array <packPath>` - Contains objects of package paths based on package path
- `unfoundJson: Array` - List of package paths don't have valid package.json

```js
const { json, pkgInfo, unfoundJson } = getJsonByPath(...paths);
```

#### Example(3)

```js
import { getJsonByPath } from "get-info";

// workspace
// │
// ├───foo
// │   ├───src
// │   └───package.json
// ├───bar
// │   ├───src
// │   └───package.json
// ├───foobar
// │   ├───src
// │

const { json, pkgInfo, unfoundJson } = getJsonByPath(
  `${__dirname}/foo`,
  `${__dirname}/bar`
);

// json = [
//   { name: "foo", version: "1.0.0", main: "index.js" },
//   { name: "bar", version: "2.1.1", main: "bundle.js" },
// ];

// pkgInfo = {
//   foo: { path: "path/to/foo" },
//   bar: { path: "path/to/bar" },
// };

// unfoundJson = ["path/to/foobar"];
```

## Tests

```sh
npm test
```

## License

This project is licensed under the [GPL-3.0 License](https://github.com/jalal246/get-info/blob/master/LICENSE)

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

- [folo](https://github.com/jalal246/folo) - Form & Layout Components Built with
  React.
