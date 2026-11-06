'use strict'

const test = require('brittle')
const { isFunction } = require('../index')

test('isFunction should return true for a Function object', (t) => {
  t.is(isFunction(function () {}), true)
  t.is(isFunction(() => {}), true)
  t.is(isFunction(Object.keys), true)
})

test('isFunction should return `true` for async functions', (t) => {
  t.is(isFunction(async function () {}), true)
  t.is(isFunction(async () => {}), true)
})

test('isFunction should return `true` for generator functions', (t) => {
  t.is(isFunction(function * () {}), true)
})

test('isFunction should return `true` for the `Proxy` constructor', (t) => {
  t.is(isFunction(Proxy), true)
})

test('isFunction should return `true` for array view constructors', (t) => {
  t.is(isFunction(Float32Array), true)
  t.is(isFunction(Float64Array), true)
  t.is(isFunction(Int8Array), true)
  t.is(isFunction(Int16Array), true)
  t.is(isFunction(Uint8Array), true)
  t.is(isFunction(Uint8ClampedArray), true)
  t.is(isFunction(Uint16Array), true)
  t.is(isFunction(Uint32Array), true)
  t.is(isFunction(DataView), true)
})

test('isFunction should return `false` for non-functions', (t) => {
  t.is(isFunction(function () { return arguments }.apply(undefined, [1, 2, 3])), false) // eslint-disable-line no-useless-call
  t.is(isFunction([1, 2, 3]), false)
  t.is(isFunction(true), false)
  t.is(isFunction(false), false)
  t.is(isFunction(new Date()), false)
  t.is(isFunction(new Error()), false)
  t.is(isFunction({ a: 1 }), false)
  t.is(isFunction(0), false)
  t.is(isFunction(/x/), false)
  t.is(isFunction('a'), false)
  t.is(isFunction(Symbol('test')), false)
  t.is(isFunction(null), false)
  t.is(isFunction(undefined), false)
  t.is(isFunction(NaN), false)
  t.is(isFunction(''), false)
})
