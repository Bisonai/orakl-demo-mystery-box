import { Chain, configureChains, createConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

const klaytnTestnetBaobab: Chain = {
  id: 1001,
  name: 'Klaytn Testnet',
  network: 'klaytn Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    public: { http: ['https://public-en-baobab.klaytn.net'] },
    default: { http: ['https://public-en-baobab.klaytn.net'] },
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://baobab.klaytnscope.com/' },
    etherscan: { name: 'KlaytnScope', url: 'https://baobab.klaytnscope.com/' },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    klaytnTestnetBaobab,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()],
);

const projectId = 'c8c689289f7b3547fc20222dfa21f7d2';
const { wallets } = getDefaultWallets({
  appName: 'Blast Staking',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const devId = klaytnTestnetBaobab.id;

export { wagmiConfig, demoAppInfo, chains, devId };
