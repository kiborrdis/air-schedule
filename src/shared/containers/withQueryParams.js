/* eslint-disable class-methods-use-this */

import React from 'react';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';
import qs from 'qs';

const withQueryParams = (Component) => {
  class WithQueryParams extends React.Component {
    getQueryParams() {
      const { location: { search } } = this.props;

      return this.parseQueryParams(search);
    }

    // TODO use memoize
    parseQueryParams(search) {
      return qs.parse(search.slice(1));
    }

    updateQueryParams = (newParams) => {
      const { location: { pathname }, history } = this.props;
      const updatedParams = {
        ...this.getQueryParams(),
        ...newParams,
      };

      history.push({ pathname, search: qs.stringify(updatedParams) });
    };

    collectChildComponentProps() {
      return {
        ...omit(this.props, ['location', 'match', 'history']),
        queryParams: this.getQueryParams(),
        updateQueryParams: this.updateQueryParams,
      };
    }

    render() {
      return <Component {...this.collectChildComponentProps()} />;
    }
  }

  return withRouter(WithQueryParams);
};

export default withQueryParams;
