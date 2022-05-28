/* eslint-env jest */
/**
 * @fileoverview checks if all buttons have a type attribute set
 * @author Walter Corrales
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/button-type';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '<button> elements must have a type property.',
  type: 'JSXOpeningElement',
};

ruleTester.run('html-has-lang', rule, {
  valid: [
    { code: '<button type="submit" />' },
    { code: '<button type="button" />' },
    { code: "<button type={'button'} />" },
    { code: "<button type={'submit'} />" },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<button />', errors: [expectedError] },
    { code: '<button {...props} />', errors: [expectedError] },
    { code: '<button type={undefined} />', errors: [expectedError] },
    { code: '<button type="" />', errors: [expectedError] },
    { code: '<button type={false} />', errors: [expectedError] },
    { code: '<button type={true} />', errors: [expectedError] },
    { code: "<button type={''} />", errors: [expectedError] },
    { code: '<button type={``} />', errors: [expectedError] },
    { code: '<button type={""} />', errors: [expectedError] },
    { code: '<button type={42} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
