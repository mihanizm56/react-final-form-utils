module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:security/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['import', 'react-hooks', 'security', 'unused-imports'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false,
        printWidth: 80,
      },
    ],
    'no-implied-eval': 2,
    'jsx-a11y/media-has-caption': 'off',
    'import/prefer-default-export': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: [
          'builtin',
          'external',
          ['internal', 'unknown'],
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/forbid-dom-props': [2, { forbid: ['style'] }],
    'react/jsx-filename-extension': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './integration-tests/**/*.js',
          './server/**/*.js',
          './cli/**/*.jsx',
          './cli/**/*.js',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    'import/no-cycle': 2,
    'no-console': ['error', { allow: ['error'] }],
    quotes: ['error', 'single'],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['routeName'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'max-lines': [
      'error',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'function-paren-newline': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/default-props-match-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-wrap-multilines': [
      'error',
      { arrow: true, return: true, declaration: true },
    ],
    'react/jsx-sort-props': 2,
    'react/jsx-one-expression-per-line': 0,
    'consistent-return': 0,
    '@typescript-eslint/indent': 0, // Conflicts with Prettier
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-case-declarations': 0,
    'no-extra-boolean-cast': 0,
    'react/state-in-constructor': 0,
    'no-async-promise-executor': 0,
    'max-classes-per-file': ['error', 2],
    'class-methods-use-this': 0,
    'security/detect-child-process': 0,
    'security/detect-object-injection': 0,
    'security/detect-non-literal-regexp': 0,
    'security/detect-non-literal-fs-filename': 0,
    '@typescript-eslint/camelcase': 'off',
    camelcase: ['error', { properties: 'always' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'id-length': ['error', { min: 2, properties: 'never' }],
    'react/sort-comp': [
      2,
      {
        order: [
          'static-variables',
          'static-methods',
          'type-annotations',
          'instance-variables',
          '/^.+(r|R)efs?$/', // "instance-variables" does not work for refs vars - I made the regexp for them
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // @wildberries-codestyle
    // "wildberries-seller-codestyle/redux-modules": "error"
  },
};
