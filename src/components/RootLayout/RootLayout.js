import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../NavigationBar';

const RootLayout = ({ children }) => (
  <div>
    <NavigationBar />
    {children}
  </div>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
