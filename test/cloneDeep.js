'use strict'

const test = require('brittle')
const { cloneDeep, isPlainObject } = require('../index')

test('cloneDeep should deep clone objects', (t) => {
  const obj = { foo: 1, bar: { baz: 'a' } }
  const clone = cloneDeep(obj)
  t.alike(obj, clone)
  t.not(obj, clone)
})

test('cloneDeep should deep clone arrays', (t) => {
  const obj = [1, [2, 3]]
  const clone = cloneDeep(obj)
  t.alike(obj, clone)
  t.not(obj, clone)
})

test('cloneDeep should not throw an error when cloning non-objects', (t) => {
  const sources = [undefined, Symbol('a'), () => {}]

  for (const obj of sources) {
    const clone = cloneDeep(obj)

    if (obj instanceof Function) {
      t.is(isPlainObject(clone), true)

      return
    }

    t.alike(obj, clone)
  }
})

test('cloneDeep should deep clone objects with regular expressions', (t) => {
  const obj = { foo: /a/ }
  const clone = cloneDeep(obj)
  t.alike(obj.foo, clone.foo)
  t.not(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with dates', (t) => {
  const obj = { foo: new Date() }
  const clone = cloneDeep(obj)
  t.alike(obj.foo, clone.foo)
  t.not(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with maps', (t) => {
  const obj = { foo: new Map() }
  const clone = cloneDeep(obj)
  t.alike(obj.foo, clone.foo)
  t.not(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with sets', (t) => {
  const obj = { foo: new Set() }
  const clone = cloneDeep(obj)
  t.alike(obj.foo, clone.foo)
  t.not(obj.foo, clone.foo)
})

test('cloneDeep should deep clone objects with circular references', (t) => {
  const obj = { foo: { bar: { baz: { } } } }
  obj.foo.bar.baz.qux = obj
  const clone = cloneDeep(obj)
  t.alike(obj.foo.bar.baz.qux, clone.foo.bar.baz.qux)
  t.not(obj.foo.bar.baz.qux, clone.foo.bar.baz.qux)
})

test('cloneDeep should deep clone Map with non-primitive keys', (t) => {
  const keyObj = { id: 1 }
  const valueObj = { name: 'test' }
  const map = new Map([[keyObj, valueObj]])
  const clone = cloneDeep(map)
  t.not(map, clone)
  const clonedKey = Array.from(clone.keys())[0]
  const clonedValue = clone.get(clonedKey)
  t.not(keyObj, clonedKey)
  t.not(valueObj, clonedValue)
  t.alike(keyObj, clonedKey)
  t.alike(valueObj, clonedValue)
})

test('cloneDeep should deep clone Set with complex values', (t) => {
  const obj1 = { id: 1 }
  const obj2 = { id: 2 }
  const set = new Set([obj1, obj2])
  const clone = cloneDeep(set)
  t.not(set, clone)
  const clonedValues = Array.from(clone)
  t.not(obj1, clonedValues[0])
  t.not(obj2, clonedValues[1])
  t.alike(obj1, clonedValues[0])
  t.alike(obj2, clonedValues[1])
})

test('cloneDeep should deep clone TypedArray', (t) => {
  const buffer = new ArrayBuffer(16)
  const uint8 = new Uint8Array(buffer)
  uint8[0] = 42
  const obj = { data: uint8 }
  const clone = cloneDeep(obj)
  t.not(obj.data, clone.data)
  t.is(clone.data.constructor, Uint8Array)
  t.is(clone.data[0], 42)
})

test('cloneDeep should deep clone Buffer', (t) => {
  const buffer = Buffer.from('hello')
  const obj = { data: buffer }
  const clone = cloneDeep(obj)
  t.not(obj.data, clone.data)
  t.is(Buffer.isBuffer(clone.data), true)
  t.is(clone.data.toString(), 'hello')
})

test('cloneDeep should handle DataView (should not clone as TypedArray)', (t) => {
  const buffer = new ArrayBuffer(16)
  const dataView = new DataView(buffer)
  const obj = { data: dataView }
  const clone = cloneDeep(obj)
  t.not(obj.data, clone.data)
  t.is(clone.data.constructor, DataView)
})
