'use strict'

const test = require('brittle')
const { getArrayHasIntersect } = require('../index')

test('getArrayHasIntersect should return true when arrays have common elements', (t) => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = [3, 4, 5, 6]
  t.is(getArrayHasIntersect(arr1, arr2), true)
})

test('getArrayHasIntersect should return false when arrays have no common elements', (t) => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = [5, 6, 7, 8]
  t.is(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return false for empty arrays', (t) => {
  const arr1 = []
  const arr2 = []
  t.is(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return false when one array is empty', (t) => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = []
  t.is(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return true for arrays with equal single elements', (t) => {
  const arr1 = [1]
  const arr2 = [1]
  t.is(getArrayHasIntersect(arr1, arr2), true)
})

test('getArrayHasIntersect should return false for arrays with different single elements', (t) => {
  const arr1 = [1]
  const arr2 = [2]
  t.is(getArrayHasIntersect(arr1, arr2), false)
})
