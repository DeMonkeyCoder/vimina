import type { Account, Address } from '../../accounts/types.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'
import { getAddress } from '../../utils/address/getAddress.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type RequestAddressesReturnType = Address[]

export type RequestAddressesErrorType = RequestErrorType | ErrorType

/**
 * Requests a list of accounts managed by a wallet.
 *
 * - Docs: https://vimina.sh/docs/actions/wallet/requestAddresses
 * - JSON-RPC Methods: [`mina_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)
 *
 * Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses).
 *
 * This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts.
 *
 * @param client - Client to use
 * @returns List of accounts managed by a wallet {@link RequestAddressesReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'vimina'
 * import { mainnet } from 'vimina/chains'
 * import { requestAddresses } from 'vimina/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const accounts = await requestAddresses(client)
 */
export async function requestAddresses<
  chain extends Chain | undefined,
  account extends Account | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
): Promise<RequestAddressesReturnType> {
  const addresses = await client.request(
    { method: 'mina_requestAccounts' },
    { dedupe: true, retryCount: 0 },
  )
  return addresses.map((address) => getAddress(address))
}
