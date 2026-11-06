'use strict'

const test = require('brittle')
const { merge } = require('../index')

test('merge should merge `source` into `object`', (t) => {
  const names = {
    characters: [
      { name: 'barney' },
      { name: 'fred' }
    ]
  }

  const ages = {
    characters: [
      { age: 36 },
      { age: 40 }
    ]
  }

  const heights = {
    characters: [
      { height: '5\'4"' },
      { height: '5\'5"' }
    ]
  }

  const expected = {
    characters: [
      { name: 'barney', age: 36, height: '5\'4"' },
      { name: 'fred', age: 40, height: '5\'5"' }
    ]
  }

  t.alike(merge(names, ages, heights), expected)
})

test('merge should merge sources containing circular references', (t) => {
  const object = {
    foo: { a: 1 },
    bar: { a: 2 }
  }

  const source = {
    foo: { b: { c: { d: {} } } },
    bar: {}
  }

  source.foo.b.c.d = source
  source.bar.b = source.foo.b

  const actual = merge(object, source)

  t.is(actual.bar.b, actual.foo.b)
  t.is(actual.foo.b.c.d, actual.foo.b.c.d.foo.b.c.d)
})

test('merge should work with four arguments', (t) => {
  const expected = { a: 4 }
  const actual = merge({ a: 1 }, { a: 2 }, { a: 3 }, expected)

  t.alike(actual, expected)
})

test('merge should assign `null` values', (t) => {
  const actual = merge({ a: 1 }, { a: null })
  t.is(actual.a, null)
})

test('merge should not augment source objects', (t) => {
  const source1 = { a: [{ a: 1 }] }
  const source2 = { a: [{ b: 2 }] }
  const actual = merge({}, source1, source2)

  t.alike(source1.a, [{ a: 1 }])
  t.alike(source2.a, [{ b: 2 }])
  t.alike(actual.a, [{ a: 1, b: 2 }])
})

test('merge should return sources if target is not a plain object or sources is not an array', (t) => {
  const nonPlainObjTarget = () => { }
  const nonArraySources = { a: 1 }
  t.alike(merge(nonPlainObjTarget, nonArraySources), nonArraySources)
})

test(
  'merge ' + ('should return array of sources if target is not a plain object or sources is not an array' +
    'but multiple sources are provided'),
  (t) => {
    const nonPlainObjTarget = () => { }
    const sources = [{ a: 1 }, { b: 2 }]
    t.alike(merge(nonPlainObjTarget, ...sources), sources)
  }
)

test('merge should concatenate additional elements in source array', (t) => {
  const target = { a: [1, 2] }
  const source = { a: [3, 4, 5] }
  const expected = { a: [3, 4, 5] }
  t.alike(merge(target, source), expected)
})

test('merge should keep elements that exceed length', (t) => {
  const target = { a: [1, 2, 3] }
  const source = { a: [4, 5] }
  const expected = { a: [4, 5, 3] }
  t.alike(merge(target, source), expected)
})

test('merge should not merge if target value or source value is not a plain object', (t) => {
  const target = { a: { b: 1 } }
  const source = { a: 'string' }
  const expected = { a: 'string' }
  t.alike(merge(target, source), expected)
})

test('merge should override target value with source value if source value is neither an array nor a plain object', (t) => {
  const target = { a: 1 }
  const source = { a: 'string' }
  const expected = { a: 'string' }
  t.alike(merge(target, source), expected)
})

test('merge should return a shallow copy if cloneDeep throws an error', (t) => {
  const circularObj = {}
  circularObj.self = circularObj
  t.alike(merge({}, circularObj), Object.assign({}, circularObj))
})

test('merge should not throw an error with non-plain objects in sources', (t) => {
  const expected = { a: 4 }
  const actual = merge({ a: 1 }, expected, undefined, null, true, '', NaN, /x/, Symbol('a'))

  t.alike(actual, expected)
})
