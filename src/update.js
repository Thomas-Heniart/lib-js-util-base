'use strict'

const { assertSafePath } = require('./util/assertSafePath')

/**
 * Update the object with the updater by path
 *
 * @param {object} object
 * @param {string} path
 * @param {function} updater
 */
const update = (object, path, updater) => {
  if (!object) return
  if (!path) return
  if (!updater) return
  const pathArray = assertSafePath(path)
  pathArray.reduce((parent, key, index) => {
    if (index === pathArray.length - 1) {
      parent[key] = updater(Object.hasOwn(parent, key) ? parent[key] : undefined)
      return parent
    }
    if (!Object.hasOwn(parent, key) || !parent[key]) {
      parent[key] = Object.create(null)
    }
    return parent[key]
  }, object)
}

module.exports = update
