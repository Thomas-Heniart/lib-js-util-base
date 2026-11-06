'use strict'

const test = require('brittle')
const maxBy = require('../src/maxBy')

test('maxBy should return item with maximum value by iteratee function', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, (item) => item.n)
  t.is(result.n, 3)
})

test('maxBy should return item with maximum value by path string', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, 'n')
  t.is(result.n, 3)
})

test('maxBy should return undefined for empty collection', (t) => {
  const result = maxBy([], 'n')
  t.is(result, undefined)
})

test('maxBy should return first item when all values are equal', (t) => {
  const collection = [{ n: 1 }, { n: 1 }, { n: 1 }]
  const result = maxBy(collection, 'n')
  t.is(result.n, 1)
})

test('maxBy should handle undefined iteratee', (t) => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, undefined)
  t.is(result.n, 1)
})

test('maxBy should handle default collection parameter', (t) => {
  const result = maxBy(undefined, 'n')
  t.is(result, undefined)
})
