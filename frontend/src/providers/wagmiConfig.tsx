import { Chain, configureChains, createConfig } from 'wagmi';
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

const baobab: Chain = {
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
    default: { name: 'Klaytn Finder', url: 'https://baobab.klaytnfinder.io' },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baobab],
  [publicProvider()],
);

const projectId = '4b12f4f9e3f20aa05018248c4d6d5ff0';
const { wallets } = getDefaultWallets({
  appName: 'Mystery Box',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Orakl Network Mystery Box',
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

const devId = baobab.id;

export { wagmiConfig, demoAppInfo, chains, devId };
