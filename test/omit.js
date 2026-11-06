'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { omit } = require('../index')

test('omit should return an empty object when input is null', (t) => {
  alikePlain(t, omit(null, ['key']), {})
})

test('omit should return the same object when keys array is empty', (t) => {
  alikePlain(t, omit({ a: 1, b: 2 }, []), { a: 1, b: 2 })
})

test('omit should return a new object with the omitted properties', (t) => {
  alikePlain(t, omit({ a: 1, b: 2, c: 3 }, ['a', 'c']), { b: 2 })
})

test('omit should ignore properties that are not in the keys array', (t) => {
  alikePlain(t, omit({ a: 1, b: 2, c: 3 }, ['a', 'd', 'e']), { b: 2, c: 3 })
})

test('omit should return an empty object for an empty input object', (t) => {
  alikePlain(t, omit({}, ['a', 'b']), {})
})

test('omit should handle keys that are not strings', (t) => {
  alikePlain(t, omit({ 1: 'one', 2: 'two' }, ['1']), { 2: 'two' })
})

test('omit should omit nested paths using dot/bracket notation', (t) => {
  const input = { user: { name: { first: 'Abdelrahman', last: 'Solyman' }, age: 30 } }
  const expected = { user: { name: { last: 'Solyman' }, age: 30 } }
  alikePlain(t, omit(input, ['user.name.first']), expected)
  alikePlain(t, omit(input, ['user[name][last]']), { user: { name: { first: 'Abdelrahman' }, age: 30 } })
})

test('omit should not mutate the original object', (t) => {
  const input = { user: { name: { first: 'Abdelrahman' } } }
  const copy = JSON.parse(JSON.stringify(input))
  omit(input, ['user.name.first'])
  alikePlain(t, input, copy)
})

test('omit should handle non-array keys parameter', (t) => {
  const input = { a: 1, b: 2, c: 3 }
  const result = omit(input, 'a')
  alikePlain(t, result, { a: 1, b: 2, c: 3 })
})

test('omit should handle undefined keys parameter', (t) => {
  const input = { a: 1, b: 2, c: 3 }
  const result = omit(input, undefined)
  alikePlain(t, result, { a: 1, b: 2, c: 3 })
})

test('omit should handle if value is undefined but exists', (t) => {
  const input = { a: undefined, b: 2, c: 3 }
  const result = omit(input, ['a'])
  alikePlain(t, result, { b: 2, c: 3 })
})
