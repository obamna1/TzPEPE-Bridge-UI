const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
const tezosNetworkName = 'mainnet';

export const config = {
  isTestnet: true,
  isMock: false,
  app: {
    name: 'PEPE BRIDGE',
    description: '',
    url: appUrl
  },
  bridge: {
    smartRollupAddress: 'sr1Ghq66tYK9y3r8CC1Tf8i8m5nxh8nTvZEf',
    smartRollupNodeBaseUrl: 'https://relay.mainnet.etherlink.com'
  },
  tezos: {
    network: {
      name: tezosNetworkName,
      displayName: tezosNetworkName[0].toLocaleUpperCase() + tezosNetworkName.slice(1),
      rpcUrl: `https://rpc.tzkt.io/${tezosNetworkName}`
    }
  },
  etherlink: {
    network: {
      name: 'Etherlink Mainnet',
      displayName: 'Etherlink Mainnet',
      chainId: 42793, // '0x539',
      nativeCurrency: {
        name: 'XTZ',
        symbol: 'XTZ',
        decimals: 18
      },
      rpcUrl: 'https://node.mainnet.etherlink.com',
      blockExplorerUrl: '	https://explorer.etherlink.com'
    },
  },
  providers: {
    dipDup: {
      baseUrl: 'https://etherlink-bridge-indexer.dipdup.net',
      webSocketApiBaseUrl: 'wss://etherlink-bridge-indexer.dipdup.net'
    },
    tzKT: {
      baseUrl: `https://api.${tezosNetworkName}.tzkt.io`,
    }
  },
  walletConnectProjectId: '734c08921b9f4f202d6b63a45fb0d800',
} as const;
