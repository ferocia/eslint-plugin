const {RuleTester} = require('eslint');
const config = require('../.eslintrc.json');
const rule = require('./prefer-nullable');

const ruleTester = new RuleTester({
  parser: require.resolve(config.parser),
  parserOptions: config.parserOptions,
});

ruleTester.run('prefer-nullable', rule, {
  valid: [
    `type X = Foo | undefined`,
    `type X = Foo | null`,
    `type X = Foo | null | undefined | string`,
    `type X = Nullable<Foo | undefined | null>`,
  ],
  invalid: [
    {
      code: `type X = Foo | null | undefined`,
      errors: [{messageId: 'preferNullable', data: {name: 'Foo'}}],
      output: 'type X = Nullable<Foo>',
    },
    {
      code: `type X = null | Foo | undefined`,
      errors: [{messageId: 'preferNullable', data: {name: 'Foo'}}],
      output: `type X = Nullable<Foo>`,
    },
    {
      code: `type X = Foo | undefined | null`,
      errors: [{messageId: 'preferNullable', data: {name: 'Foo'}}],
      output: 'type X = Nullable<Foo>',
    },
    {
      code: `type X = ((arg: string) => void) | undefined | null`,
      errors: [
        {messageId: 'preferNullable', data: {name: '(arg: string) => void'}},
      ],
      output: 'type X = Nullable<(arg: string) => void>',
    },
  ],
});
