'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { pick } = require('../index')

test('pick should return an empty object when input is null', (t) => {
  alikePlain(t, pick(null, ['key']), {})
})

test('pick should return an empty object when keys array is empty', (t) => {
  alikePlain(t, pick({ a: 1, b: 2 }, []), {})
})

test('pick should return a new object with the picked properties', (t) => {
  alikePlain(t, pick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 })
})

test('pick should ignore properties that are not in the keys array', (t) => {
  alikePlain(t, pick({ a: 1, b: 2, c: 3 }, ['d', 'e']), {})
})

test('pick should return an empty object for an empty input object', (t) => {
  alikePlain(t, pick({}, ['a', 'b']), {})
})

test('pick should handle keys that are not strings', (t) => {
  alikePlain(t, pick({ 1: 'one', 2: 'two' }, ['1', '2']), { 1: 'one', 2: 'two' })
})

test('pick should pick properties by few path parameters', (t) => {
  const src = { a: 1, b: 2, c: 3, d: 4 }
  const expected = { a: 1, b: 2, d: 4 }
  alikePlain(t, pick(src, ['a', 'b'], 'd'), expected)
})

test('pick should pick nested properties by string or array path', (t) => {
  const src = {
    a: 1,
    b: {
      c: { d: 5, g: 2, h: 7 },
      f: 6
    },
    e: 4
  }
  const expected = {
    a: 1,
    b: {
      c: { d: 5, h: 7 }
    }
  }

  alikePlain(t,
    pick(
      src,
      ['a', 'b.c.d', 'b.c.h'],
      'd'
    ),
    expected
  )
  alikePlain(t,
    pick(
      src,
      ['a', ['b', 'c', 'd'], ['b', 'c', 'h']],
      'd'
    ),
    expected
  )
})

test('pick should return empty object if path is not specified', (t) => {
  const src = { a: 1, b: { c: { d: 5, g: 2, h: 7 }, f: 6 }, e: 4 }
  alikePlain(t, pick(src, ''), {})
})
