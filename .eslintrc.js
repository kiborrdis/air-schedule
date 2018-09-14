module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
      "browser": true,
  },

  "plugins": [
    "babel"
  ],

  "rules": {
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
    "babel/semi": 1,

  },

  "settings": {
    "import/resolver": {
      "webpack": {
         "config": "./config/webpack.config.js"
      }
    }
  }
}