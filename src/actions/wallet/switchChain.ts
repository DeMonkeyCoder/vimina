import type { Account } from '../../accounts/types.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type SwitchChainParameters = {
  /** ID of Chain to switch to */
  id: Chain['id']
}

export type SwitchChainErrorType = RequestErrorType | ErrorType

/**
 * Switch the target chain in a wallet.
 *
 * - Docs: https://vimina.sh/docs/actions/wallet/switchChain
 * - JSON-RPC Methods: [`mina_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)
 *
 * @param client - Client to use
 * @param parameters - {@link SwitchChainParameters}
 *
 * @example
 * import { createWalletClient, custom } from 'vimina'
 * import { mainnet, optimism } from 'vimina/chains'
 * import { switchChain } from 'vimina/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * await switchChain(client, { id: optimism.id })
 */
export async function switchChain<
  chain extends Chain | undefined,
  account extends Account | undefined = undefined,
>(client: Client<Transport, chain, account>, { id }: SwitchChainParameters) {
  await client.request(
    {
      method: 'mina_switchChain',
      params: [id],
    },
    { retryCount: 0 },
  )
}
