'use strict'

const test = require('brittle')
const { camelize } = require('../index')

test('camelize should convert strings to camelCase', (t) => {
  t.is(camelize('hello_world'), 'helloWorld')
  t.is(camelize('Hello-world'), 'helloWorld')
  t.is(camelize('hello world'), 'helloWorld')
})

test('camelize should handle single words', (t) => {
  t.is(camelize('hello'), 'hello')
  t.is(camelize('Hello'), 'hello')
})

test('camelize should handle empty strings', (t) => {
  t.is(camelize(''), '')
})

test('camelize should handle strings with numbers', (t) => {
  t.is(camelize('hello1_world2'), 'hello1World2')
})
