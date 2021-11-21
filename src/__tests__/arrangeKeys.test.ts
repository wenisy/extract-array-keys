import arrangeKeys from "../index";

describe("with only array", () => {
  const { duplicatedKeys, uniqueKeys } = arrangeKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
  });
  test("expected duplicatedKeys", () => {
    expect(duplicatedKeys.sort()).toEqual(["a", "b"]);
  });

  test("expected includedKeys", () => {
    expect(uniqueKeys.sort()).toEqual(["c", "d"]);
  });
});

describe("with array and excludedKeys", () => {
  const { duplicatedKeys, uniqueKeys } = arrangeKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
    excludedKeys: ["c"],
  });
  test("expected duplicatedKeys with excludedKeys 'c'", () => {
    expect(duplicatedKeys.sort()).not.toEqual(["a", "b"]);
  });
  test("expected uniqueKeys without excludedKeys 'c'", () => {
    expect(uniqueKeys.sort()).not.toEqual(["c", "d"]);
  });
  test("expected duplicatedKeys with excludedKeys 'c'", () => {
    expect(duplicatedKeys.sort()).toEqual(["a", "b", "c"]);
  });
  test("expected uniqueKeys without excludedKeys 'c'", () => {
    expect(uniqueKeys.sort()).toEqual(["d"]);
  });
});

describe("with array and specificKey", () => {
  const { duplicatedKeys, uniqueKeys } = arrangeKeys({
    specificKey: "metric",
    array: [
      { metric: { a: 1, b: 2, c: 3, d: 4 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 3, d: 4 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 3, d: 5 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 4, d: 6 }, value: { x: 1, y: 2, z: 3 } },
      { metric: { a: 1, b: 2, c: 4, d: 7 }, value: { x: 1, y: 2, z: 3 } },
    ],
  });
  test("expected duplicatedKeys", () => {
    expect(duplicatedKeys.sort()).toEqual(["a", "b"]);
  });
  test("expected uniqueKeys", () => {
    expect(uniqueKeys.sort()).toEqual(["c", "d"]);
  });
});

describe("with array, specificKey, excludedKeys and includedKeys", () => {
  const { duplicatedKeys, uniqueKeys } = arrangeKeys({
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
  test("expected duplicatedKeys", () => {
    expect(duplicatedKeys.sort()).not.toEqual(["a", "b"]);
  });
  test("expected duplicatedKeys", () => {
    expect(duplicatedKeys.sort()).toEqual(["b", "c"]);
  });
  test("expected uniqueKeys", () => {
    expect(uniqueKeys.sort()).not.toEqual(["c", "d"]);
  });
  test("expected uniqueKeys", () => {
    expect(uniqueKeys.sort()).toEqual(["a", "d"]);
  });
});

describe("with array and includedKeys", () => {
  const { duplicatedKeys, uniqueKeys } = arrangeKeys({
    array: [
      { a: 1, b: 2, c: 3, d: 4 },
      { a: 1, b: 2, c: 3, d: 5 },
      { a: 1, b: 2, c: 4, d: 6 },
      { a: 1, b: 2, c: 4, d: 7 },
    ],
    includedKeys: ["a"],
  });
  test("expected duplicatedKeys without includedKeys 'a'", () => {
    expect(duplicatedKeys.sort()).toEqual(["b"]);
  });
  test("expected uniqueKeys with includedKeys 'a'", () => {
    expect(uniqueKeys.sort()).toEqual(["a", "c", "d"]);
  });
});

describe("with incorrect params", () => {
  test("array is empty", () => {
    expect(() => arrangeKeys({ array: [] })).toThrow("Array cant not be empty");
  });
  test("a key can not appear in excludedKeys and includedKeys at the same time", () => {
    expect(() =>
      arrangeKeys({
        array: [{ a: 1, b: 2, c: 3, d: 4 }],
        excludedKeys: ["a"],
        includedKeys: ["a"],
      })
    ).toThrow("Can not set duplicated keys in excludedKeys and includedKeys");
  });
});
