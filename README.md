# `@ferocia/eslint-plugin`

> Shareable ESLint Rules

## Install

```bash
yarn add --dev ferocia/eslint-plugin#GIT_COMMIT_HASH
```

## Configure

In your ESLint config file...

```js
rules: {
  // Enforce `Readonly<{...}>` over `{readonly ...}` when there are multiple props.
  '@ferocia/prefer-generic-readonly': 'error',

  // Enforce use of smart-quotes.
  '@ferocia/prefer-special-apostrophe': 'error',

  // Enforce `Nullable<X>` over `X | null | undefined`.
  // requires adding `declare type Nullable<T> = T | null | undefined`
  // to your `global.d.ts`.
  '@ferocia/prefer-nullable': 'error',
}
```
