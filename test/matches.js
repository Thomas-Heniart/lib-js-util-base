'use strict'

const test = require('brittle')
const matches = require('../src/matches.js')

test('matches should return true if the object matches the source', (t) => {
  const obj = { a: 1, b: 2, c: 3 }
  const src = { a: 1 }
  const result = matches(src)(obj)
  t.is(result, true)
})

test('matches should be used to filter an array', (t) => {
  const arr = [{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 }]
  const src = { a: 1, b: 2 }
  const result = arr.filter(matches(src))
  t.alike(result, [arr[0]])
})
