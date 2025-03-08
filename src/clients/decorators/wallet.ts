import type { Account } from '../../accounts/types.js'
import {
  type GetNetworkIdReturnType,
  getNetworkId,
} from '../../actions/public/getNetworkId.js'
import {
  type AddChainParameters,
  addChain,
} from '../../actions/wallet/addChain.js'
import {
  type GetAddressesReturnType,
  getAddresses,
} from '../../actions/wallet/getAddresses.js'
import {
  type GetPermissionsReturnType,
  getPermissions,
} from '../../actions/wallet/getPermissions.js'
import {
  type RequestAddressesReturnType,
  requestAddresses,
} from '../../actions/wallet/requestAddresses.js'
import {
  type RequestPermissionsParameters,
  type RequestPermissionsReturnType,
  requestPermissions,
} from '../../actions/wallet/requestPermissions.js'
import {
  type SwitchChainParameters,
  switchChain,
} from '../../actions/wallet/switchChain.js'
import type { Chain } from '../../types/chain.js'
import type { Client } from '../createClient.js'
import type { Transport } from '../transports/createTransport.js'

export type WalletActions<
  _chain extends Chain | undefined = Chain | undefined,
  _account extends Account | undefined = Account | undefined,
> = {
  /**
   * Adds an EVM chain to the wallet.
   *
   * - Docs: https://vimina.sh/docs/actions/wallet/addChain
   * - JSON-RPC Methods: [`mina_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)
   *
   * @param args - {@link AddChainParameters}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { optimism } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   transport: custom(window.ethereum),
   * })
   * await client.addChain({ chain: optimism })
   */
  addChain: (args: AddChainParameters) => Promise<void>
  /**
   * Returns a list of account addresses owned by the wallet or client.
   *
   * - Docs: https://vimina.sh/docs/actions/wallet/getAddresses
   * - JSON-RPC Methods: [`mina_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#mina_accounts)
   *
   * @returns List of account addresses owned by the wallet or client. {@link GetAddressesReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { mainnet } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const accounts = await client.getAddresses()
   */
  getAddresses: () => Promise<GetAddressesReturnType>
  /**
   * Returns the chain ID associated with the current network.
   *
   * - Docs: https://vimina.sh/docs/actions/public/getNetworkId
   * - JSON-RPC Methods: [`mina_networkId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#mina_networkId)
   *
   * @returns The current chain ID. {@link GetNetworkIdReturnType}
   *
   * @example
   * import { createWalletClient, http } from 'vimina'
   * import { mainnet } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const networkId = await client.getNetworkId()
   * // 1
   */
  getNetworkId: () => Promise<GetNetworkIdReturnType>
  /**
   * Gets the wallets current permissions.
   *
   * - Docs: https://vimina.sh/docs/actions/wallet/getPermissions
   * - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255)
   *
   * @returns The wallet permissions. {@link GetPermissionsReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { mainnet } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const permissions = await client.getPermissions()
   */
  getPermissions: () => Promise<GetPermissionsReturnType>
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
   * @returns List of accounts managed by a wallet {@link RequestAddressesReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { mainnet } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const accounts = await client.requestAddresses()
   */
  requestAddresses: () => Promise<RequestAddressesReturnType>
  /**
   * Requests permissions for a wallet.
   *
   * - Docs: https://vimina.sh/docs/actions/wallet/requestPermissions
   * - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255)
   *
   * @param args - {@link RequestPermissionsParameters}
   * @returns The wallet permissions. {@link RequestPermissionsReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { mainnet } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const permissions = await client.requestPermissions({
   *   mina_accounts: {}
   * })
   */
  requestPermissions: (
    args: RequestPermissionsParameters,
  ) => Promise<RequestPermissionsReturnType>
  /**
   * Switch the target chain in a wallet.
   *
   * - Docs: https://vimina.sh/docs/actions/wallet/switchChain
   * - JSON-RPC Methods: [`mina_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)
   *
   * @param args - {@link SwitchChainParameters}
   *
   * @example
   * import { createWalletClient, custom } from 'vimina'
   * import { mainnet, optimism } from 'vimina/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * await client.switchChain({ id: optimism.id })
   */
  switchChain: (args: SwitchChainParameters) => Promise<void>
}

export function walletActions<
  transport extends Transport,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
>(client: Client<transport, chain, account>): WalletActions<chain, account> {
  return {
    addChain: (args) => addChain(client, args),
    getAddresses: () => getAddresses(client),
    getNetworkId: () => getNetworkId(client),
    getPermissions: () => getPermissions(client),
    requestAddresses: () => requestAddresses(client),
    requestPermissions: (args) => requestPermissions(client, args),
    switchChain: (args) => switchChain(client, args),
  }
}
