'use strict'

const test = require('brittle')
const assert = require('assert')
const { getArrayHasIntersect } = require('../index')

test('getArrayHasIntersect should return true when arrays have common elements', () => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = [3, 4, 5, 6]
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), true)
})

test('getArrayHasIntersect should return false when arrays have no common elements', () => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = [5, 6, 7, 8]
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return false for empty arrays', () => {
  const arr1 = []
  const arr2 = []
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return false when one array is empty', () => {
  const arr1 = [1, 2, 3, 4]
  const arr2 = []
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), false)
})

test('getArrayHasIntersect should return true for arrays with equal single elements', () => {
  const arr1 = [1]
  const arr2 = [1]
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), true)
})

test('getArrayHasIntersect should return false for arrays with different single elements', () => {
  const arr1 = [1]
  const arr2 = [2]
  assert.strictEqual(getArrayHasIntersect(arr1, arr2), false)
})
