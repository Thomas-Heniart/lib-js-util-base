'use strict'

const test = require('brittle')
const assert = require('assert')
const { groupBy } = require('../index')

test('groupBy should group items by string property key', () => {
  const items = [
    { id: 1, category: 'fiat', name: 'USD' },
    { id: 2, category: 'fiat', name: 'EUR' },
    { id: 3, category: 'crypto', name: 'USDT' },
    { id: 4, category: 'fiat', name: 'INR' },
    { id: 5, category: 'crypto', name: 'EURT' }
  ]

  const groupedItems = groupBy(items, 'category')

  assert.deepStrictEqual(groupedItems, {
    fiat: [
      { id: 1, category: 'fiat', name: 'USD' },
      { id: 2, category: 'fiat', name: 'EUR' },
      { id: 4, category: 'fiat', name: 'INR' }
    ],
    crypto: [
      { id: 3, category: 'crypto', name: 'USDT' },
      { id: 5, category: 'crypto', name: 'EURT' }
    ]
  })
})

test('groupBy should group items by number property key', () => {
  const items = [
    { id: 1, balance: 25 },
    { id: 2, balance: 30 },
    { id: 3, balance: 25 },
    { id: 4, balance: 40 }
  ]

  const groupedItems = groupBy(items, 'balance')

  assert.deepStrictEqual(groupedItems, {
    25: [
      { id: 1, balance: 25 },
      { id: 3, balance: 25 }
    ],
    30: [{ id: 2, balance: 30 }],
    40: [{ id: 4, balance: 40 }]
  })
})

test('groupBy should group items by computed key using a function', () => {
  const items = [
    { id: 1, category: 'fiat', name: 'USD' },
    { id: 2, category: 'fiat', name: 'EUR' },
    { id: 3, category: 'crypto', name: 'USDT' },
    { id: 4, category: 'fiat', name: 'INR' },
    { id: 5, category: 'crypto', name: 'EURT' }
  ]

  const groupedItems = groupBy(items, item => item.name.charAt(0))

  assert.deepStrictEqual(groupedItems, {
    U: [{ id: 1, category: 'fiat', name: 'USD' }, { id: 3, category: 'crypto', name: 'USDT' }],
    E: [{ id: 2, category: 'fiat', name: 'EUR' }, { id: 5, category: 'crypto', name: 'EURT' }],
    I: [{ id: 4, category: 'fiat', name: 'INR' }]
  })
})

test('groupBy should group items by function returning a number', () => {
  const items = [
    { id: 1, balance: 25 },
    { id: 2, balance: 30 },
    { id: 3, balance: 25 },
    { id: 4, balance: 40 }
  ]

  const groupedItems = groupBy(items, item => Math.floor(item.balance / 10))

  assert.deepStrictEqual(groupedItems, {
    2: [
      { id: 1, balance: 25 },
      { id: 3, balance: 25 }
    ],
    3: [{ id: 2, balance: 30 }],
    4: [{ id: 4, balance: 40 }]
  })
})

test('groupBy should handle empty array', () => {
  const items = []
  const groupedItems = groupBy(items, 'category')

  assert.deepStrictEqual(groupedItems, {})
})

test('groupBy should handle array with one item', () => {
  const items = [{ id: 1, category: 'fiat', name: 'USD' }]
  const groupedItems = groupBy(items, 'category')

  assert.deepStrictEqual(groupedItems, {
    fiat: [{ id: 1, category: 'fiat', name: 'USD' }]
  })
})
