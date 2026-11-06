'use strict'

const test = require('brittle')
const toPath = require('../src/util/toPath')

test('toPath should convert array path', (t) => {
  const actual = toPath(['a', 0, 'b', null])
  t.alike(actual, ['a', '0', 'b', 'null'])
})

test('toPath should parse bracket notation with quoted keys containing dots', (t) => {
  const actual = toPath('a[["x.y"]]')
  t.alike(actual, ['a', 'x.y'])
})

test('toPath should handle simple dot paths', (t) => {
  const actual = toPath('a.b.c')
  t.alike(actual, ['a', 'b', 'c'])
})

test('toPath should handle "a[0].b.c"', (t) => {
  const actual = toPath('a[0].b.c')
  t.alike(actual, ['a', '0', 'b', 'c'])
})

test('toPath should handle path starting with dot', (t) => {
  const actual = toPath('.a.b')
  t.alike(actual, ['', 'a', 'b'])
})

test('toPath should handle negative number in brackets', (t) => {
  const actual = toPath('a[-1]')
  t.alike(actual, ['a', '-1'])
})

test('toPath should handle decimal number in brackets', (t) => {
  const actual = toPath('a[1.5]')
  t.alike(actual, ['a', '1.5'])
})

test('toPath should handle escaped characters in quoted strings', (t) => {
  const actual = toPath("a['x\\.y']")
  t.alike(actual, ['a', 'x.y'])
})

test('toPath should handle double quotes in path', (t) => {
  const actual = toPath('a["x.y"]')
  t.alike(actual, ['a', 'x.y'])
})

test('toPath should handle empty string path', (t) => {
  const actual = toPath('')
  t.alike(actual, [])
})

test('toPath should handle path with empty brackets', (t) => {
  const actual = toPath('a[]')
  t.alike(actual, ['a', ''])
})

test('toPath should handle complex nested path', (t) => {
  const actual = toPath("a[0]['b.c'].d")
  t.alike(actual, ['a', '0', 'b.c', 'd'])
})

test('toPath should handle path with escaped backslash in quoted string', (t) => {
  const actual = toPath("a['x\\\\y']")
  t.alike(actual, ['a', 'x\\y'])
})
