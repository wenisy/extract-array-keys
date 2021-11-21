import { ExtractArrayKeysProps, ExtractArrayKeysReturnProps } from "./type";

/**
 * Method is used for arrange your object keys from array.
 * it will put all object keys with same key+value in duplicatedKeys
 * it will put all object keys with different key+values in uniqueKeys
 *
 * @param array: The array you want to arrange, must be an object array, object could be nested
 * @param excludedKeys: The keys you want to remove by default
 * @param includedKeys: The keys you want to keep by default
 * @param specificKey: if object is nested, the specific key you want to start from
 *
 * @return {
 * duplicatedKeys: Could get all excludedKeys from array
 * uniqueKeys: Could get all includedKeys from array
 * }
 *
 */

const extractArrayKeys: (
  props: ExtractArrayKeysProps
) => ExtractArrayKeysReturnProps = ({
  array,
  excludedKeys = [],
  includedKeys = [],
  specificKey,
}) => {
  if (excludedKeys.some((e) => includedKeys.includes(e))) {
    throw new Error(
      "Can not set duplicated keys in excludedKeys and includedKeys"
    );
  }
  if (!array?.length) {
    throw new Error("Array cant not be empty");
  }
  if (array.some((a) => typeof a !== "object")) {
    throw new Error(
      "There must be object Array, e.g: [{a:1, b:2}, {a:2, b:3}]"
    );
  }
  const totalCount = array?.length ?? 0;
  const { allKeys } = array?.reduce(
    (prev, metric) => {
      Object.entries(specificKey ? metric[specificKey] : metric).forEach(
        ([c, value]) => {
          const currentValue = [c, value].join("_");
          const prevValue = prev.allKeys[c]?.value;
          prev.allKeys = {
            ...prev.allKeys,
            [c]: {
              value: currentValue,
              count: prevValue === currentValue ? prev.allKeys[c].count + 1 : 1,
            },
          };
        }
      );
      return prev;
    },
    { allKeys: {} }
  );

  const result = Object.keys(allKeys).reduce(
    (previousValue, currentValue) => {
      const updatedArray = [currentValue].concat(
        allKeys[currentValue].count === totalCount
          ? previousValue.duplicatedKeys
          : previousValue.uniqueKeys
      );

      return {
        ...previousValue,
        ...{
          [allKeys[currentValue].count === totalCount
            ? "duplicatedKeys"
            : "uniqueKeys"]: updatedArray,
        },
      };
    },
    {
      duplicatedKeys: excludedKeys,
      uniqueKeys: includedKeys,
    }
  );
  return {
    duplicatedKeys: Array.from(
      new Set(result.duplicatedKeys.filter((k) => !includedKeys.includes(k)))
    ),
    uniqueKeys: Array.from(
      result.uniqueKeys.filter((k) => !excludedKeys.includes(k))
    ),
  };
};

export default extractArrayKeys;
