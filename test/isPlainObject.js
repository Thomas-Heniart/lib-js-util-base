'use strict'

const test = require('brittle')
const assert = require('assert')
const { isPlainObject } = require('../index')

test('isPlainObject should return true for a plain object', () => {
  assert.strictEqual(isPlainObject({}), true)
  assert.strictEqual(isPlainObject({ key: 'value' }), true)
  // eslint-disable-next-line no-new-object
  assert.strictEqual(isPlainObject(new Object()), true)
  // eslint-disable-next-line no-new-object
  assert.strictEqual(isPlainObject(new Object({ key: 'value ' })), true)
})

test('isPlainObject should return false for an array', () => {
  assert.strictEqual(isPlainObject([]), false)
})

test('isPlainObject should return false for a function', () => {
  assert.strictEqual(isPlainObject(() => { }), false)
})

test('isPlainObject should return false for a date', () => {
  assert.strictEqual(isPlainObject(new Date()), false)
})

test('isPlainObject should return false for a number', () => {
  assert.strictEqual(isPlainObject(42), false)
})

test('isPlainObject should return false for a string', () => {
  assert.strictEqual(isPlainObject('test'), false)
})

test('isPlainObject should return false for null', () => {
  assert.strictEqual(isPlainObject(null), false)
})

test('isPlainObject should return false for undefined', () => {
  assert.strictEqual(isPlainObject(undefined), false)
})

test('isPlainObject should return false for a boolean value', () => {
  assert.strictEqual(isPlainObject(true), false)
  assert.strictEqual(isPlainObject(false), false)
})

test('isPlainObject should return false for a symbol', () => {
  assert.strictEqual(isPlainObject(Symbol('test')), false)
})
