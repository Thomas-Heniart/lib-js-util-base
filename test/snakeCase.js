'use strict'

const test = require('brittle')
const { snakeCase } = require('../index')

test('snakeCase should work with empty string', (t) => {
  t.is(snakeCase(''), '')
})

test('snakeCase should convert string from camel case to snake case', (t) => {
  t.is(snakeCase('camelCaseString'), 'camel_case_string')
})

test('snakeCase should convert string separated with spaces to snake case', (t) => {
  t.is(snakeCase('camel Case STRING'), 'camel_case_string')
})

test('snakeCase should convert dashes to underscore', (t) => {
  t.is(snakeCase('camel-case-string'), 'camel_case_string')
})

test('snakeCase should do nothing when is already in snake case', (t) => {
  t.is(snakeCase('camel_case_string'), 'camel_case_string')
})
