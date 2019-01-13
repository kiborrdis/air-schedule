const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'), // string
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
    new CopyWebpackPlugin([
      {
        from: './node_modules/@blueprintjs/core/lib/css/blueprint.css',
        to: path.resolve(__dirname, 'dist', 'assets'),
      },
      {
        from: './node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css',
        to: path.resolve(__dirname, 'dist', 'assets'),
      },
      {
        from: './node_modules/normalize.css/normalize.css',
        to: path.resolve(__dirname, 'dist', 'assets'),
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      root: '/home/lightwave/Projects/air-schedule',
    }),
    new webpack.DefinePlugin({
      ...Object.keys(envVariables.parsed).reduce((memo, key) => {
        memo[key] = JSON.stringify(envVariables.parsed[key]);

        return {
          ...memo,
        };
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
