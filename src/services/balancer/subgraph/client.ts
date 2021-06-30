import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

const NETWORK = process.env.VUE_APP_NETWORK || '1';
export const urlMap = {
  '137': 'https://api.thegraph.com/subgraphs/name/sameepsi/wazirx'
};

export default class Client {
  url: string;

  constructor() {
    this.url = urlMap[NETWORK];
  }

  public async get(query) {
    try {
      const payload = this.toPayload(query);
      const {
        data: { data }
      } = await axios.post(this.url, payload);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public toPayload(query) {
    return JSON.stringify({ query: jsonToGraphQLQuery({ query }) });
  }
}
