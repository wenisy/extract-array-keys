export interface ArrayKey {
  [key: string]: any | ArrayKey;
}

export interface ArrangeKeysProps {
  array: ArrayKey[];
  excludedKeys?: string[];
  includedKeys?: string[];
  specificKey?: string;
}

export interface ArrangeKeysReturnProps {
  duplicatedKeys: string[];
  uniqueKeys: string[];
}
