const {RuleTester} = require('eslint');
const config = require('../.eslintrc.json');
const rule = require('./prefer-generic-readonly');

const ruleTester = new RuleTester({
  parser: require.resolve(config.parser),
  parserOptions: config.parserOptions,
});

ruleTester.run('prefer-generic-readonly', rule, {
  valid: [
    `type X = {}`,
    `interface X { readonly foo: any; readonly bar: any }`,
    `type X = { foo: any }`,
    `type X = { readonly foo: any; bar: any }`,
    `type X = Readonly<{foo: any; bar: any}>`,
    `type X = { readonly foo: any; bar: any; }`,
    `type X = Readonly<{ readonly foo: any; readonly bar: any; }>`,
  ],
  invalid: [
    {
      code: `type X = { readonly foo: any; readonly bar: any; }`,
      errors: [{messageId: 'preferGenericReadonly'}],
      output: 'type X = Readonly<{ foo: any; bar: any; }>',
    },
    {
      code: `type X = { readonly foo: any; /* comment */ readonly bar: any; }`,
      errors: [{messageId: 'preferGenericReadonly'}],
      output: 'type X = Readonly<{ foo: any; /* comment */ bar: any; }>',
    },
  ],
});
