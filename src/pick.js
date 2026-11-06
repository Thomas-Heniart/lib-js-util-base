'use strict'

const get = require('./get')
const { assertSafePath } = require('./util/assertSafePath')

/**
 *
 * @param {any} nested
 * @param {Array<string>} path
 * @param {any} value
 * @returns
 */
const _setObjByPath = (nested, path, value) => {
  if (path.length === 1) {
    nested[path[0]] = value
    return nested
  }

  const currentProp = path.shift()
  if (!Object.hasOwn(nested, currentProp)) {
    nested[currentProp] = Object.create(null)
  }

  return _setObjByPath(nested[currentProp], path, value)
}

/**
 *
 * @param {object} src
 * @param {object} dest
 * @param {string | Array<string>} path
 * @returns
 */
const _pickByPath = (src, dest, path) => {
  const pathArr = assertSafePath(path)

  const value = get(src, [...pathArr])
  if (value !== undefined) {
    _setObjByPath(dest, pathArr, value)
  }
  return dest
}

/**
 *
 * @param {any} obj
 * @param  {...(string | Array<string | Array<strig>>)} pathes
 * @returns
 */
const pick = (obj, ...pathes) => {
  if (obj === null) {
    return Object.create(null)
  }

  const newObj = Object.create(null)
  for (const path of pathes) {
    if (typeof path === 'string') {
      _pickByPath(obj, newObj, path)
    }
    if (Array.isArray(path)) {
      for (const chunk of path) {
        _pickByPath(obj, newObj, chunk)
      }
    }
  }

  return newObj
}

module.exports = pick
