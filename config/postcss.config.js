module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-properties': true,
      },
      preserve: false,
      importFrom: [
        'config/cssVariables.css',
      ],
    },
  },
};
