'use strict'

const test = require('brittle')
const { shuffle } = require('../index')

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

test('shuffle should return a new array', (t) => {
  t.ok(shuffle(array).some((x, i) => array[i] !== x))
})

test('shuffle should contain the same elements after a collection is shuffled', (t) => {
  t.alike(shuffle(array).sort((a, b) => a - b), array)
})
