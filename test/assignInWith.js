'use strict'

const test = require('brittle')
const assert = require('assert')
const { assignInWith } = require('../index')

test('assignInWith should assign the properties of source to the object', () => {
  const object = { a: 1, b: 2 }
  assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue) => objValue + srcValue)
  assert.deepStrictEqual(object, { a: 1, b: 5, c: 4 })
})

test('assignInWith should assign the properties of source to the object with customizer and source', () => {
  const object = { a: 1, b: 2 }
  assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue, key, obj, src) => objValue + srcValue + key.length + obj.a)
  assert.deepStrictEqual(object, { a: 1, b: 7, c: 6 })
})

test('assignInWith should assign the properties of source to the object with complex customizer', () => {
  const customizer = (objValue, srcValue, key, object, source) => {
    return (key === 'd' && object.d)
      ? [...srcValue, ...object.d]
      : srcValue
  }
  const object = {}

  assignInWith(object, { a: 10, d: [1] }, { d: [3], b: 30 }, { d: [4], b: 40 }, customizer)

  assert.deepStrictEqual(object, { d: [4, 3, 1], a: 10, b: 40 })
})

test('assignInWith should handle edge cases', () => {
  const object = { a: 1, b: 2 }
  assignInWith(object)
  assert.deepStrictEqual(object, { a: 1, b: 2 })
  assignInWith(object, { b: 3, c: 4 })
  assert.deepStrictEqual(object, { a: 1, b: 2 })
  assignInWith(object, { b: 3, c: 4 }, null)
  assert.deepStrictEqual(object, { a: 1, b: 2 })
  assignInWith(object, (objValue = 0, srcValue = 0) => objValue + srcValue)
  assert.deepStrictEqual(object, { a: 1, b: 2 })
})

test('assignInWith', () => {
  const object = { a: 1, b: 2 }
  const source = { b: 4, c: 3 }

  const customizer = (objValue, srcValue) => {
    return (objValue === undefined) ? srcValue : undefined
  }
  assert.deepStrictEqual(assignInWith(object, source, customizer), { a: 1, b: 4, c: 3 })
})

test('assignInWith should handle falsy customizer values', () => {
  const object = { a: 1 }
  const source = { b: 2 }
  assignInWith(object, source, false)
  assert.deepStrictEqual(object, { a: 1 })
  assignInWith(object, source, 0)
  assert.deepStrictEqual(object, { a: 1 })
  assignInWith(object, source, '')
  assert.deepStrictEqual(object, { a: 1 })
})

test('assignInWith should handle customizer returning undefined explicitly', () => {
  const object = { a: 1 }
  const source = { b: 2, c: 3 }
  const customizer = (objValue, srcValue) => {
    return srcValue === 2 ? undefined : srcValue
  }
  assignInWith(object, source, customizer)
  assert.deepStrictEqual(object, { a: 1, b: 2, c: 3 })
})

test('assignInWith should handle customizer that returns non-undefined value', () => {
  const object = { a: 1 }
  const source = { b: 2 }
  const customizer = () => 'custom'
  assignInWith(object, source, customizer)
  assert.deepStrictEqual(object, { a: 1, b: 'custom' })
})
