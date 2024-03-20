export type AddressType = {
  97: string;
  56: string;
};

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) {
    return 97;
  }
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

// convertToStruct takes an array type eg. Inventory.ItemStructOutput and converts it to an object type.
export const convertToStruct = <A extends Array<unknown>>(
  arr: A,
): ExtractPropsFromArray<A> => {
  const keys = Object.keys(arr).filter(key => isNaN(Number(key)));
  const result = {};
  // @ts-ignore
  arr.forEach((item, index) => (result[keys[index]] = item));
  return result as A;
};

// This is to remove unnecessary properties from the output type. Use it eg. `ExtractPropsFromArray<Inventory.ItemStructOutput>`
export type ExtractPropsFromArray<T> = Omit<
  T,
  keyof Array<unknown> | `${number}`
>;

export function fromStructToObject<T extends object>(struct: [] & T): T {
  struct = { ...struct };
  const keysNumber = Object.keys(struct).length;
  for (var i = 0; i < keysNumber / 2; i++) {
    delete struct[i];
  }
  return struct;
}
