import Service from '../../service';
import poolQueryBuilder from './query';
import { PoolSnapshots, PoolSnapshot, QueryBuilder } from '../../types';

const DAY = 60 * 60 * 24;

export default class PoolShares {
  service: Service;
  query: QueryBuilder;

  constructor(service: Service, query: QueryBuilder = poolQueryBuilder) {
    this.service = service;
    this.query = query;
  }

  public async get(
    poolId: string,
    days: number,
    args = {},
    attrs = {}
  ): Promise<PoolSnapshots> {
    const currentTimestamp = Math.ceil(Date.now() / 1000);
    const dayTimestamp = currentTimestamp - (currentTimestamp % DAY);
    const timestamps: number[] = [];
    for (let i = 0; i < days; i++) {
      timestamps.push(dayTimestamp - i * DAY);
    }
    attrs = { ...attrs, __aliasFor: 'poolSnapshot' };
    const query = Object.fromEntries(
      timestamps.map(timestamp => {
        const timestampArgs = { ...args, id: `${poolId}-${timestamp}` };
        const timestampFragment = this.query(timestampArgs, attrs).poolSnapshot;
        return [`_${timestamp}`, timestampFragment];
      })
    );
    const data = await this.service.client.get(query);
    return this.serialize(data);
  }

  private serialize(snapshotData: Record<string, PoolSnapshot>): PoolSnapshots {
    return Object.fromEntries(
      Object.entries(snapshotData)
        .map(entry => {
          const [id, data] = entry;
          const timestamp = parseInt(id.substr(1));
          if (!data) {
            return [timestamp, null];
          }
          const { amounts, totalShares, swapVolume, swapFees } = data;
          return [
            timestamp * 1000,
            { timestamp, amounts, totalShares, swapVolume, swapFees }
          ];
        })
        .filter(entry => !!entry[1])
    );
  }
}
