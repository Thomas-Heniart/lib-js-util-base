'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { update } = require('../index')

test('update should update the object with the updater', (t) => {
  const object = { a: 1, b: 2, c: { d: 3, e: { f: '5' } } }
  update(object, 'a', (n) => n + 1)
  alikePlain(t, object, { a: 2, b: 2, c: { d: 3, e: { f: '5' } } })
  update(object, 'b', (n) => n * 2)
  alikePlain(t, object, { a: 2, b: 4, c: { d: 3, e: { f: '5' } } })
  update(object, 'c.d', (n) => n - 1)
  alikePlain(t, object, { a: 2, b: 4, c: { d: 2, e: { f: '5' } } })
  update(object, 'c.e.f', (n) => Number(n))
  alikePlain(t, object, { a: 2, b: 4, c: { d: 2, e: { f: 5 } } })
})

test('update should handle edge cases', (t) => {
  const object = { a: 1, b: 2, c: { d: 3, e: { f: '5' } } }
  update(object)
  alikePlain(t, object, { a: 1, b: 2, c: { d: 3, e: { f: '5' } } })
  update(object, 'a')
  update()
  alikePlain(t, object, { a: 1, b: 2, c: { d: 3, e: { f: '5' } } })
})

test('update should handle the case when the object has no property', (t) => {
  const object = {}
  update(object, 'a.b.c', () => 7)
  alikePlain(t, object, { a: { b: { c: 7 } } })
})
