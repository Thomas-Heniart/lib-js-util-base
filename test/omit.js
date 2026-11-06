'use strict'

const test = require('brittle')
const assert = require('assert')
const { omit } = require('../index')

test('omit should return an empty object when input is null', () => {
  assert.deepStrictEqual(omit(null, ['key']), {})
})

test('omit should return the same object when keys array is empty', () => {
  assert.deepStrictEqual(omit({ a: 1, b: 2 }, []), { a: 1, b: 2 })
})

test('omit should return a new object with the omitted properties', () => {
  assert.deepStrictEqual(omit({ a: 1, b: 2, c: 3 }, ['a', 'c']), { b: 2 })
})

test('omit should ignore properties that are not in the keys array', () => {
  assert.deepStrictEqual(omit({ a: 1, b: 2, c: 3 }, ['a', 'd', 'e']), { b: 2, c: 3 })
})

test('omit should return an empty object for an empty input object', () => {
  assert.deepStrictEqual(omit({}, ['a', 'b']), {})
})

test('omit should handle keys that are not strings', () => {
  assert.deepStrictEqual(omit({ 1: 'one', 2: 'two' }, ['1']), { 2: 'two' })
})

test('omit should omit nested paths using dot/bracket notation', () => {
  const input = { user: { name: { first: 'Abdelrahman', last: 'Solyman' }, age: 30 } }
  const expected = { user: { name: { last: 'Solyman' }, age: 30 } }
  assert.deepStrictEqual(omit(input, ['user.name.first']), expected)
  assert.deepStrictEqual(omit(input, ['user[name][last]']), { user: { name: { first: 'Abdelrahman' }, age: 30 } })
})

test('omit should not mutate the original object', () => {
  const input = { user: { name: { first: 'Abdelrahman' } } }
  const copy = JSON.parse(JSON.stringify(input))
  omit(input, ['user.name.first'])
  assert.deepStrictEqual(input, copy)
})

test('omit should handle non-array keys parameter', () => {
  const input = { a: 1, b: 2, c: 3 }
  const result = omit(input, 'a')
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3 })
})

test('omit should handle undefined keys parameter', () => {
  const input = { a: 1, b: 2, c: 3 }
  const result = omit(input, undefined)
  assert.deepStrictEqual(result, { a: 1, b: 2, c: 3 })
})

test('omit should handle if value is undefined but exists', () => {
  const input = { a: undefined, b: 2, c: 3 }
  const result = omit(input, ['a'])
  assert.deepStrictEqual(result, { b: 2, c: 3 })
})
