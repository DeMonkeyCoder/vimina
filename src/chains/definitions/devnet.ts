import { defineChain } from '../../utils/chain/defineChain.js'

export const devnet = /*#__PURE__*/ defineChain({
  id: 'devnet',
  name: 'Mina Devnet',
  nativeCurrency: { name: 'MINA', symbol: 'MINA', decimals: 9 },
  rpcUrls: {
    default: {
      http: ['https://api.minascan.io/node/devnet/v1/graphql'],
      klesia: ['https://devnet.klesia.palladians.xyz/api'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Minascan',
      url: 'https://minascan.io/devnet',
    },
  },
})
