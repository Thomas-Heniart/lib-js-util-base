'use strict'

const test = require('brittle')
const { isNil } = require('../index')

test('isNil should return true for null', (t) => {
  t.is(isNil(null), true)
})

test('isNil should return true for undefined', (t) => {
  t.is(isNil(undefined), true)
})

test('isNil should return false for a number', (t) => {
  t.is(isNil(42), false)
})

test('isNil should return false for a string', (t) => {
  t.is(isNil('test'), false)
})

test('isNil should return false for an empty object', (t) => {
  t.is(isNil({}), false)
})

test('isNil should return false for an empty array', (t) => {
  t.is(isNil([]), false)
})

test('isNil should return false for a boolean value', (t) => {
  t.is(isNil(true), false)
  t.is(isNil(false), false)
})

test('isNil should return false for a function', (t) => {
  t.is(isNil(() => { }), false)
})

test('isNil should return false for a symbol', (t) => {
  t.is(isNil(Symbol('test')), false)
})
