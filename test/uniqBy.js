'use strict'

const test = require('brittle')
const uniqBy = require('../src/uniqBy.js')

test('uniqBy should return an array with unique elements based on the iteratee function', (t) => {
  const arr = [1, 2, 3, 4, 5, 6]
  const iteratee = (el) => el % 2
  const result = uniqBy(arr, iteratee)
  t.alike(result, [1, 2])
})

test('uniqBy should return an array with unique elements based on the property name', (t) => {
  const arr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Jane' }
  ]
  const iteratee = 'name'
  const result = uniqBy(arr, iteratee)
  t.alike(result, [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ])
})

test('uniqBy should return an empty array if the input array is empty', (t) => {
  const arr = []
  const iteratee = (el) => el
  const result = uniqBy(arr, iteratee)
  t.alike(result, [])
})

test('uniqBy should return the same array if there are no duplicate elements', (t) => {
  const arr = [1, 2, 3, 4, 5]
  const iteratee = (el) => el
  const result = uniqBy(arr, iteratee)
  t.alike(result, [1, 2, 3, 4, 5])
})

test('uniqBy should return array of unique elements if iteratee is not provided', (t) => {
  const arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1]
  const result = uniqBy(arr)
  t.alike(result, [1, 2, 3, 4, 5])
})
