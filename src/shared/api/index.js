import API from 'shared/utils/api';
import localStorageConnector from './connectors/localConnector';
import tmdbConnector from './connectors/tmdbConnector';
import tvshowResource from './resources/tvshow';
import genreResource from './resources/genre';
import configurationResource from './resources/configuration';

const api = new API({
  tv: {
    routes: {
      ':id': {
        resource: tvshowResource,
        methods: { get: {} },
      },
    },
  },
  shows: {
    routes: {
      scores: {
        connector: localStorageConnector,
        resource: tvshowResource,
        methods: { post: {}, get: {} },
      },
    },
  },
  discover: {
    routes: {
      tv: {
        resource: tvshowResource,
        methods: {
          get: { extractDataForNormalization: ({ results }) => results, paginated: true },
        },
      },
    },
  },
  configuration: {
    resource: configurationResource,
    methods: {
      get: {
        extractDataForNormalization: res => ({ id: 'main', ...res }),
      },
    },
  },
  search: {
    routes: {
      tv: {
        resource: tvshowResource,
        methods: {
          get: {
            paginated: true,
            extractDataForNormalization: ({ results }) => results,
          },
        },
      },
    },
  },
  genre: {
    routes: {
      tv: {
        routes: {
          list: {
            resource: genreResource,
            methods: {
              get: { extractDataForNormalization: ({ genres }) => genres },
            },
          },
        },
      },
    },
  },
}, tmdbConnector);

window.api = api;

export default api;
