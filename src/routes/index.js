import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import SchedulePage from './schedule';
import SearchPage from './search';
import Show from './show';

const RootRoutes = () => (
  <React.Fragment>
    <Switch>
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/search" component={SearchPage} />
      <Redirect to="/search" />
    </Switch>

    <Route path="/" component={Show} />
  </React.Fragment>
);

export default RootRoutes;
