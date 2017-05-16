module.exports = {
  "extends": [
    "eslint:recommended", "plugin:react/recommended", "plugin:flowtype/recommended"
  ],
  "plugins": [
    "standard", "promise", "react", "flowtype"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": [
      "warn", "never"
    ],
    "react/jsx-filename-extension": [
      0, "never"
    ],
    "react/no-array-index-key": [
      0, "never"
    ],
    "react/no-unused-prop-types": [0, "never"]
  }
};
