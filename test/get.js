'use strict'

const test = require('brittle')
const assert = require('assert')
const get = require('../src/get')

test('get should get property from object', () => {
  const object = { a: 'foo' }
  const res = get(object, 'a')
  assert.strictEqual(res, 'foo')
})

test('get should get property from nested object', () => {
  const object = { a: { foo: { bar: 'baz' } } }
  const res = get(object, 'a.foo.bar')
  assert.strictEqual(res, 'baz')
})

test('get should get property by name passed in square brackets', () => {
  const object = { a: { foo: { bar: 'baz' } } }
  const res = get(object, 'a.foo[bar]')
  assert.strictEqual(res, 'baz')
})

test('get should get property in array', () => {
  const object = { a: [1, 2, { foo: { bar: 'baz' } }] }
  const res = get(object, 'a[2].foo[bar]')
  assert.strictEqual(res, 'baz')
})

test('get should get property in array at the lowest level', () => {
  const object = { a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }
  const res = get(object, 'a[2].foo.bar.[3]')
  assert.strictEqual(res, 'baz')
})

test('get should get property if the first level is array', () => {
  const object = [{ a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]a[2].foo.bar.[3]')
  assert.strictEqual(res, 'baz')
})

test('get should also works if path passed as array', () => {
  const object = [{ a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, [0, 'a', '2', 'foo', 'bar', 3])
  assert.strictEqual(res, 'baz')
})

test('get should work with "false" values as part of path', () => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[3]')
  assert.strictEqual(res, 'baz')
})

test('get should work with nullable values', () => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, { null: 'baz' }] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[3]null')
  assert.strictEqual(res, 'baz')
})

test('get should return default value if item is not found by path', () => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]false[4].foo.bar.[5]', 'some default value')
  assert.strictEqual(res, 'some default value')
})

test('get should return default value if result item is not defined', () => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[2]', 'some default value')
  assert.strictEqual(res, 'some default value')
})

test('get should return default value if input is null', () => {
  const res = get(null, 'test', 'some default value')
  assert.strictEqual(res, 'some default value')
})

test('get should return default value if input is not object', () => {
  const res = get(true, 'test', 'some default value')
  assert.strictEqual(res, 'some default value')
})
