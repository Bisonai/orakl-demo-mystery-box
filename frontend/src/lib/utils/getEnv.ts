export const getRPC = () => {
  return 'https://public-en-baobab.klaytn.net';
};

export const isProduction = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  return env === 'PRO';
};
