/**
 * @fileoverview checks if all buttons have a type attribute set
 * @author Walter Corrales
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from 'jsx-ast-utils';
import getElementType from '../util/getElementType';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '<button> elements must have a type property.';
const errorMessage2 = '<button> elements must have a valid type property.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/button-type.md',
      description: 'Enforce button elements have a type attribute.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);

        if (type && type !== 'button') {
          return;
        }

        const buttonType = getPropValue(getProp(node.attributes, 'type'));

        if (buttonType && typeof buttonType === 'string' && buttonType.length > 0) {
          if (!['submit', 'button', 'reset'].includes(buttonType)) {
            context.report({
              node,
              message: errorMessage2,
            });
          }

          return;
        }

        context.report({
          node,
          message: errorMessage,
        });
      },
    };
  },
};
