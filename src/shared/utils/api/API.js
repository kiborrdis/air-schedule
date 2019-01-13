/* eslint-disable no-underscore-dangle */

import { createGetMethod, createPostMethod } from './methodCreators';

function getResourcesFromApiConfig(apiConfig, memo = {}) {
  const routesKeys = Object.keys(apiConfig);

  routesKeys.forEach((key) => {
    const { resource, routes: localRoutes } = apiConfig[key];

    if (resource && !memo[resource.name]) {
      memo[resource.name] = resource;
    }

    if (localRoutes) {
      getResourcesFromApiConfig(localRoutes, memo);
    }
  });

  return memo;
}

export default class API {
  constructor(config, rootConnector) {
    this._rootConnector = rootConnector;
    this._config = config;
    this._resources = getResourcesFromApiConfig(config);
    this.buildInterfaceFromConfig('', config, this, this._rootConnector);
  }

  buildInterfaceFromConfig(path, config, interfaceRoot, currentConnector) {
    if (!config) {
      return;
    }


    Object.keys(config).forEach((name) => {
      const {
        methods, connector: localConnector, resource, routes,
      } = config[name];
      const connector = localConnector || currentConnector;
      const lastPathPart = name[0] === ':' ? name.slice(1) : name;
      const localPath = `${path}${path !== '' ? '/' : ''}${name}`;

      interfaceRoot[lastPathPart] = {};

      if (resource && methods && methods.get) {
        interfaceRoot[lastPathPart].get = createGetMethod(
          localPath,
          connector,
          resource,
          methods.get,
        );
        interfaceRoot[lastPathPart].get.resourceName = resource.name;

        if (methods.get.paginated) {
          interfaceRoot[lastPathPart].get.paginated = true;
        }
      }

      if (resource && methods && methods.post) {
        interfaceRoot[lastPathPart].post = createPostMethod(
          localPath,
          connector,
          resource,
          methods.post,
        );
        interfaceRoot[lastPathPart].post.resourceName = resource.name;
      }

      this.buildInterfaceFromConfig(localPath, routes, interfaceRoot[name], connector);
    });
  }

  get config() {
    return this._config;
  }

  get resources() {
    return this._resources;
  }
}
