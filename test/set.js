'use strict'

const test = require('brittle')
const set = require('../src/set')

test('set should return the same value if obj is null', (t) => {
  const obj = null
  const result = set(obj, 'a', 'foo')
  t.is(result, null)
})

test('set should return the same value if obj is undefined', (t) => {
  const obj = undefined
  const result = set(obj, 'a', 'foo')
  t.is(result, undefined)
})

test('set should return the same value if obj is false', (t) => {
  const obj = false
  const result = set(obj, 'a', 'foo')
  t.is(result, false)
})

test('set should return the same value if obj is 0', (t) => {
  const obj = 0
  const result = set(obj, 'a', 'foo')
  t.is(result, 0)
})

test('set should return the same value if obj is empty string', (t) => {
  const obj = ''
  const result = set(obj, 'a', 'foo')
  t.is(result, '')
})

test('set should set value at path', (t) => {
  const obj = {}
  const result = set(obj, 'a', 'foo')
  t.is(result.a, 'foo')
  t.is(result, obj)
})

test('set should set nested value', (t) => {
  const obj = {}
  set(obj, 'a.b.c', 'foo')
  t.is(obj.a.b.c, 'foo')
})

test('set should set value with array path', (t) => {
  const obj = {}
  set(obj, ['a', 'b'], 'foo')
  t.is(obj.a.b, 'foo')
})

test('set should set value with bracket notation', (t) => {
  const obj = {}
  set(obj, 'a[b]', 'foo')
  t.is(obj.a.b, 'foo')
})

test('set should create intermediate objects', (t) => {
  const obj = {}
  set(obj, 'a.b.c', 'foo')
  t.is(typeof obj.a, 'object')
  t.is(typeof obj.a.b, 'object')
  t.is(obj.a.b.c, 'foo')
})

test('set should overwrite existing non-object values with objects', (t) => {
  const obj = { a: 'string' }
  set(obj, 'a.b', 'foo')
  t.is(typeof obj.a, 'object')
  t.is(obj.a.b, 'foo')
})

test('set should overwrite existing number values with objects', (t) => {
  const obj = { a: 123 }
  set(obj, 'a.b', 'foo')
  t.is(typeof obj.a, 'object')
  t.is(obj.a.b, 'foo')
})

test('set should handle empty path array', (t) => {
  const obj = { a: 'foo' }
  const result = set(obj, [], 'bar')
  t.alike(result, obj)
  t.is(obj.a, 'foo')
})

test('set should handle single segment path', (t) => {
  const obj = {}
  set(obj, 'a', 'foo')
  t.is(obj.a, 'foo')
})

test('set should preserve existing object values when creating nested paths', (t) => {
  const obj = { a: { existing: 'value' } }
  set(obj, 'a.b', 'foo')
  t.is(obj.a.existing, 'value')
  t.is(obj.a.b, 'foo')
})

test('set should handle array values at intermediate paths', (t) => {
  const obj = { a: [1, 2, 3] }
  set(obj, 'a.b', 'foo')
  t.is(obj.a.b, 'foo')
  t.alike(obj.a.slice(0, 3), [1, 2, 3])
})

test('set should handle null values at intermediate paths', (t) => {
  const obj = { a: null }
  set(obj, 'a.b', 'foo')
  t.is(typeof obj.a, 'object')
  t.is(obj.a.b, 'foo')
})
