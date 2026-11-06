'use strict'

const test = require('brittle')
const assert = require('assert')
const { camelize } = require('../index')

test('camelize should convert strings to camelCase', () => {
  assert.strictEqual(camelize('hello_world'), 'helloWorld')
  assert.strictEqual(camelize('Hello-world'), 'helloWorld')
  assert.strictEqual(camelize('hello world'), 'helloWorld')
})

test('camelize should handle single words', () => {
  assert.strictEqual(camelize('hello'), 'hello')
  assert.strictEqual(camelize('Hello'), 'hello')
})

test('camelize should handle empty strings', () => {
  assert.strictEqual(camelize(''), '')
})

test('camelize should handle strings with numbers', () => {
  assert.strictEqual(camelize('hello1_world2'), 'hello1World2')
})
