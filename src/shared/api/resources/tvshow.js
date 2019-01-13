import { schema } from 'normalizr';
import APIResource from '../../utils/api/ApiResource';

function processStrategy(value) {
  return {
    score: 0,
    ...value,
  };
}

export default new APIResource(new schema.Entity('tvshow', {}, {
  processStrategy,
}));
