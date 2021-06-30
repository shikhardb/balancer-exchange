import { merge } from 'lodash';

const defaultAttrs = {
  pool: {
    id: true
  },
  timestamp: true,
  amounts: true,
  totalShares: true,
  swapVolume: true,
  swapFees: true
};

export default (args = {}, attrs = {}) => ({
  poolSnapshot: {
    __args: args,
    ...merge({}, defaultAttrs, attrs)
  }
});
