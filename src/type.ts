export interface ArrayKey {
  [key: string]: any | ArrayKey;
}

export interface ExtractArrayKeysProps {
  array: ArrayKey[];
  excludedKeys?: string[];
  includedKeys?: string[];
  specificKey?: string;
}

export interface ExtractArrayKeysReturnProps {
  duplicatedKeys: string[];
  uniqueKeys: string[];
}
