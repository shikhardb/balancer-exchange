import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumberish } from '@ethersproject/bignumber';

const JOIN_WEIGHTED_POOL_INIT_TAG = 0;
const JOIN_WEIGHTED_POOL_EXACT_TOKENS_IN_FOR_BPT_OUT_TAG = 1;

export type JoinWeightedPoolInit = {
  kind: 'Init';
  amountsIn: BigNumberish[];
};

export type JoinWeightedPoolExactTokensInForBPTOut = {
  kind: 'ExactTokensInForBPTOut';
  amountsIn: BigNumberish[];
  minimumBPT: BigNumberish;
};

export function encodeJoinWeightedPool(
  joinData: JoinWeightedPoolInit | JoinWeightedPoolExactTokensInForBPTOut
): string {
  if (joinData.kind == 'Init') {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256[]'],
      [JOIN_WEIGHTED_POOL_INIT_TAG, joinData.amountsIn]
    );
  } else {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256[]', 'uint256'],
      [
        JOIN_WEIGHTED_POOL_EXACT_TOKENS_IN_FOR_BPT_OUT_TAG,
        joinData.amountsIn,
        joinData.minimumBPT
      ]
    );
  }
}

const EXIT_WEIGHTED_POOL_EXACT_BPT_IN_FOR_ONE_TOKEN_OUT_TAG = 0;
const EXIT_WEIGHTED_POOL_EXACT_BPT_IN_FOR_ALL_TOKENS_OUT_TAG = 1;
const EXIT_WEIGHTED_POOL_BPT_IN_FOR_EXACT_TOKENS_OUT_TAG = 2;

export type ExitWeightedPoolExactBPTInForOneTokenOut = {
  kind: 'ExactBPTInForOneTokenOut';
  bptAmountIn: BigNumberish;
  exitTokenIndex: number;
};

export type ExitWeightedPoolExactBPTInForAllTokensOut = {
  kind: 'ExactBPTInForAllTokensOut';
  bptAmountIn: BigNumberish;
};

export type ExitWeightedPoolBPTInForExactTokensOut = {
  kind: 'BPTInForExactTokensOut';
  amountsOut: BigNumberish[];
  maxBPTAmountIn: BigNumberish;
};

export function encodeExitWeightedPool(
  exitData:
    | ExitWeightedPoolExactBPTInForOneTokenOut
    | ExitWeightedPoolExactBPTInForAllTokensOut
    | ExitWeightedPoolBPTInForExactTokensOut
): string {
  if (exitData.kind == 'ExactBPTInForOneTokenOut') {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256', 'uint256'],
      [
        EXIT_WEIGHTED_POOL_EXACT_BPT_IN_FOR_ONE_TOKEN_OUT_TAG,
        exitData.bptAmountIn,
        exitData.exitTokenIndex
      ]
    );
  } else if (exitData.kind == 'ExactBPTInForAllTokensOut') {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256'],
      [
        EXIT_WEIGHTED_POOL_EXACT_BPT_IN_FOR_ALL_TOKENS_OUT_TAG,
        exitData.bptAmountIn
      ]
    );
  } else {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256[]', 'uint256'],
      [
        EXIT_WEIGHTED_POOL_BPT_IN_FOR_EXACT_TOKENS_OUT_TAG,
        exitData.amountsOut,
        exitData.maxBPTAmountIn
      ]
    );
  }
}
