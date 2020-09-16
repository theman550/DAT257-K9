module.exports = {
    env: {
        browser: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 10,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'linebreak-style': 0,
        // Indent with 4 spaces
        indent: ['error', 4],

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],

        "import/no-named-as-default-member": 0,

        "import/no-named-as-default": 0,

        "parser": 0
    },
};
