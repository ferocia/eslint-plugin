const findBadQuotes = text => {
  // this is literally the rule we're running in
  if (!text.includes("'")) {
    return [];
  }
  if ((text.match(/'/g) || []).length === 1) {
    return [text.indexOf("'")];
  }

  const matches = [...text.matchAll(/\w'/g)].map(m => m.index + 1);
  const spaced = [...text.matchAll(/ '.*?'[, ]/g)].map(
    m => m.index + m[0].length - 2,
  );
  const starting = [...text.matchAll(/^'.*?'[, ]/g)].map(
    m => m.index + m[0].length - 2,
  );
  const ending = [...text.matchAll(/ '.*?'$/g)].map(
    m => m.index + m[0].length - 1,
  );
  const ignorable = [...spaced, ...starting, ...ending];

  return matches.filter(m => !ignorable.includes(m));
};

module.exports = {
  meta: {
    messages: {
      preferSpecial: "Prefer `’` over `'` for apostrophes.",
    },
    fixable: true,
  },
  create(context) {
    const report = (node, matches) => {
      context.report({
        node,
        messageId: 'preferSpecial',
        fix(fixer) {
          return matches.map(m =>
            fixer.replaceTextRange(
              [node.range[0] + m, node.range[0] + m + 1],
              '’',
            ),
          );
        },
      });
    };
    return {
      Literal(node) {
        const value = node.value;
        if (typeof value !== 'string') {
          return;
        }
        const matches = findBadQuotes(value);
        if (matches.length === 0) return;
        const jsxOffset = node.parent.type === 'JSXElement' ? 0 : 1;
        report(
          node,
          matches.map(m => m + jsxOffset),
        );
      },
      TemplateLiteral(node) {
        // not worth failing a build over something in a GQL literal
        if (node.parent.tag && node.parent.tag.name === 'graphql') return;
        node.quasis
          .map(q => ({
            quasi: q,
            matches: findBadQuotes(q.value.raw),
          }))
          .filter(v => v.matches.length > 0)
          .map((v, i, array) => {
            if (!v.matches.includes(0)) {
              // if the matches don't contain a "'" at the start, ignore
              return v;
            }

            if (i === 0) {
              // if this is the first or last in the list, it can't be quotes
              // around an expression - ignore
              return v;
            }

            const prev = array[i - 1];
            const rawLength = prev.quasi.value.raw.length;

            if (prev.matches.includes(rawLength - 1)) {
              // there was an apostrophe at the end of the previous quasi - we
              // don't want to match this or that so remove both
              prev.matches = prev.matches.filter(x => x !== rawLength - 1);
              return {...v, matches: v.matches.filter(x => x !== 0)};
            }

            return v;
          })
          .filter(v => v.matches.length > 0)
          .forEach(({quasi, matches}) =>
            report(
              quasi,
              matches.map(m => m + 1),
            ),
          );
      },
    };
  },
};
