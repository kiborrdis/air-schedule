import React from 'react';
import { connect } from 'react-redux';
import {
  getRequestStatus, getRequestId, resources as apiResources,
} from 'shared/modules/resources';
import { denormalize } from 'normalizr';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { createSelector } from 'reselect';

const createResourceByKeySelector = key => state => state.resources[key];
const getResultByRequestId = ({ requests }, { requestId }) => {
  let result = null;

  if (requests.result[requestId]) {
    ({ result } = requests.result[requestId]);
  }

  return result;
};

const makeGetListData = dependencies => createSelector(
  [getResultByRequestId, ...dependencies.map(key => createResourceByKeySelector(key))],
  (result, ...resourceEntities) => {
    const dataForDenormalization = dependencies.reduce(
      (memo, key, index) => ({ ...memo, [key]: resourceEntities[index] }),
      {},
    );
    const resourceDescriptor = apiResources[dependencies[0]];

    return denormalize(
      result,
      Array.isArray(result) ? [resourceDescriptor.entity] : resourceDescriptor.entity,
      dataForDenormalization,
    );
  },
);

function isObjectsEqual(objA, objB, { keysToIgnore = [], keysToDeepCompare = [] } = {}) {
  if (!objA || !objB) {
    return objA === objB;
  }

  const keys = [...(new Set(Object.keys(objA).concat(Object.keys(objB))))];

  return keys.every((key) => {
    if (keysToIgnore.includes(key)) {
      return true;
    }

    if (keysToDeepCompare.includes(key)) {
      return isEqual(objA[key], objB[key]);
    }

    return objA[key] === objB[key];
  });
}

class MemoizedResource {
  constructor() {
    this.prevReturnedResource = {};
    this.prevSelectedResource = null;
  }

  get resource() {
    return this.prevReturnedResource;
  }

  memoizeResource(selectedResource) {
    if (this.prevSelectedResource === selectedResource) {
      return this.prevReturnedResource;
    }

    let newResourceToReturn = {};

    if (!this.prevSelectedResource || selectedResource.fulfilled) {
      newResourceToReturn = pick(selectedResource, ['data', 'fulfilled', 'loading', 'id']);
    } else {
      newResourceToReturn.fulfilled = this.prevReturnedResource.fulfilled;
      newResourceToReturn.loading = selectedResource.loading;
      newResourceToReturn.data = this.prevReturnedResource.data;
    }

    this.prevSelectedResource = selectedResource;
    this.prevReturnedResource = newResourceToReturn;

    return newResourceToReturn;
  }
}


// TODO rename all this mess with resources var names
const resourceContainer = (resourcesDefinitions, { throttleInterval = 0 } = {}) => (Component) => {
  const createResourceSelector = (resourceDefinition) => {
    const {
      makeActionFromProps,
      options: {
        denormalizeWithDependencies = true,
      } = {},
    } = resourceDefinition;

    const action = makeActionFromProps({});

    const { dependencies } = apiResources[action.meta.resourceName];

    return makeGetListData(denormalizeWithDependencies ? dependencies : [action.meta.resourceName]);
  };

  class ResourceContainer extends React.Component {
    constructor(props) {
      super(props);

      const resourceKeys = Object.keys(resourcesDefinitions);

      this.resources = resourceKeys.reduce(
        (memo, key) => ({ ...memo, [key]: new MemoizedResource() }),
        {},
      );

      this.resourceUpdaters = resourceKeys.reduce((
        memo, key,
      ) => ({ ...memo, [key]: this.createResourceUpdater(key) }),
      {});
    }

    componentDidMount() {
      this.dispatchResourceActionsIfNeeded();
    }

    componentDidUpdate() {
      this.dispatchResourceActionsIfNeeded();
    }

    shouldComponentUpdate({ resources: nextResources, ...restNextProps }) {
      const { resources, ...restProps } = this.props;

      const oldChildResources = this.getChildResources(nextResources, true);
      const newChildResources = this.getChildResources(nextResources);

      const resourcesEqual = Object.keys(nextResources).every(
        key => isObjectsEqual(oldChildResources[key], newChildResources[key]),
      );

      const result = !resourcesEqual || !isObjectsEqual(restProps, restNextProps);


      return result;
    }

    createResourceUpdater = key => () => {
      const { dispatch, resources } = this.props;

      dispatch(resources[key].action);
    };

    dispatchResourceActionsIfNeeded = debounce(() => {
      const { resources, dispatch } = this.props;

      const actionsToDispatch = Object.keys(resources).reduce((memo, key) => {
        if (!resources[key].loadedAt && !resources[key].loading) {
          memo.push(resources[key].action);
        }

        return memo;
      }, []);

      actionsToDispatch.forEach((action) => {
        dispatch(action);
      });
    }, throttleInterval, { leading: true });

    // TODO fix this fucked up method
    getChildResources(resources, old = false) {
      return Object.keys(resources).reduce((memo, key) => {
        let childResource;

        if (old) {
          childResource = this.resources[key].resource;
        } else {
          childResource = this.resources[key].memoizeResource(resources[key]);
        }

        memo[key] = { ...childResource, update: this.resourceUpdaters[key] };

        return memo;
      }, {});
    }

    collectChildComponentProps() {
      const { resources, dispatch: _, ...restProps } = this.props;
      const childResources = this.getChildResources(resources);

      return {
        ...restProps,
        resources: childResources,
      };
    }

    render() {
      return <Component {...this.collectChildComponentProps()} />;
    }
  }

  const mapStateToProps = () => {
    const resourceSelectors = Object.keys(resourcesDefinitions).reduce(
      (memo, resourceDefinitionKey) => {
        memo[resourceDefinitionKey] = createResourceSelector(
          resourcesDefinitions[resourceDefinitionKey],
        );

        return memo;
      },
      {},
    );

    return (state, props) => {
      const selectedResources = Object.keys(resourcesDefinitions).reduce((memo, key) => {
        const resourceAction = resourcesDefinitions[key].makeActionFromProps(props);
        const requestId = getRequestId(resourceAction);

        memo[key] = {
          id: requestId,
          ...getRequestStatus(state.requests, resourceAction),
          action: resourceAction,
        };

        if (memo[key].fulfilled) {
          memo[key].data = resourceSelectors[key](state, { requestId });
        }

        return memo;
      }, {});

      return { resources: selectedResources };
    };
  };

  const mapDispatchToProps = dispatch => ({ dispatch });

  return connect(mapStateToProps, mapDispatchToProps)(ResourceContainer);
};

export default resourceContainer;
