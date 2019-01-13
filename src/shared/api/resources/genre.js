import { schema } from 'normalizr';
import APIResource from '../../utils/api/ApiResource';

export default new APIResource(new schema.Entity('genre'));
