import { Ref } from 'vue';

export const POOLS_ROOT_KEY = 'pools';
export const BALANCES_ROOT_KEY = 'accountBalances';

const QUERY_KEYS = {
  Pools: {
    All: (tokens: Ref<string[]>) => [POOLS_ROOT_KEY, 'all', { tokens }],
    User: (account: Ref<string>) => [POOLS_ROOT_KEY, 'user', { account }],
    Current: (id: string) => [POOLS_ROOT_KEY, 'current', { id }],
    Snapshot: (id: string) => [POOLS_ROOT_KEY, 'snapshot', { id }],
    Activities: (id: string) => [POOLS_ROOT_KEY, 'activities', 'all', { id }],
    UserActivities: (id: string, account: Ref<string>) => [
      POOLS_ROOT_KEY,
      'activities',
      'user',
      { account, id }
    ]
  },
  Balances: {
    All: (account: Ref<string>, userNetwork: Ref<unknown>) => [
      BALANCES_ROOT_KEY,
      { userNetwork, account }
    ]
  },
  TokenLists: ['tokenLists']
};

export default QUERY_KEYS;
