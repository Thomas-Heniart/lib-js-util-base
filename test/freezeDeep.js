'use strict'

const test = require('brittle')
const { freezeDeep } = require('../index')

test('freezeDeep should freeze a simple object', (t) => {
  const obj = { a: 1 }
  freezeDeep(obj)
  t.exception.all(() => { obj.a = 2 }, TypeError)
})

test('freezeDeep should deeply freeze an object', (t) => {
  const obj = { a: { b: { c: 1 } } }
  freezeDeep(obj)
  t.exception.all(() => { obj.a.b.c = 2 }, TypeError)
})

test('freezeDeep should not affect non-object properties', (t) => {
  const obj = { a: 1, b: 'test', c: true }
  freezeDeep(obj)
  t.is(obj.a, 1)
  t.is(obj.b, 'test')
  t.is(obj.c, true)
})

test('freezeDeep should handle objects that are already frozen', (t) => {
  const obj = Object.freeze({ a: 1 })
  t.execution(() => freezeDeep(obj))
})

test('freezeDeep should handle null and undefined properties without errors', (t) => {
  const obj = { a: null, b: undefined }
  t.execution(() => freezeDeep(obj))
})

test('freezeDeep should deeply freeze an object containing nested arrays', (t) => {
  const obj = {
    a: [1, 2, [3, 4]],
    b: { c: [5, 6] }
  }

  freezeDeep(obj)

  t.exception.all(() => obj.a.push(5), TypeError)
  t.exception.all(() => obj.a[2].push(7), TypeError)
  t.exception.all(() => obj.b.c.push(8), TypeError)
})
