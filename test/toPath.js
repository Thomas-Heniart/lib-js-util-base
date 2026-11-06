'use strict'

const test = require('brittle')
const assert = require('assert')
const toPath = require('../src/util/toPath')

test('toPath should convert array path', () => {
  const actual = toPath(['a', 0, 'b', null])
  assert.deepStrictEqual(actual, ['a', '0', 'b', 'null'])
})

test('toPath should parse bracket notation with quoted keys containing dots', () => {
  const actual = toPath('a[["x.y"]]')
  assert.deepStrictEqual(actual, ['a', 'x.y'])
})

test('toPath should handle simple dot paths', () => {
  const actual = toPath('a.b.c')
  assert.deepStrictEqual(actual, ['a', 'b', 'c'])
})

test('toPath should handle "a[0].b.c"', () => {
  const actual = toPath('a[0].b.c')
  assert.deepStrictEqual(actual, ['a', '0', 'b', 'c'])
})

test('toPath should handle path starting with dot', () => {
  const actual = toPath('.a.b')
  assert.deepStrictEqual(actual, ['', 'a', 'b'])
})

test('toPath should handle negative number in brackets', () => {
  const actual = toPath('a[-1]')
  assert.deepStrictEqual(actual, ['a', '-1'])
})

test('toPath should handle decimal number in brackets', () => {
  const actual = toPath('a[1.5]')
  assert.deepStrictEqual(actual, ['a', '1.5'])
})

test('toPath should handle escaped characters in quoted strings', () => {
  const actual = toPath("a['x\\.y']")
  assert.deepStrictEqual(actual, ['a', 'x.y'])
})

test('toPath should handle double quotes in path', () => {
  const actual = toPath('a["x.y"]')
  assert.deepStrictEqual(actual, ['a', 'x.y'])
})

test('toPath should handle empty string path', () => {
  const actual = toPath('')
  assert.deepStrictEqual(actual, [])
})

test('toPath should handle path with empty brackets', () => {
  const actual = toPath('a[]')
  assert.deepStrictEqual(actual, ['a', ''])
})

test('toPath should handle complex nested path', () => {
  const actual = toPath("a[0]['b.c'].d")
  assert.deepStrictEqual(actual, ['a', '0', 'b.c', 'd'])
})

test('toPath should handle path with escaped backslash in quoted string', () => {
  const actual = toPath("a['x\\\\y']")
  assert.deepStrictEqual(actual, ['a', 'x\\y'])
})
