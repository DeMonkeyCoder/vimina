import type { ErrorType } from '../errors/utils.js'
import type { Account, Address, ParseAccount } from '../types/account.js'
import type { Chain } from '../types/chain.js'
import type { PublicRpcSchema, RpcSchema } from '../types/jsApiStandard.js'
import type { Prettify } from '../types/utils.js'
import {
  type Client,
  type ClientConfig,
  type CreateClientErrorType,
  createClient,
} from './createClient.js'
import { type PublicActions, publicActions } from './decorators/public.js'
import type { Transport } from './transports/createTransport.js'

export type PublicClientConfig<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Pick<
    ClientConfig<transport, chain, accountOrAddress, rpcSchema>,
    | 'batch'
    | 'cacheTime'
    | 'chain'
    | 'key'
    | 'name'
    | 'pollingInterval'
    | 'rpcSchema'
    | 'transport'
  >
>

export type PublicClient<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  accountOrAddress extends Account | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = Prettify<
  Client<
    transport,
    chain,
    accountOrAddress,
    rpcSchema extends RpcSchema
      ? [...PublicRpcSchema, ...rpcSchema]
      : PublicRpcSchema,
    PublicActions<transport, chain>
  >
>

export type CreatePublicClientErrorType = CreateClientErrorType | ErrorType

export function createPublicClient<
  transport extends Transport,
  chain extends Chain | undefined = undefined,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  parameters: PublicClientConfig<transport, chain, accountOrAddress, rpcSchema>,
): PublicClient<transport, chain, ParseAccount<accountOrAddress>, rpcSchema> {
  const { key = 'public', name = 'Public Client' } = parameters
  const client = createClient({
    ...parameters,
    key,
    name,
    type: 'publicClient',
  })
  return client.extend(publicActions) as any
}
