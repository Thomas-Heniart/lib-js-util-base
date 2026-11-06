'use strict'

const test = require('brittle')
const { assignInWith } = require('../index')

test('assignInWith should assign the properties of source to the object', (t) => {
  const object = { a: 1, b: 2 }
  assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue) => objValue + srcValue)
  t.alike(object, { a: 1, b: 5, c: 4 })
})

test('assignInWith should assign the properties of source to the object with customizer and source', (t) => {
  const object = { a: 1, b: 2 }
  assignInWith(object, { b: 3, c: 4 }, (objValue = 0, srcValue, key, obj, src) => objValue + srcValue + key.length + obj.a)
  t.alike(object, { a: 1, b: 7, c: 6 })
})

test('assignInWith should assign the properties of source to the object with complex customizer', (t) => {
  const customizer = (objValue, srcValue, key, object, source) => {
    return (key === 'd' && object.d)
      ? [...srcValue, ...object.d]
      : srcValue
  }
  const object = {}

  assignInWith(object, { a: 10, d: [1] }, { d: [3], b: 30 }, { d: [4], b: 40 }, customizer)

  t.alike(object, { d: [4, 3, 1], a: 10, b: 40 })
})

test('assignInWith should handle edge cases', (t) => {
  const object = { a: 1, b: 2 }
  assignInWith(object)
  t.alike(object, { a: 1, b: 2 })
  assignInWith(object, { b: 3, c: 4 })
  t.alike(object, { a: 1, b: 2 })
  assignInWith(object, { b: 3, c: 4 }, null)
  t.alike(object, { a: 1, b: 2 })
  assignInWith(object, (objValue = 0, srcValue = 0) => objValue + srcValue)
  t.alike(object, { a: 1, b: 2 })
})

test('assignInWith', (t) => {
  const object = { a: 1, b: 2 }
  const source = { b: 4, c: 3 }

  const customizer = (objValue, srcValue) => {
    return (objValue === undefined) ? srcValue : undefined
  }
  t.alike(assignInWith(object, source, customizer), { a: 1, b: 4, c: 3 })
})

test('assignInWith should handle falsy customizer values', (t) => {
  const object = { a: 1 }
  const source = { b: 2 }
  assignInWith(object, source, false)
  t.alike(object, { a: 1 })
  assignInWith(object, source, 0)
  t.alike(object, { a: 1 })
  assignInWith(object, source, '')
  t.alike(object, { a: 1 })
})

test('assignInWith should handle customizer returning undefined explicitly', (t) => {
  const object = { a: 1 }
  const source = { b: 2, c: 3 }
  const customizer = (objValue, srcValue) => {
    return srcValue === 2 ? undefined : srcValue
  }
  assignInWith(object, source, customizer)
  t.alike(object, { a: 1, b: 2, c: 3 })
})

test('assignInWith should handle customizer that returns non-undefined value', (t) => {
  const object = { a: 1 }
  const source = { b: 2 }
  const customizer = () => 'custom'
  assignInWith(object, source, customizer)
  t.alike(object, { a: 1, b: 'custom' })
})
