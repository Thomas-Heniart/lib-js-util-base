'use strict'

const test = require('brittle')
const minBy = require('../src/minBy')

test('minBy should return item with minimum value by iteratee function', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 0 }]
  const result = minBy(collection, (item) => item.n)
  t.is(result.n, 0)
})

test('minBy should return item with minimum value by path string', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 0 }]
  const result = minBy(collection, 'n')
  t.is(result.n, 0)
})

test('minBy should return undefined for empty collection', (t) => {
  const result = minBy([], 'n')
  t.is(result, undefined)
})

test('minBy should return first item when all values are equal', (t) => {
  const collection = [{ n: 1 }, { n: 1 }, { n: 1 }]
  const result = minBy(collection, 'n')
  t.is(result.n, 1)
})

test('minBy should handle undefined iteratee', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 0 }]
  const result = minBy(collection, undefined)
  t.is(result.n, 1)
})

test('minBy should handle default collection parameter', (t) => {
  const result = minBy(undefined, 'n')
  t.is(result, undefined)
})
