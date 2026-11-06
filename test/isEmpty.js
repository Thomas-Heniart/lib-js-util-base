'use strict'

const test = require('brittle')
const assert = require('assert')
const { isEmpty } = require('../index')

const _toArgs = (array) => {
  const wrapper = function () {
    return arguments
  }

  return wrapper.apply(undefined, array)
}

test('isEmpty should return true for true boolean', () => {
  assert.strictEqual(isEmpty(true), true)
})

test('isEmpty should return true for false boolean', () => {
  assert.strictEqual(isEmpty(false), true)
})

test('isEmpty should return true for NaN', () => {
  assert.strictEqual(isEmpty(NaN), true)
})

test('isEmpty should return true for RegExp', () => {
  assert.strictEqual(isEmpty(/x/), true)
})

test('isEmpty should return true for Symbol', () => {
  assert.strictEqual(isEmpty(Symbol('a')), true)
})

test('isEmpty should return true for null', () => {
  assert.strictEqual(isEmpty(null), true)
})

test('isEmpty should return true for undefined', () => {
  assert.strictEqual(isEmpty(undefined), true)
})

test('isEmpty should return true for empty args', () => {
  assert.strictEqual(isEmpty(), true)
})

test('isEmpty should return true for 0 Buffer', () => {
  assert.strictEqual(isEmpty(Buffer.alloc(0)), true)
})

test('isEmpty should return false for 1 Buffer', () => {
  assert.strictEqual(isEmpty(Buffer.alloc(1)), false)
})

test('isEmpty should return true for empty string', () => {
  assert.strictEqual(isEmpty(''), true)
})

test('isEmpty should return false for string', () => {
  assert.strictEqual(isEmpty('test'), false)
})

test('isEmpty should return true for empty object', () => {
  assert.strictEqual(isEmpty({}), true)
})

test('isEmpty should return false for non-empty object', () => {
  assert.strictEqual(isEmpty({ a: 0 }), false)
})

test('isEmpty should return false for object that has `length=0` property', () => {
  assert.strictEqual(isEmpty({ length: 0 }), false)
})

test('isEmpty should return false for object that has `length="0"` property', () => {
  assert.strictEqual(isEmpty({ length: '0' }), false)
})

test('isEmpty should return true for negative lengths as array-like', () => {
  function Foo () {}
  Foo.prototype.length = -1

  assert.strictEqual(isEmpty(new Foo()), true)
})

test('isEmpty should return true for empty Class', () => {
  class Foo {}

  assert.strictEqual(isEmpty(new Foo()), true)
})

test('isEmpty should return false for non-empty Class', () => {
  class Foo {
    a = 1
  }

  assert.strictEqual(isEmpty(new Foo()), false)
})

test('isEmpty should return true for empty prototype objects', () => {
  function Foo () {}
  Foo.prototype = { constructor: Foo }

  assert.strictEqual(isEmpty(Foo.prototype), true)
})

test('isEmpty should return false for non-empty prototype objects', () => {
  function Foo () {}
  Foo.prototype = { constructor: Foo }
  Foo.prototype.a = 1

  assert.strictEqual(isEmpty(Foo.prototype), false)
})

test('isEmpty should return true for Array.prototype.slice', () => {
  assert.strictEqual(isEmpty(Array.prototype.slice), true)
})

test('isEmpty should return true for empty array', () => {
  assert.strictEqual(isEmpty([]), true)
})

test('isEmpty should return false for non-empty array', () => {
  assert.strictEqual(isEmpty([0]), false)
})

test('isEmpty should return false for non-empty `arguments` objects', () => {
  assert.strictEqual(isEmpty(_toArgs([1, 2, 3])), false)
})

test('isEmpty should return true for empty `arguments` objects', () => {
  assert.strictEqual(isEmpty(_toArgs([])), true)
})

test('isEmpty should return false for non-empty Map', () => {
  assert.strictEqual(isEmpty(new Map([['a', 1]])), false)
})

test('isEmpty should return true for empty Map', () => {
  assert.strictEqual(isEmpty(new Map()), true)
})

test('isEmpty should return false for non-empty Set', () => {
  assert.strictEqual(isEmpty(new Set([1])), false)
})

test('isEmpty should return true for empty Set', () => {
  assert.strictEqual(isEmpty(new Set()), true)
})
