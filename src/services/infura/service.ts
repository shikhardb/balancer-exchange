import { WebSocketProvider } from '@ethersproject/providers';

const INFURA_PROJECT_ID = process.env.VUE_APP_INFURA_PROJECT_ID;
const NETWORK = process.env.VUE_APP_NETWORK || '1';

const networkMap: Record<string, string> = {
  '1': 'mainnet',
  '42': 'kovan',
  '137': 'matic'
};

type NewBlockHandler = (blockNumber: number) => void;

export default class Service {
  network: string;
  wsProvider: WebSocketProvider;

  constructor() {
    if (!INFURA_PROJECT_ID) throw new Error('Infura project ID missing!');

    this.network = networkMap[NETWORK];
    this.wsProvider = new WebSocketProvider(
      `wss://rpc-mainnet.maticvigil.com/ws/v1/c9fa2322d8972ddeee326fcb1007e9c409753ebb`
    );
  }

  public initBlockListener(newBlockHandler: NewBlockHandler): void {
    this.wsProvider.on('block', newBlockNumber =>
      newBlockHandler(newBlockNumber)
    );
  }

  public async getBlockNumber(): Promise<number> {
    return await this.wsProvider.getBlockNumber();
  }
}
