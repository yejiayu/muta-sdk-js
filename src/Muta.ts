import { SyncAccount } from './account';
import {
  DEFAULT_CONSENSUS_INTERVAL,
  DEFAULT_TIMEOUT_GAP
} from './core/constant';
import { Client } from './index';
import { HDWallet } from './wallet';

interface MutaContext {
  /**
   * for more information about ChainID proposal,
   * look at [eip155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md)
   */
  chainId: string;
  /**
   * a [GraplQL](https://graphql.org/) endpoint of remote node, ie. http://127.0.0.1:8000/graphql
   */
  endpoint: string;
  /**
   * defaults to 20. {@link DEFAULT_TIMEOUT_GAP}
   */
  timeoutGap?: number;
}

/**
 * Main module of the SDK
 */
export class Muta {
  private readonly context: MutaContext;
  private readonly rpcClient: Client;

  constructor(context: MutaContext) {
    this.context = {
      chainId: context.chainId,
      endpoint: context.endpoint,
      timeoutGap: DEFAULT_TIMEOUT_GAP
    };

    const { endpoint, chainId } = this.context;
    this.rpcClient = new Client({
      chainId,
      entry: endpoint,
      maxTimeout: DEFAULT_TIMEOUT_GAP * DEFAULT_CONSENSUS_INTERVAL
    });
  }

  get client(): Client {
    return this.rpcClient;
  }

  /**
   * create a account from private key
   * @param privateKey
   */
  public accountFromPrivateKey(privateKey: string): SyncAccount {
    return SyncAccount.fromPrivateKey(privateKey);
  }

  /**
   * create a HD wallet from mnemonic. Now Muta positioning for a block chain framework,
   * so the wallet seems to be not a must
   * @deprecated
   * @param mnemonic 12 mnemonic words
   */
  public hdWalletFromMnemonic(mnemonic: string): HDWallet {
    return HDWallet.fromMnemonic(mnemonic);
  }
}
