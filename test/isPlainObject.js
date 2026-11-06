'use strict'

const test = require('brittle')
const { isPlainObject } = require('../index')

test('isPlainObject should return true for a plain object', (t) => {
  t.is(isPlainObject({}), true)
  t.is(isPlainObject({ key: 'value' }), true)
  // eslint-disable-next-line no-new-object
  t.is(isPlainObject(new Object()), true)
  // eslint-disable-next-line no-new-object
  t.is(isPlainObject(new Object({ key: 'value ' })), true)
})

test('isPlainObject should return false for an array', (t) => {
  t.is(isPlainObject([]), false)
})

test('isPlainObject should return false for a function', (t) => {
  t.is(isPlainObject(() => { }), false)
})

test('isPlainObject should return false for a date', (t) => {
  t.is(isPlainObject(new Date()), false)
})

test('isPlainObject should return false for a number', (t) => {
  t.is(isPlainObject(42), false)
})

test('isPlainObject should return false for a string', (t) => {
  t.is(isPlainObject('test'), false)
})

test('isPlainObject should return false for null', (t) => {
  t.is(isPlainObject(null), false)
})

test('isPlainObject should return false for undefined', (t) => {
  t.is(isPlainObject(undefined), false)
})

test('isPlainObject should return false for a boolean value', (t) => {
  t.is(isPlainObject(true), false)
  t.is(isPlainObject(false), false)
})

test('isPlainObject should return false for a symbol', (t) => {
  t.is(isPlainObject(Symbol('test')), false)
})
