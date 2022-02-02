module.exports = {
  meta: {
    messages: {
      preferNullable: 'Prefer `Nullable<{{name}}>` over `{{name}} | null | undefined`.',
    },
    fixable: true,
  },
  create(context) {
    const report = node => {
      const source = context.getSourceCode();
      const type = source.getText(
        node.types.find(({type}) => type !== 'TSNullKeyword' && type !== 'TSUndefinedKeyword')
      );

      context.report({
        node,
        messageId: 'preferNullable',
        data: {name: type},
        *fix(fixer) {
          yield fixer.replaceText(node, `Nullable<${type}>`);
        },
      });
    };
    return {
      TSUnionType(node) {
        const components = node.types.map(({type}) => type);
        if (
          components.length === 3 &&
          components.some(type => type === 'TSNullKeyword') &&
          components.some(type => type === 'TSUndefinedKeyword')
        ) {
          if (
            node.parent?.type === 'TSTypeParameterInstantiation' &&
            node.parent.parent?.type === 'TSTypeReference' &&
            node.parent.parent.typeName?.name === 'Nullable'
          ) {
            return;
          }
          report(node);
        }
      },
    };
  },
};
