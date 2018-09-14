const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const envVariables = require('dotenv').config();

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      shared: path.resolve('./src/shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            imports: true,
            localIdentName: '[name]__[local]_[hash:base64:4]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './config',
            },
          },
        },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      ...Object.keys(envVariables.parsed).reduce((memo, key) => {
        memo[key] = JSON.stringify(envVariables.parsed[key]);

        return memo;
      }, {}),
    }),
  ],
};

module.exports.serve = {
  content: [__dirname],
  add: (app) => {
    app.use(convert(history({})));
  },
};
