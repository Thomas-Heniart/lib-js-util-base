'use strict'

const test = require('brittle')
const assert = require('assert')
const { isFunction } = require('../index')

test('isFunction should return true for a Function object', () => {
  assert.strictEqual(isFunction(function () {}), true)
  assert.strictEqual(isFunction(() => {}), true)
  assert.strictEqual(isFunction(Object.keys), true)
})

test('isFunction should return `true` for async functions', () => {
  assert.strictEqual(isFunction(async function () {}), true)
  assert.strictEqual(isFunction(async () => {}), true)
})

test('isFunction should return `true` for generator functions', () => {
  assert.strictEqual(isFunction(function * () {}), true)
})

test('isFunction should return `true` for the `Proxy` constructor', () => {
  assert.strictEqual(isFunction(Proxy), true)
})

test('isFunction should return `true` for array view constructors', () => {
  assert.strictEqual(isFunction(Float32Array), true)
  assert.strictEqual(isFunction(Float64Array), true)
  assert.strictEqual(isFunction(Int8Array), true)
  assert.strictEqual(isFunction(Int16Array), true)
  assert.strictEqual(isFunction(Uint8Array), true)
  assert.strictEqual(isFunction(Uint8ClampedArray), true)
  assert.strictEqual(isFunction(Uint16Array), true)
  assert.strictEqual(isFunction(Uint32Array), true)
  assert.strictEqual(isFunction(DataView), true)
})

test('isFunction should return `false` for non-functions', () => {
  assert.strictEqual(isFunction(function () { return arguments }.apply(undefined, [1, 2, 3])), false) // eslint-disable-line no-useless-call
  assert.strictEqual(isFunction([1, 2, 3]), false)
  assert.strictEqual(isFunction(true), false)
  assert.strictEqual(isFunction(false), false)
  assert.strictEqual(isFunction(new Date()), false)
  assert.strictEqual(isFunction(new Error()), false)
  assert.strictEqual(isFunction({ a: 1 }), false)
  assert.strictEqual(isFunction(0), false)
  assert.strictEqual(isFunction(/x/), false)
  assert.strictEqual(isFunction('a'), false)
  assert.strictEqual(isFunction(Symbol('test')), false)
  assert.strictEqual(isFunction(null), false)
  assert.strictEqual(isFunction(undefined), false)
  assert.strictEqual(isFunction(NaN), false)
  assert.strictEqual(isFunction(''), false)
})
