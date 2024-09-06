export const getApiEndpoint = (): string => {
  return process.env.NEXT_PUBLIC_API_ENDPOINT || '';
};

export const getRPC = () => {
  return 'https://public-en-kairos.node.kaia.io';
};

export const getBscScanUrl = () => {
  return process.env.NEXT_PUBLIC_BSC_SCAN;
};

export const isProduction = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  return env === 'PRO';
};
