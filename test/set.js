'use strict'

const test = require('brittle')
const assert = require('assert')
const set = require('../src/set')

test('set should return the same value if obj is null', () => {
  const obj = null
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result, null)
})

test('set should return the same value if obj is undefined', () => {
  const obj = undefined
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result, undefined)
})

test('set should return the same value if obj is false', () => {
  const obj = false
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result, false)
})

test('set should return the same value if obj is 0', () => {
  const obj = 0
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result, 0)
})

test('set should return the same value if obj is empty string', () => {
  const obj = ''
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result, '')
})

test('set should set value at path', () => {
  const obj = {}
  const result = set(obj, 'a', 'foo')
  assert.strictEqual(result.a, 'foo')
  assert.strictEqual(result, obj)
})

test('set should set nested value', () => {
  const obj = {}
  set(obj, 'a.b.c', 'foo')
  assert.strictEqual(obj.a.b.c, 'foo')
})

test('set should set value with array path', () => {
  const obj = {}
  set(obj, ['a', 'b'], 'foo')
  assert.strictEqual(obj.a.b, 'foo')
})

test('set should set value with bracket notation', () => {
  const obj = {}
  set(obj, 'a[b]', 'foo')
  assert.strictEqual(obj.a.b, 'foo')
})

test('set should create intermediate objects', () => {
  const obj = {}
  set(obj, 'a.b.c', 'foo')
  assert.strictEqual(typeof obj.a, 'object')
  assert.strictEqual(typeof obj.a.b, 'object')
  assert.strictEqual(obj.a.b.c, 'foo')
})

test('set should overwrite existing non-object values with objects', () => {
  const obj = { a: 'string' }
  set(obj, 'a.b', 'foo')
  assert.strictEqual(typeof obj.a, 'object')
  assert.strictEqual(obj.a.b, 'foo')
})

test('set should overwrite existing number values with objects', () => {
  const obj = { a: 123 }
  set(obj, 'a.b', 'foo')
  assert.strictEqual(typeof obj.a, 'object')
  assert.strictEqual(obj.a.b, 'foo')
})

test('set should handle empty path array', () => {
  const obj = { a: 'foo' }
  const result = set(obj, [], 'bar')
  assert.deepStrictEqual(result, obj)
  assert.strictEqual(obj.a, 'foo')
})

test('set should handle single segment path', () => {
  const obj = {}
  set(obj, 'a', 'foo')
  assert.strictEqual(obj.a, 'foo')
})

test('set should preserve existing object values when creating nested paths', () => {
  const obj = { a: { existing: 'value' } }
  set(obj, 'a.b', 'foo')
  assert.strictEqual(obj.a.existing, 'value')
  assert.strictEqual(obj.a.b, 'foo')
})

test('set should handle array values at intermediate paths', () => {
  const obj = { a: [1, 2, 3] }
  set(obj, 'a.b', 'foo')
  assert.strictEqual(obj.a.b, 'foo')
  assert.deepStrictEqual(obj.a.slice(0, 3), [1, 2, 3])
})

test('set should handle null values at intermediate paths', () => {
  const obj = { a: null }
  set(obj, 'a.b', 'foo')
  assert.strictEqual(typeof obj.a, 'object')
  assert.strictEqual(obj.a.b, 'foo')
})
