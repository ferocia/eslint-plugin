const {RuleTester} = require('eslint');
const config = require('../.eslintrc.json');
const rule = require('./prefer-special-apostrophe');

const ruleTester = new RuleTester({parserOptions: config.parserOptions});

ruleTester.run('prefer-special-apostrophe', rule, {
  valid: [
    "'Fine'",
    "'This’ll be good'",
    '`This’ll be good`',
    "`Template that’s '${a ? 'quoted' : ''}' is alright`",
    "`'${a ? 'quoted' : ''}' at start is alright`",
    "`Ending with a quote is alright '${a ? 'quoted' : ''}'`",
    `"We’re going 'to quote some text' in here, too, and 'also at the end'"`,
    `
      graphql\`
        something {
          that'd be bad
        }
      \`
    `,
  ],
  invalid: [
    {
      code: '"test\'s"',
      errors: [{messageId: 'preferSpecial'}],
      output: '"test’s"',
    },
    {
      code: "`So'll this`",
      errors: [{messageId: 'preferSpecial'}],
      output: '`So’ll this`',
    },
    {
      code: `
        <ReactComponent textProp="bad apos'trophe" />
      `,
      errors: [{messageId: 'preferSpecial'}],
      output: `
        <ReactComponent textProp="bad apos’trophe" />
      `,
    },
    {
      code: "`This one'll have a ${variable} inside`",
      errors: [{messageId: 'preferSpecial'}],
      output: '`This one’ll have a ${variable} inside`',
    },
    {
      code: '`This one will have a ${ternary ? "fir\'st" : "secon\'d"} inside`',
      errors: [{messageId: 'preferSpecial'}, {messageId: 'preferSpecial'}],
      output: '`This one will have a ${ternary ? "fir’st" : "secon’d"} inside`',
    },
    {
      code: "`An apostrophe on a ${variable}'s name`",
      errors: [{messageId: 'preferSpecial'}],
      output: '`An apostrophe on a ${variable}’s name`',
    },
    {
      code: `"If there are Tess' and James' they should not be ignored"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"If there are Tess’ and James’ they should not be ignored"`,
    },
    {
      code: `"If there are Tess' and James', they should not be ignored"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"If there are Tess’ and James’, they should not be ignored"`,
    },
    {
      code: `"James' should not be ignored"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"James’ should not be ignored"`,
    },
    {
      code: `"We're going 'to quote some text' in here, too, and 'also at the end'"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"We’re going 'to quote some text' in here, too, and 'also at the end'"`,
    },
    {
      code: `"This'll have a 'combo' of good and le’ss good"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"This’ll have a 'combo' of good and le’ss good"`,
    },
    {
      code: `
        wrongTag\`
          something {
            that'd be bad
          }
        \`
      `,
      errors: [{messageId: 'preferSpecial'}],
      output: `
        wrongTag\`
          something {
            that’d be bad
          }
        \`
      `,
    },
    {
      code: `"'Quote to start', with I'm bad, 'to quote some text' in here, and 'another quote here' too, and 'also at the end'"`,
      errors: [{messageId: 'preferSpecial'}],
      output: `"'Quote to start', with I’m bad, 'to quote some text' in here, and 'another quote here' too, and 'also at the end'"`,
    },
  ],
});
