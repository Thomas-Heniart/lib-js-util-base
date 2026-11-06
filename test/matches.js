'use strict'

const test = require('brittle')
const matches = require('../src/matches.js')
const assert = require('assert')

test('matches should return true if the object matches the source', () => {
  const obj = { a: 1, b: 2, c: 3 }
  const src = { a: 1 }
  const result = matches(src)(obj)
  assert.strictEqual(result, true)
})

test('matches should be used to filter an array', () => {
  const arr = [{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 }]
  const src = { a: 1, b: 2 }
  const result = arr.filter(matches(src))
  assert.deepStrictEqual(result, [arr[0]])
})
