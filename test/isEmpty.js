'use strict'

const test = require('brittle')
const { isEmpty } = require('../index')

const _toArgs = (array) => {
  const wrapper = function () {
    return arguments
  }

  return wrapper.apply(undefined, array)
}

test('isEmpty should return true for true boolean', (t) => {
  t.is(isEmpty(true), true)
})

test('isEmpty should return true for false boolean', (t) => {
  t.is(isEmpty(false), true)
})

test('isEmpty should return true for NaN', (t) => {
  t.is(isEmpty(NaN), true)
})

test('isEmpty should return true for RegExp', (t) => {
  t.is(isEmpty(/x/), true)
})

test('isEmpty should return true for Symbol', (t) => {
  t.is(isEmpty(Symbol('a')), true)
})

test('isEmpty should return true for null', (t) => {
  t.is(isEmpty(null), true)
})

test('isEmpty should return true for undefined', (t) => {
  t.is(isEmpty(undefined), true)
})

test('isEmpty should return true for empty args', (t) => {
  t.is(isEmpty(), true)
})

test('isEmpty should return true for 0 Buffer', (t) => {
  t.is(isEmpty(Buffer.alloc(0)), true)
})

test('isEmpty should return false for 1 Buffer', (t) => {
  t.is(isEmpty(Buffer.alloc(1)), false)
})

test('isEmpty should return true for empty string', (t) => {
  t.is(isEmpty(''), true)
})

test('isEmpty should return false for string', (t) => {
  t.is(isEmpty('test'), false)
})

test('isEmpty should return true for empty object', (t) => {
  t.is(isEmpty({}), true)
})

test('isEmpty should return false for non-empty object', (t) => {
  t.is(isEmpty({ a: 0 }), false)
})

test('isEmpty should return false for object that has `length=0` property', (t) => {
  t.is(isEmpty({ length: 0 }), false)
})

test('isEmpty should return false for object that has `length="0"` property', (t) => {
  t.is(isEmpty({ length: '0' }), false)
})

test('isEmpty should return true for negative lengths as array-like', (t) => {
  function Foo () {}
  Foo.prototype.length = -1

  t.is(isEmpty(new Foo()), true)
})

test('isEmpty should return true for empty Class', (t) => {
  class Foo {}

  t.is(isEmpty(new Foo()), true)
})

test('isEmpty should return false for non-empty Class', (t) => {
  class Foo {
    a = 1
  }

  t.is(isEmpty(new Foo()), false)
})

test('isEmpty should return true for empty prototype objects', (t) => {
  function Foo () {}
  Foo.prototype = { constructor: Foo }

  t.is(isEmpty(Foo.prototype), true)
})

test('isEmpty should return false for non-empty prototype objects', (t) => {
  function Foo () {}
  Foo.prototype = { constructor: Foo }
  Foo.prototype.a = 1

  t.is(isEmpty(Foo.prototype), false)
})

test('isEmpty should return true for Array.prototype.slice', (t) => {
  t.is(isEmpty(Array.prototype.slice), true)
})

test('isEmpty should return true for empty array', (t) => {
  t.is(isEmpty([]), true)
})

test('isEmpty should return false for non-empty array', (t) => {
  t.is(isEmpty([0]), false)
})

test('isEmpty should return false for non-empty `arguments` objects', (t) => {
  t.is(isEmpty(_toArgs([1, 2, 3])), false)
})

test('isEmpty should return true for empty `arguments` objects', (t) => {
  t.is(isEmpty(_toArgs([])), true)
})

test('isEmpty should return false for non-empty Map', (t) => {
  t.is(isEmpty(new Map([['a', 1]])), false)
})

test('isEmpty should return true for empty Map', (t) => {
  t.is(isEmpty(new Map()), true)
})

test('isEmpty should return false for non-empty Set', (t) => {
  t.is(isEmpty(new Set([1])), false)
})

test('isEmpty should return true for empty Set', (t) => {
  t.is(isEmpty(new Set()), true)
})
