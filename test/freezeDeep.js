'use strict'

const test = require('brittle')
const assert = require('assert')
const { freezeDeep } = require('../index')

test('freezeDeep should freeze a simple object', () => {
  const obj = { a: 1 }
  freezeDeep(obj)
  assert.throws(() => { obj.a = 2 }, TypeError)
})

test('freezeDeep should deeply freeze an object', () => {
  const obj = { a: { b: { c: 1 } } }
  freezeDeep(obj)
  assert.throws(() => { obj.a.b.c = 2 }, TypeError)
})

test('freezeDeep should not affect non-object properties', () => {
  const obj = { a: 1, b: 'test', c: true }
  freezeDeep(obj)
  assert.strictEqual(obj.a, 1)
  assert.strictEqual(obj.b, 'test')
  assert.strictEqual(obj.c, true)
})

test('freezeDeep should handle objects that are already frozen', () => {
  const obj = Object.freeze({ a: 1 })
  assert.doesNotThrow(() => freezeDeep(obj))
})

test('freezeDeep should handle null and undefined properties without errors', () => {
  const obj = { a: null, b: undefined }
  assert.doesNotThrow(() => freezeDeep(obj))
})

test('freezeDeep should deeply freeze an object containing nested arrays', () => {
  const obj = {
    a: [1, 2, [3, 4]],
    b: { c: [5, 6] }
  }

  freezeDeep(obj)

  assert.throws(() => obj.a.push(5), TypeError)
  assert.throws(() => obj.a[2].push(7), TypeError)
  assert.throws(() => obj.b.c.push(8), TypeError)
})
