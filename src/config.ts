export const config = {
  appName: 'Tez2Eth',
  isTestnet: true,
  isMock: true,
  tezos: {
    networkName: 'Oxfordnet',
    rpcUrl: 'https://rpc.tzkt.io/oxfordnet',
    smartRollupAddress: 'sr1JZsZT5u27MUQXeTh1aHqZBo8NvyxRKnyv',
  },
  etherlink: {
    networkName: 'Etherlink Testnet',
    network: {
      chainId: '0x539',
      chainName: 'Etherlink Testnet',
      nativeCurrency: {
        name: 'XTZ',
        symbol: 'XTZ',
        decimals: 18
      },
      rpcUrls: [
        'https://etherlink.dipdup.net'
      ],
      blockExplorerUrls: [
        'https://blockscout.dipdup.net/'
      ]
    }
  },
  dipDup: {
    baseUrl: 'https://etherlink-bridge-indexer.dipdup.net',
    webSocketApiBaseUrl: 'wss://etherlink-bridge-indexer.dipdup.net'
  },
  bridgeSmartRollupNodeBaseUrl: 'https://etherlink-rollup-nairobi.dipdup.net'
} as const;
