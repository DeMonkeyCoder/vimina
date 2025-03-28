import { defineChain } from '../../utils/chain/defineChain.js'

export const mainnet = /*#__PURE__*/ defineChain({
  id: 'mainnet',
  name: 'Mina Mainnet',
  nativeCurrency: { name: 'MINA', symbol: 'MINA', decimals: 9 },
  rpcUrls: {
    default: {
      http: ['https://api.minascan.io/node/mainnet/v1/graphql'],
      klesia: ['https://mainnet.klesia.palladians.xyz/api'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Minascan',
      url: 'https://minascan.io/mainnet',
    },
  },
})
