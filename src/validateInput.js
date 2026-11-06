'use strict'
// https://v8.dev/features/regexp-v-flag
// https://mathiasbynens.be/notes/es-unicode-property-escapes
// https://www.regular-expressions.info/unicode.html

const CHARACTERS = '\\p{L}\\p{M}'
const INPUT_BASE_REG_EXP = new RegExp(`-0-9.,;:<>?/\n${CHARACTERS}'_ &()/+@%`, 'u')
const DIGITS = '0-9'

const MAX_NUMBER_LENGTH = 20 // Signed int64 text, including the sign.
const NUMBER = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/
const EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
const MAX_PATH_LENGTH = 512
const PATH = /^[^/]*(?:\/[^/]*)*$/
const NAME = new RegExp(`^[-${CHARACTERS}' &()/]+$`, 'u')
const NAME_WITH_DIGITS = new RegExp(`^[-${CHARACTERS}${DIGITS}' &()/]+$`, 'u')
const INPUT = new RegExp(`^[${INPUT_BASE_REG_EXP.source}]+$`, 'u')
const ADDRESS = new RegExp(`^[${INPUT_BASE_REG_EXP.source}#]+$`, 'u')
const PHONE_CODE = /^(\+?\d{1,3}|\d{1,4})$/
const PHONE = /^\+?(\d{1,3}|\d{1,4})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
const IMAGE = /^data:image\/[A-Za-z+]+;base64,[A-Za-z0-9+/=]+$/
const FILE = /^data:(image|application|video)\/[A-Za-z0-9+]+;base64,[A-Za-z0-9+/=]+$/
const FILENAME = new RegExp(`^[-${DIGITS}.${CHARACTERS} ()_]+$`, 'u')
const PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
const URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

/**
 * @param {string} input
 * @param {'NAME'|'EMAIL'|..} format
 * @returns {boolean}
 * @throws {Error}
 */
const validateInput = (input, format) => {
  switch (format) {
    case 'NAME': return NAME.test(input)
    case 'NAME_WITH_DIGITS': return NAME_WITH_DIGITS.test(input)
    case 'NUMBER': return typeof input === 'string' && input.length <= MAX_NUMBER_LENGTH && NUMBER.test(input)
    case 'EMAIL': return EMAIL.test(input)
    case 'PATH': return typeof input === 'string' && input.length <= MAX_PATH_LENGTH && PATH.test(input)
    case 'INPUT': return INPUT.test(input)
    case 'ADDRESS': return ADDRESS.test(input)
    case 'PHONE': return PHONE.test(input)
    case 'PHONE_CODE': return PHONE_CODE.test(input)
    case 'IMAGE': return IMAGE.test(input)
    case 'FILE': return FILE.test(input)
    case 'FILENAME': return FILENAME.test(input)
    case 'PASSWORD': return PASSWORD.test(input)
    case 'URL': return URL.test(input)

    default: throw new Error('ERR_FORMAT_NOT_SUPPORTED')
  }
}

module.exports = validateInput
