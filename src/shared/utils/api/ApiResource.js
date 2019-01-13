/* eslint-disable no-underscore-dangle */

import { schema } from 'normalizr';

const { Entity } = schema;

function gatherEntityDependencies(obj, dependencies = []) {
  let entitySchema = obj;

  if (obj instanceof Entity) {
    if (dependencies.includes(obj._key)) {
      return dependencies;
    }

    entitySchema = obj.schema;
    dependencies.push(obj._key);
  }

  Object.keys(entitySchema).forEach((key) => {
    if (entitySchema[key] instanceof Object) {
      gatherEntityDependencies(entitySchema[key], dependencies);
    }
  });

  return dependencies;
}

export default class APIResource {
  constructor(
    entity,
  ) {
    this.name = entity._key;
    this.entity = entity;
    this.dependencies = gatherEntityDependencies(entity);
  }
}
