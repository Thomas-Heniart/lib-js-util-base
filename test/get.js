'use strict'

const test = require('brittle')
const get = require('../src/get')

test('get should get property from object', (t) => {
  const object = { a: 'foo' }
  const res = get(object, 'a')
  t.is(res, 'foo')
})

test('get should get property from nested object', (t) => {
  const object = { a: { foo: { bar: 'baz' } } }
  const res = get(object, 'a.foo.bar')
  t.is(res, 'baz')
})

test('get should get property by name passed in square brackets', (t) => {
  const object = { a: { foo: { bar: 'baz' } } }
  const res = get(object, 'a.foo[bar]')
  t.is(res, 'baz')
})

test('get should get property in array', (t) => {
  const object = { a: [1, 2, { foo: { bar: 'baz' } }] }
  const res = get(object, 'a[2].foo[bar]')
  t.is(res, 'baz')
})

test('get should get property in array at the lowest level', (t) => {
  const object = { a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }
  const res = get(object, 'a[2].foo.bar.[3]')
  t.is(res, 'baz')
})

test('get should get property if the first level is array', (t) => {
  const object = [{ a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]a[2].foo.bar.[3]')
  t.is(res, 'baz')
})

test('get should also works if path passed as array', (t) => {
  const object = [{ a: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, [0, 'a', '2', 'foo', 'bar', 3])
  t.is(res, 'baz')
})

test('get should work with "false" values as part of path', (t) => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[3]')
  t.is(res, 'baz')
})

test('get should work with nullable values', (t) => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, { null: 'baz' }] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[3]null')
  t.is(res, 'baz')
})

test('get should return default value if item is not found by path', (t) => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1, 2, 'baz'] } }] }]
  const res = get(object, '[0]false[4].foo.bar.[5]', 'some default value')
  t.is(res, 'some default value')
})

test('get should return default value if result item is not defined', (t) => {
  const object = [{ false: [1, 2, { foo: { bar: [0, 1] } }] }]
  const res = get(object, '[0]false[2].foo.bar.[2]', 'some default value')
  t.is(res, 'some default value')
})

test('get should return default value if input is null', (t) => {
  const res = get(null, 'test', 'some default value')
  t.is(res, 'some default value')
})

test('get should return default value if input is not object', (t) => {
  const res = get(true, 'test', 'some default value')
  t.is(res, 'some default value')
})
