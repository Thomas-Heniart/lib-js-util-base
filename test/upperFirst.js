'use strict'

const test = require('brittle')
const assert = require('assert')
const upperFirst = require('../src/upperFirst')

test('upperFirst should capitalize first character', () => {
  assert.strictEqual(upperFirst('foo'), 'Foo')
})

test('upperFirst should keep the string as is if already capitalized', () => {
  assert.strictEqual(upperFirst('FRED'), 'FRED')
})

test('upperFirst should handle empty string', () => {
  assert.strictEqual(upperFirst(''), '')
})

test('upperFirst should handle already capitalized string', () => {
  assert.strictEqual(upperFirst('Foo'), 'Foo')
})

test('upperFirst should handle single character', () => {
  assert.strictEqual(upperFirst('f'), 'F')
})

test('upperFirst should handle number input', () => {
  assert.strictEqual(upperFirst(123), '123')
})

test('upperFirst should handle array input', () => {
  assert.strictEqual(upperFirst([]), '')
})

test('upperFirst should handle boolean input', () => {
  assert.strictEqual(upperFirst(true), 'True')
  assert.strictEqual(upperFirst(false), 'False')
})

test('upperFirst should handle object input', () => {
  assert.strictEqual(upperFirst({}), '[object Object]')
})

test('upperFirst should handle Set input', () => {
  assert.strictEqual(upperFirst(new Set()), '[object Set]')
})

test('upperFirst should handle Symbol input', () => {
  assert.strictEqual(upperFirst(Symbol('abc')), 'Symbol(abc)')
})

test('upperFirst should handle null input', () => {
  assert.strictEqual(upperFirst(null), 'Null')
})

test('upperFirst should handle undefined input', () => {
  assert.strictEqual(upperFirst(undefined), '')
})

test('upperFirst should handle NaN input', () => {
  assert.strictEqual(upperFirst(NaN), 'NaN')
})
