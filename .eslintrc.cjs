module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es2021": true,
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    "rules": {
        "object-curly-spacing": ["error", "always"],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"]
    }
};
