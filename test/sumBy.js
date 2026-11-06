'use strict'

const test = require('brittle')
const { sumBy } = require('../index')

test('sumBy should return a sum by iteratee function', (t) => {
  t.is(sumBy([{ foo: 1 }, { foo: 2 }, { foo: 3 }], (i) => i.foo), 6)
})

test('sumBy should return a sum by iteratee shortcut', (t) => {
  t.is(sumBy([{ foo: { bar: 4 } }, { foo: { bar: 5 } }, { foo: { bar: 6 } }], 'foo.bar'), 15)
})

test('sumBy should return 0 if iteratee argument is not a function or a string', (t) => {
  t.is(sumBy([{ foo: 1 }, { foo: 2 }, { foo: 3 }], {}), 0)
  t.is(sumBy([{ foo: 1 }, { foo: 2 }, { foo: 3 }], null), 0)
})

test('sumBy should return 0 if array is empty', (t) => {
  t.is(sumBy([], (i) => i.foo), 0)
})

test('sumBy should return 0 if first argument is not an array', (t) => {
  t.is(sumBy({}, (i) => i.foo), 0)
})

test('sumBy should skip zero or nullable elements', (t) => {
  t.is(sumBy([1, 2, undefined, null, 0], (i) => i), 3)
})
