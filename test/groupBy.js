'use strict'

const test = require('brittle')
const { groupBy } = require('../index')

test('groupBy should group items by string property key', (t) => {
  const items = [
    { id: 1, category: 'fiat', name: 'USD' },
    { id: 2, category: 'fiat', name: 'EUR' },
    { id: 3, category: 'crypto', name: 'USDT' },
    { id: 4, category: 'fiat', name: 'INR' },
    { id: 5, category: 'crypto', name: 'EURT' }
  ]

  const groupedItems = groupBy(items, 'category')

  t.alike(groupedItems, {
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

test('groupBy should group items by number property key', (t) => {
  const items = [
    { id: 1, balance: 25 },
    { id: 2, balance: 30 },
    { id: 3, balance: 25 },
    { id: 4, balance: 40 }
  ]

  const groupedItems = groupBy(items, 'balance')

  t.alike(groupedItems, {
    25: [
      { id: 1, balance: 25 },
      { id: 3, balance: 25 }
    ],
    30: [{ id: 2, balance: 30 }],
    40: [{ id: 4, balance: 40 }]
  })
})

test('groupBy should group items by computed key using a function', (t) => {
  const items = [
    { id: 1, category: 'fiat', name: 'USD' },
    { id: 2, category: 'fiat', name: 'EUR' },
    { id: 3, category: 'crypto', name: 'USDT' },
    { id: 4, category: 'fiat', name: 'INR' },
    { id: 5, category: 'crypto', name: 'EURT' }
  ]

  const groupedItems = groupBy(items, item => item.name.charAt(0))

  t.alike(groupedItems, {
    U: [{ id: 1, category: 'fiat', name: 'USD' }, { id: 3, category: 'crypto', name: 'USDT' }],
    E: [{ id: 2, category: 'fiat', name: 'EUR' }, { id: 5, category: 'crypto', name: 'EURT' }],
    I: [{ id: 4, category: 'fiat', name: 'INR' }]
  })
})

test('groupBy should group items by function returning a number', (t) => {
  const items = [
    { id: 1, balance: 25 },
    { id: 2, balance: 30 },
    { id: 3, balance: 25 },
    { id: 4, balance: 40 }
  ]

  const groupedItems = groupBy(items, item => Math.floor(item.balance / 10))

  t.alike(groupedItems, {
    2: [
      { id: 1, balance: 25 },
      { id: 3, balance: 25 }
    ],
    3: [{ id: 2, balance: 30 }],
    4: [{ id: 4, balance: 40 }]
  })
})

test('groupBy should handle empty array', (t) => {
  const items = []
  const groupedItems = groupBy(items, 'category')

  t.alike(groupedItems, {})
})

test('groupBy should handle array with one item', (t) => {
  const items = [{ id: 1, category: 'fiat', name: 'USD' }]
  const groupedItems = groupBy(items, 'category')

  t.alike(groupedItems, {
    fiat: [{ id: 1, category: 'fiat', name: 'USD' }]
  })
})
