<span class="badge-npmversion"><a href="https://npmjs.org/package/extract-array-keys" title="View this project on NPM"><img src="https://img.shields.io/npm/v/extract-array-keys.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/extract-array-keys" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/extract-array-keys.svg" alt="NPM downloads" /></a></span>

# Extract Array Keys

Method is used for arrange your object keys from array.
it will put all object keys with same key+value in duplicatedKeys
itt will put all object keys with different key+values in uniqueKeys

# **Usage**

## With only array

```tsx
import extractArrayKeys from 'extract-array-keys'

// with only array
const { duplicatedKeys, uniqueKeys } = extractArrayKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
  });

console.log(duplicatedKeys)
// ["a", "b"]
console.log(uniquekeys)
// ["c", "d"]
```

---

## With array and excludedKeys

```tsx
import extractArrayKeys from 'extract-array-keys'

// with only array
const { duplicatedKeys, uniqueKeys } = extractArrayKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
		excludedKeys: ["c"],
  });

console.log(duplicatedKeys)
// ["a", "b", "c"]
console.log(uniquekeys)
// ["d"]
```

---

## With array and includedkeys

```tsx
import extractArrayKeys from 'extract-array-keys'

// with only array
const { duplicatedKeys, uniqueKeys } = extractArrayKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
		includedkeys: ["a"],
  });

console.log(duplicatedKeys)
// ["b"]
console.log(uniquekeys)
// ["a", "c", "d"]
```

---

## With array, specificKey, excludedKeys and includedKeys

```tsx
const { duplicatedKeys, uniqueKeys } = extractArrayKeys({
    specificKey: "metric",
    array: [
      { metric: { a: 1, b: 2, c: 3, d: 4 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 3, d: 4 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 3, d: 5 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 4, d: 6 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 4, d: 7 }, value: { x: 1, y: 2, z: 3 } },
    ],
    excludedKeys: ["c"],
    includedKeys: ["a"],
  });

console.log(duplicatedKeys)
// ["b", "c"]
console.log(uniquekeys)
// ["a", "d"]
```


<!-- LICENSE/ -->
<h2>License</h2>
<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>
<!-- /LICENSE -->
