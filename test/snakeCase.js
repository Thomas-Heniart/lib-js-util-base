'use strict'

const test = require('brittle')
const assert = require('assert')
const { snakeCase } = require('../index')

test('snakeCase should work with empty string', () => {
  assert.equal(snakeCase(''), '')
})

test('snakeCase should convert string from camel case to snake case', () => {
  assert.equal(snakeCase('camelCaseString'), 'camel_case_string')
})

test('snakeCase should convert string separated with spaces to snake case', () => {
  assert.equal(snakeCase('camel Case STRING'), 'camel_case_string')
})

test('snakeCase should convert dashes to underscore', () => {
  assert.equal(snakeCase('camel-case-string'), 'camel_case_string')
})

test('snakeCase should do nothing when is already in snake case', () => {
  assert.equal(snakeCase('camel_case_string'), 'camel_case_string')
})
