'use strict'

const test = require('brittle')
const assert = require('assert')
const { cloneDeep, isPlainObject } = require('../index')

test('cloneDeep should deep clone objects', () => {
  const obj = { foo: 1, bar: { baz: 'a' } }
  const clone = cloneDeep(obj)
  assert.deepStrictEqual(obj, clone)
  assert.notStrictEqual(obj, clone)
})

test('cloneDeep should deep clone arrays', () => {
  const obj = [1, [2, 3]]
  const clone = cloneDeep(obj)
  assert.deepStrictEqual(obj, clone)
  assert.notStrictEqual(obj, clone)
})

test('cloneDeep should not throw an error when cloning non-objects', () => {
  const sources = [undefined, Symbol('a'), () => {}]

  for (const obj of sources) {
    const clone = cloneDeep(obj)

    if (obj instanceof Function) {
      assert.strictEqual(isPlainObject(clone), true)

      return
    }

    assert.deepStrictEqual(obj, clone)
  }
})

test('cloneDeep should deep clone objects with regular expressions', () => {
  const obj = { foo: /a/ }
  const clone = cloneDeep(obj)
  assert.deepEqual(obj.foo, clone.foo)
  assert.notStrictEqual(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with dates', () => {
  const obj = { foo: new Date() }
  const clone = cloneDeep(obj)
  assert.deepEqual(obj.foo, clone.foo)
  assert.notStrictEqual(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with maps', () => {
  const obj = { foo: new Map() }
  const clone = cloneDeep(obj)
  assert.deepEqual(obj.foo, clone.foo)
  assert.notStrictEqual(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with sets', () => {
  const obj = { foo: new Set() }
  const clone = cloneDeep(obj)
  assert.deepEqual(obj.foo, clone.foo)
  assert.notStrictEqual(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with circular references', () => {
  const obj = { foo: { bar: { baz: { } } } }
  obj.foo.bar.baz.qux = obj
  const clone = cloneDeep(obj)
  assert.deepEqual(obj.foo.bar.baz.qux, clone.foo.bar.baz.qux)
  assert.notStrictEqual(obj.foo.bar.baz.qux, clone.foo.bar.baz.qux)
})

test('cloneDeep should deep clone Map with non-primitive keys', () => {
  const keyObj = { id: 1 }
  const valueObj = { name: 'test' }
  const map = new Map([[keyObj, valueObj]])
  const clone = cloneDeep(map)
  assert.notStrictEqual(map, clone)
  const clonedKey = Array.from(clone.keys())[0]
  const clonedValue = clone.get(clonedKey)
  assert.notStrictEqual(keyObj, clonedKey)
  assert.notStrictEqual(valueObj, clonedValue)
  assert.deepStrictEqual(keyObj, clonedKey)
  assert.deepStrictEqual(valueObj, clonedValue)
})

test('cloneDeep should deep clone Set with complex values', () => {
  const obj1 = { id: 1 }
  const obj2 = { id: 2 }
  const set = new Set([obj1, obj2])
  const clone = cloneDeep(set)
  assert.notStrictEqual(set, clone)
  const clonedValues = Array.from(clone)
  assert.notStrictEqual(obj1, clonedValues[0])
  assert.notStrictEqual(obj2, clonedValues[1])
  assert.deepStrictEqual(obj1, clonedValues[0])
  assert.deepStrictEqual(obj2, clonedValues[1])
})

test('cloneDeep should deep clone TypedArray', () => {
  const buffer = new ArrayBuffer(16)
  const uint8 = new Uint8Array(buffer)
  uint8[0] = 42
  const obj = { data: uint8 }
  const clone = cloneDeep(obj)
  assert.notStrictEqual(obj.data, clone.data)
  assert.strictEqual(clone.data.constructor, Uint8Array)
  assert.strictEqual(clone.data[0], 42)
})

test('cloneDeep should deep clone Buffer', () => {
  const buffer = Buffer.from('hello')
  const obj = { data: buffer }
  const clone = cloneDeep(obj)
  assert.notStrictEqual(obj.data, clone.data)
  assert.strictEqual(Buffer.isBuffer(clone.data), true)
  assert.strictEqual(clone.data.toString(), 'hello')
})

test('cloneDeep should handle DataView (should not clone as TypedArray)', () => {
  const buffer = new ArrayBuffer(16)
  const dataView = new DataView(buffer)
  const obj = { data: dataView }
  const clone = cloneDeep(obj)
  assert.notStrictEqual(obj.data, clone.data)
  assert.strictEqual(clone.data.constructor, DataView)
})
