module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
      "browser": true,
  },

  "plugins": [
    "babel"
  ],

  "globals": {
    "TVMAZE_API_ROOT_URL": false,
    "TMDB_API_ROOT_URL": false,
    "TMDB_API_TOKEN": false,
    "REDUX_ACTIONS_PREFIX": false,
  },

  "rules": {
    "no-param-reassign": "off",
    "react/jsx-filename-extension": "off",
    "react/sort-comp": "off",
    "babel/semi": 1,
    "react/require-default-props": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "camelcase": "off",
    "no-use-before-define": "off",
  },

  "settings": {
    "import/resolver": {
      "webpack": {
         "config": "./config/webpack.config.js"
      }
    }
  }
}

