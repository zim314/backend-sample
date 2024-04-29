module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts'],
            },
        },
    },
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
        "semi": [2, "always"],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};
