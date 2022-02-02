module.exports = {
  meta: {
    messages: {
      preferGenericReadonly:
        'Prefer `Readonly<{x: any}>` over `{readonly x: any}`.',
    },
    fixable: true,
  },
  create(context) {
    const report = node => {
      context.report({
        node,
        messageId: 'preferGenericReadonly',
        *fix(fixer) {
          yield fixer.insertTextBefore(node, 'Readonly<');
          yield fixer.insertTextAfter(node, '>');

          for (const member of node.members) {
            yield fixer.removeRange([
              member.range[0],
              member.range[0] + 'readonly '.length,
            ]);
          }
        },
      });
    };
    return {
      TSTypeLiteral(node) {
        if (
          node.members.length > 1 &&
          node.members.every(
            member =>
              member.type === 'TSPropertySignature' && member.readonly === true,
          )
        ) {
          if (
            node.parent?.type === 'TSTypeParameterInstantiation' &&
            node.parent.parent?.type === 'TSTypeReference' &&
            node.parent.parent.typeName?.name === 'Readonly'
          ) {
            return;
          }
          report(node);
        }
      },
    };
  },
};
