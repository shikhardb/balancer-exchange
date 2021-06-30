import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getInstance } from '@snapshot-labs/lock/plugins/vue3';
import configs from '@/lib/config';
import { callStatic, sendTransaction } from '@/lib/utils/balancer/web3';
import { default as vaultAbi } from '@/lib/abi/Vault.json';
import { default as helpersAbi } from '@/lib/abi/BalancerHelpers.json';
import { TokenMap } from '@/types';
import JoinParams from './serializers/JoinParams';
import ExitParams from './serializers/ExitParams';
import { FullPool } from '@/services/balancer/subgraph/types';

export default class Exchange {
  pool: FullPool;
  network: string;
  vaultAddress: string;
  helpersAddress: string;
  tokens: TokenMap;

  constructor(pool: FullPool, network: string, tokens: TokenMap) {
    this.pool = pool;
    this.network = network;
    this.tokens = tokens;
    this.vaultAddress = configs[network].addresses.vault;
    this.helpersAddress = configs[network].addresses.balancerHelpers;
  }

  public async queryJoin(account: string, amountsIn: string[], bptOut = '0') {
    const txParams = this.joinParams.serialize(account, amountsIn, bptOut);

    return await callStatic(
      this.provider,
      this.helpersAddress,
      helpersAbi,
      'queryJoin',
      txParams
    );
  }

  public async join(
    account: string,
    amountsIn: string[],
    bptOut = '0'
  ): Promise<TransactionResponse> {
    const txParams = this.joinParams.serialize(account, amountsIn, bptOut);

    return await sendTransaction(
      this.provider,
      this.vaultAddress,
      vaultAbi,
      'joinPool',
      txParams
    );
  }

  public async queryExit(
    account: string,
    amountsOut: string[],
    bptIn: string,
    exitTokenIndex: number | null,
    exactOut: boolean
  ) {
    const txParams = this.exitParams.serialize(
      account,
      amountsOut,
      bptIn,
      exitTokenIndex,
      exactOut
    );

    return await callStatic(
      this.provider,
      this.helpersAddress,
      helpersAbi,
      'queryExit',
      txParams
    );
  }

  public async exit(
    account: string,
    amountsOut: string[],
    bptIn: string,
    exitTokenIndex: number | null,
    exactOut: boolean
  ): Promise<TransactionResponse> {
    const txParams = this.exitParams.serialize(
      account,
      amountsOut,
      bptIn,
      exitTokenIndex,
      exactOut
    );

    return await sendTransaction(
      this.provider,
      this.vaultAddress,
      vaultAbi,
      'exitPool',
      txParams
    );
  }

  public get provider() {
    const { web3 } = getInstance();
    return web3;
  }

  private get joinParams() {
    return new JoinParams(this);
  }

  private get exitParams() {
    return new ExitParams(this);
  }
}
