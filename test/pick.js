'use strict'

const test = require('brittle')
const { pick } = require('../index')

test('pick should return an empty object when input is null', (t) => {
  t.alike(pick(null, ['key']), {})
})

test('pick should return an empty object when keys array is empty', (t) => {
  t.alike(pick({ a: 1, b: 2 }, []), {})
})

test('pick should return a new object with the picked properties', (t) => {
  t.alike(pick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 })
})

test('pick should ignore properties that are not in the keys array', (t) => {
  t.alike(pick({ a: 1, b: 2, c: 3 }, ['d', 'e']), {})
})

test('pick should return an empty object for an empty input object', (t) => {
  t.alike(pick({}, ['a', 'b']), {})
})

test('pick should handle keys that are not strings', (t) => {
  t.alike(pick({ 1: 'one', 2: 'two' }, ['1', '2']), { 1: 'one', 2: 'two' })
})

test('pick should pick properties by few path parameters', (t) => {
  const src = { a: 1, b: 2, c: 3, d: 4 }
  const expected = { a: 1, b: 2, d: 4 }
  t.alike(pick(src, ['a', 'b'], 'd'), expected)
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

  t.alike(
    pick(
      src,
      ['a', 'b.c.d', 'b.c.h'],
      'd'
    ),
    expected
  )
  t.alike(
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
  t.alike(pick(src, ''), {})
})
