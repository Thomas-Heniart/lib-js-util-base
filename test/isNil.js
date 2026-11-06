'use strict'

const test = require('brittle')
const assert = require('assert')
const { isNil } = require('../index')

test('isNil should return true for null', () => {
  assert.strictEqual(isNil(null), true)
})

test('isNil should return true for undefined', () => {
  assert.strictEqual(isNil(undefined), true)
})

test('isNil should return false for a number', () => {
  assert.strictEqual(isNil(42), false)
})

test('isNil should return false for a string', () => {
  assert.strictEqual(isNil('test'), false)
})

test('isNil should return false for an empty object', () => {
  assert.strictEqual(isNil({}), false)
})

test('isNil should return false for an empty array', () => {
  assert.strictEqual(isNil([]), false)
})

test('isNil should return false for a boolean value', () => {
  assert.strictEqual(isNil(true), false)
  assert.strictEqual(isNil(false), false)
})

test('isNil should return false for a function', () => {
  assert.strictEqual(isNil(() => { }), false)
})

test('isNil should return false for a symbol', () => {
  assert.strictEqual(isNil(Symbol('test')), false)
})
