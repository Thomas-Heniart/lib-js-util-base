'use strict'

const test = require('brittle')
const assert = require('assert')
const unset = require('../src/unset')

for (const [index, [obj, path, expected]] of [
  [{ a: 'foo' }, 'a', {}],
  [{ a: ['foo', 'bar'] }, 'a[1]', { a: ['foo'] }],
  [{ a: 'foo', b: [{ a: 'bar', c: 'baz' }] }, 'b[0].a', { a: 'foo', b: [{ c: 'baz' }] }],
  [{ b: null }, 'b', {}],
  [{ b: undefined }, 'b', {}],
  [{ d: 0 }, 'd', {}],
  [{ a: 'bar', b: { a: 'foo' } }, 'b.a', { a: 'bar' }],
  [{ a: 'bar', b: { a: 'foo', c: 'baz' } }, 'b.a', { a: 'bar', b: { c: 'baz' } }],
  [{ a: 'baz', b: { a: { c: 'baz' } } }, 'b.a.c', { a: 'baz' }],
  [{ a: 'baz', b: { a: { c: [{ k: 'baz' }] } } }, 'b.a.c[0].k', { a: 'baz' }],
  [{ a: 'baz', b: { a: { c: 'baz', d: 'koo' } } }, 'b.a.c', { a: 'baz', b: { a: { d: 'koo' } } }],
  [{ a: 'baz', b: { a: { c: 'baz', d: 'koo' } } }, 'b.a.d', { a: 'baz', b: { a: { c: 'baz' } } }],
  [{ a: 'baz', b: { a: { c: 'baz', d: [{ foo: 'koo', bar: 'fooz' }] } } }, 'b.a.d[0].bar', { a: 'baz', b: { a: { c: 'baz', d: [{ foo: 'koo' }] } } }],
  [{ a: 'baz', b: { a: { c: 'baz', d: 'koo' } } }, 'a', { b: { a: { c: 'baz', d: 'koo' } } }]
].entries()) {
  test(`unset should be able to unset an object an any arbitrary depth returning true on success [${index + 1}]`, () => {
    const found = unset(obj, path)
    assert.deepStrictEqual(obj, expected)
    assert.strictEqual(found, true)
  })
}

for (const [index, [obj, path]] of [
  [{}, 'b'],
  [{}, 'b.f'],
  [{ a: 'foo' }, 'b'],
  [{ a: 'bar', b: { a: 'foo' } }, 'b.c'],
  [{ a: 'bar', b: { a: 'foo', c: 'baz' } }, 'b.d'],
  [{ a: 'baz', b: { a: { c: 'baz' } } }, 'b.a.k'],
  [{ a: 'baz', b: { a: { c: 'baz', d: 'koo' } } }, 'b.f.d']
].entries()) {
  test(`unset should return true even when target was not found [${index + 1}]`, () => {
    assert.strictEqual(unset(obj, path), true)
  })
}

for (const [index, [obj, path]] of [
  [Object.freeze({ a: 'foo' }), 'a'],
  [{ a: 'bar', b: Object.freeze({ a: 'foo' }) }, 'b.a'],
  [{ a: 'bar', b: Object.freeze({ a: 'foo', c: 'baz' }) }, 'b.c'],
  [{ a: 'baz', b: { a: Object.freeze({ c: 'baz' }) } }, 'b.a.c'],
  [Object.freeze({ a: 'baz', b: { a: { c: 'baz', d: 'koo' } } }), 'a']
].entries()) {
  test(`unset should return false when target was found but could not be removed [${index + 1}]`, () => {
    assert.strictEqual(unset(obj, path), false)
  })
}

test('unset should return false when delete throws an error', () => {
  const throwingProxy = new Proxy({ a: 123 }, {
    deleteProperty (target, prop) {
      if (prop === 'a') {
        throw new Error('Forced delete error')
      }
      return true
    }
  })

  const result = unset(throwingProxy, 'a')
  assert.strictEqual(result, false)
})
