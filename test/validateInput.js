'use strict'

const test = require('brittle')
const assert = require('assert')
const { validateInput } = require('../index')

test('validations NUMBER, validate numbers', () => {
  assert.strictEqual(validateInput('100', 'NUMBER'), true)

  assert.strictEqual(validateInput('-100', 'NUMBER'), true)
  assert.strictEqual(validateInput('1.2', 'NUMBER'), true)
  assert.strictEqual(validateInput('.2', 'NUMBER'), true)
  assert.strictEqual(validateInput('-0', 'NUMBER'), true)
  assert.strictEqual(validateInput('0.000023323232323', 'NUMBER'), true)

  assert.strictEqual(validateInput('-0.000023323232323', 'NUMBER'), true)
  assert.strictEqual(validateInput('string', 'NUMBER'), false)
})

test('validations EMAIL, validate email addresses', () => {
  assert.strictEqual(validateInput('test5678@email.com', 'EMAIL'), true)
  assert.strictEqual(validateInput('test5678test@email.com', 'EMAIL'), true)
  assert.strictEqual(validateInput('test5678@email123.com', 'EMAIL'), true)
  assert.strictEqual(validateInput('test5678@email123.io', 'EMAIL'), true)
  assert.strictEqual(validateInput('test5678@email123.io123', 'EMAIL'), true)
  assert.strictEqual(validateInput('5678test@email.com', 'EMAIL'), true)
  assert.strictEqual(validateInput('test@123email.com', 'EMAIL'), true)
  assert.strictEqual(validateInput('test@123email.324', 'EMAIL'), true)

  assert.strictEqual(validateInput('abc', 'EMAIL'), false)
})

test('validations PATH, validate path, url', () => {
  assert.strictEqual(validateInput('/', 'PATH'), true)
  assert.strictEqual(validateInput('/path', 'PATH'), true)
  assert.strictEqual(validateInput('path/', 'PATH'), true)
  assert.strictEqual(validateInput('/path/test', 'PATH'), true)
  assert.strictEqual(validateInput('//', 'PATH'), true)
  assert.strictEqual(validateInput('/', 'PATH'), true)
  assert.strictEqual(validateInput('a/b/c/d/e/f/g/c/d/f/k/d/', 'PATH'), true)
  assert.strictEqual(validateInput('#', 'PATH'), true)
  assert.strictEqual(validateInput('/3', 'PATH'), true)

  assert.strictEqual(validateInput('', 'PATH'), true)
  assert.strictEqual(validateInput('//abc', 'PATH'), true)
})

test('validations NAME, validate NAME', () => {
  assert.strictEqual(validateInput('こんにちは', 'NAME'), true) // Japanese
  assert.strictEqual(validateInput('你好', 'NAME'), true) // Chinese
  assert.strictEqual(validateInput('Здравствуйте', 'NAME'), true) // Russian

  // Name with digits
  assert.strictEqual(validateInput('こんにちは3', 'NAME'), false) // Japanese
  assert.strictEqual(validateInput('你好4', 'NAME'), false) // Chinese
  assert.strictEqual(validateInput('Здравствуйте4', 'NAME'), false) // Russian

  assert.strictEqual(validateInput('*', 'NAME'), false) // special characters
  assert.strictEqual(validateInput('😊', 'NAME'), false) // emoji
})

test('validations INPUT, validate input text', () => {
  // input with/without digits
  assert.strictEqual(validateInput('こんにちは', 'INPUT'), true) // Japanese
  assert.strictEqual(validateInput('你好', 'INPUT'), true) // Chinese
  assert.strictEqual(validateInput('Здравствуйте', 'INPUT'), true) // Russian

  assert.strictEqual(validateInput('こんにちは3', 'INPUT'), true) // Japanese
  assert.strictEqual(validateInput('你好4', 'INPUT'), true) // Chinese
  assert.strictEqual(validateInput('Здравствуйте4', 'INPUT'), true) // Russian

  assert.strictEqual(validateInput('*', 'INPUT'), false) // special characters
  assert.strictEqual(validateInput('😊', 'INPUT'), false) // emoji
})

test('validations NAME_WITH_DIGITS, validate name with digits', () => {
  assert.strictEqual(validateInput('こんにちは3', 'NAME_WITH_DIGITS'), true) // Japanese
  assert.strictEqual(validateInput('你好4', 'NAME_WITH_DIGITS'), true) // Chinese
  assert.strictEqual(validateInput('Здравствуйте4', 'NAME_WITH_DIGITS'), true) // Russian

  // without digits
  assert.strictEqual(validateInput('こんにちは', 'NAME_WITH_DIGITS'), true) // Japanese
  assert.strictEqual(validateInput('你好', 'NAME_WITH_DIGITS'), true) // Chinese
  assert.strictEqual(validateInput('Здравствуйте', 'NAME_WITH_DIGITS'), true) // Russian

  assert.strictEqual(validateInput('*', 'NAME_WITH_DIGITS'), false) // special characters
  assert.strictEqual(validateInput('😊', 'NAME_WITH_DIGITS'), false) // emoji
})

test('validations ADDRESS, validate address text', () => {
  assert.strictEqual(validateInput('123 Main Street, Springfield, IL 62701, USA', 'ADDRESS'), true) // english
  assert.strictEqual(validateInput('東京都新宿区西新宿2丁目8-1', 'ADDRESS'), true) // Japanese
  assert.strictEqual(validateInput('北京市朝阳区建国门外大街甲12', 'ADDRESS'), true) // Chinese
  assert.strictEqual(validateInput('г. Москва, ул. Тверская, д. 15', 'ADDRESS'), true) // Russian
  assert.strictEqual(validateInput('м. Київ, вул. Хрещатик, 22', 'ADDRESS'), true) // Ukrainian

  // Simple addresses
  assert.strictEqual(validateInput('123 Main St.', 'ADDRESS'), true)
  assert.strictEqual(validateInput('456 Elm Street; Apt #2', 'ADDRESS'), true)
  assert.strictEqual(validateInput('789 Maple Ave, Unit 5', 'ADDRESS'), true)
  assert.strictEqual(validateInput('321 Broadway St: Suite 100', 'ADDRESS'), true)

  // punctuation in address
  assert.strictEqual(validateInput('15-20 First Ave.', 'ADDRESS'), true)
  assert.strictEqual(validateInput('30/40 Oak Drive', 'ADDRESS'), true)
  assert.strictEqual(validateInput('25:40 Second St.', 'ADDRESS'), true)
  assert.strictEqual(validateInput('47:50 3rd Blvd; Apt 4B', 'ADDRESS'), true)

  // Including special character
  assert.strictEqual(validateInput('Street Name & Co.', 'ADDRESS'), true)
  assert.strictEqual(validateInput('First St. + Second St.', 'ADDRESS'), true)
  assert.strictEqual(validateInput('Apt #123 & 456', 'ADDRESS'), true)
  assert.strictEqual(validateInput('Cross St @ 78', 'ADDRESS'), true)

  // Address with new line
  assert.strictEqual(validateInput('123 Main St\nApt 4', 'ADDRESS'), true)
  assert.strictEqual(validateInput('456 Elm St\nSuite B', 'ADDRESS'), true)

  // Complex address
  assert.strictEqual(validateInput('221B Baker Street, London', 'ADDRESS'), true)
  assert.strictEqual(validateInput('1234 Example Rd, City, State 56789', 'ADDRESS'), true)
  assert.strictEqual(validateInput('PO Box 1234', 'ADDRESS'), true)
  assert.strictEqual(validateInput('456 High St. #10, New York, NY 10001', 'ADDRESS'), true)
  assert.strictEqual(validateInput('456 Elm St@', 'ADDRESS'), true) // special character

  // Leading/trailing spaces
  assert.strictEqual(validateInput(' 123 Main St ', 'ADDRESS'), true) // leading/trailing space
  assert.strictEqual(validateInput('#456 Elm St', 'ADDRESS'), true) // leading character
  assert.strictEqual(validateInput('Unit 5; Apt #', 'ADDRESS'), true) // leading character
  assert.strictEqual(validateInput('22 Main St? Apt', 'ADDRESS'), true) // question mark
  assert.strictEqual(validateInput('\n', 'ADDRESS'), true) // newline

  // Invalid characters
  assert.strictEqual(validateInput('123 Main St!', 'ADDRESS'), false) // Exclamation mark
  assert.strictEqual(validateInput('789 Maple Ave#1*', 'ADDRESS'), false) // asterisk

  assert.strictEqual(validateInput('', 'ADDRESS'), false) // (empty)

  // // invalid characters
  assert.strictEqual(validateInput('!!!', 'ADDRESS'), false)
  // assert.strictEqual(validateInput('@@@', 'ADDRESS'), false)
  assert.strictEqual(validateInput('123*456', 'ADDRESS'), false) // contains asterisk

  // // improper address format
  assert.strictEqual(validateInput('First St $ Apt 4', 'ADDRESS'), false) // dollar sign

  assert.strictEqual(validateInput('*', 'ADDRESS'), false) // special characters
  assert.strictEqual(validateInput('😊', 'ADDRESS'), false) // emoji
})

test('validations PHONE_CODE, validate phone code', () => {
  assert.strictEqual(validateInput('+123', 'PHONE_CODE'), true) // single plus sign
  assert.strictEqual(validateInput('789', 'PHONE_CODE'), true) // no plus sign
  assert.strictEqual(validateInput('+1', 'PHONE_CODE'), true) // plus with digit
  assert.strictEqual(validateInput('0', 'PHONE_CODE'), true) // only digit
  assert.strictEqual(validateInput('+0', 'PHONE_CODE'), true) // leading plus sign with zero

  assert.strictEqual(validateInput('+123456', 'PHONE_CODE'), false) // plus with multiple digits, more than 4
  assert.strictEqual(validateInput('++456', 'PHONE_CODE'), false) // multiple plus sign
  assert.strictEqual(validateInput('+12a34', 'PHONE_CODE'), false) // plus sign followed by non-digts
  assert.strictEqual(validateInput('a123', 'PHONE_CODE'), false) // leading character
  assert.strictEqual(validateInput('++', 'PHONE_CODE'), false) // double plus sign
  assert.strictEqual(validateInput('', 'PHONE_CODE'), false) // (empty)
  assert.strictEqual(validateInput('+ 123', 'PHONE_CODE'), false) // spaces around number
  assert.strictEqual(validateInput('+123abc', 'PHONE_CODE'), false) // invalid characters mixed
  assert.strictEqual(validateInput('-123', 'PHONE_CODE'), false) // negative sign
  assert.strictEqual(validateInput('*', 'PHONE_CODE'), false) // special characters
  assert.strictEqual(validateInput('😊', 'PHONE_CODE'), false) // emoji
})

test('validations PHONE, validate phone code', () => {
  assert.strictEqual(validateInput('+1 234 567 8900', 'PHONE'), true)
  assert.strictEqual(validateInput('123 45 678 9334', 'PHONE'), true)
  assert.strictEqual(validateInput('+12 3456', 'PHONE'), true)
  assert.strictEqual(validateInput('+44 20 1234 5678', 'PHONE'), true)
  assert.strictEqual(validateInput('123-456-7890', 'PHONE'), true)
  assert.strictEqual(validateInput('(123) 456-7890', 'PHONE'), true)
  assert.strictEqual(validateInput('+91 (22) 1234 5678', 'PHONE'), true)
  assert.strictEqual(validateInput('+49 30 123456', 'PHONE'), true)
  assert.strictEqual(validateInput('001 234 567 8900', 'PHONE'), true)
  assert.strictEqual(validateInput('+81 3-1234-5678', 'PHONE'), true)
  assert.strictEqual(validateInput('0044 20 1234 5678', 'PHONE'), true)
  assert.strictEqual(validateInput('12-34-56-78', 'PHONE'), true)
  assert.strictEqual(validateInput('123-456-78 90', 'PHONE'), true)

  assert.strictEqual(validateInput('abc-def-ghij', 'PHONE'), false) // Non-numeric
  assert.strictEqual(validateInput('+44 1234 56789 0123', 'PHONE'), false) // Too long
  assert.strictEqual(validateInput('+12 34-56-78-90-12', 'PHONE'), false) // Too many parts
  assert.strictEqual(validateInput('+33 1 23 45 67 89', 'PHONE'), false) // Too many parts
  assert.strictEqual(validateInput('++123 456', 'PHONE'), false) // Extra plus sign
  assert.strictEqual(validateInput('123 456 7890a', 'PHONE'), false) // Extra character
})

test('validations IMAGE, validate image uri', () => {
  assert.strictEqual(validateInput('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), true) // image/png
  assert.strictEqual(validateInput('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIu', 'IMAGE'), true) // image/jpeg
  assert.strictEqual(validateInput('data:image/gif;base64,R0lGODlhEAAQAMIAAAAAAP///wAAACH5BAEAAAAALAAAAAAQABAAAAIhIhIhIhIhIhIhIhIhIh', 'IMAGE'), true) // image/gif
  assert.strictEqual(validateInput('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'IMAGE'), true) // image/svg
  assert.strictEqual(validateInput('data:image/bmp;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'IMAGE'), true) // image/bmp
  assert.strictEqual(validateInput('data:image/xyz;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), true) // allow all types of format

  assert.strictEqual(validateInput('image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), false) // Missing data:image/
  assert.strictEqual(validateInput('data:image/png,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), false) // ;base64,
  assert.strictEqual(validateInput('data:image/png;base64,iVBORw0KGgo@@@AAAAUA', 'IMAGE'), false) // incorrect base64
  assert.strictEqual(validateInput('data:image/png;base64,', 'IMAGE'), false) // incorrect string, no base64
  assert.strictEqual(validateInput('data:image/png;base64,abcde==!#%&', 'IMAGE'), false) // Missing base64
})

test('validations FILE, validate data uri', () => {
  assert.strictEqual(validateInput('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), true) // image/png
  assert.strictEqual(validateInput('data:application/pdf;base64,JVBERi0xLjQKJcfs', 'FILE'), true) // image/pdf
  assert.strictEqual(validateInput('data:video/mp4;base64,AAAAFGZ0eXBNUDANCk1vZGU', 'FILE'), true) // video/mp4
  assert.strictEqual(validateInput('data:video/webm;base64,GkXFo3zqEKZxKbOQGh', 'FILE'), true) // video/webm
  assert.strictEqual(validateInput('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'FILE'), true) // image/svg
  assert.strictEqual(validateInput('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkL', 'FILE'), true) // image/jpeg
  assert.strictEqual(validateInput('data:image/xyz;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), true) // allow all types of format

  assert.strictEqual(validateInput('data:image;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Missing media type
  assert.strictEqual(validateInput('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==', 'FILE'), false) // Invalid media type
  assert.strictEqual(validateInput('data:application/json;base64,{"key":"value"}', 'FILE'), false) // Invalid media type
  assert.strictEqual(validateInput('data:video/mp4;base64,AAAAFGZ0eXBNUDANCk1vZGU...', 'FILE'), false) // Correct type but incomplete format
  assert.strictEqual(validateInput('data:image/png;base64 iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Missing the comma
  assert.strictEqual(validateInput('data://image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Incorrect syntax
  assert.strictEqual(validateInput('data:image/png;base64,', 'FILE'), false) // No Base64 data
  assert.strictEqual(validateInput('data:image/png;base64,abcde==!', 'FILE'), false) // Invalid characters
  assert.strictEqual(validateInput('data:image/jpeg;base64,abc@123', 'FILE'), false) // Invalid characters in Base64
})

test('validations FILENAME, validate file name', () => {
  assert.strictEqual(validateInput('valid-file.txt', 'FILENAME'), true)
  assert.strictEqual(validateInput('another_valid_file123', 'FILENAME'), true)
  assert.strictEqual(validateInput('file_with_spaces (and more).jpg', 'FILENAME'), true)
  assert.strictEqual(validateInput('file-name_1234.pdf', 'FILENAME'), true)
  assert.strictEqual(validateInput(' ', 'FILENAME'), true) // Space should be valid
  assert.strictEqual(validateInput('...', 'FILENAME'), true) // Dots should be valid
  assert.strictEqual(validateInput('-_', 'FILENAME'), true) // Dash and underscore should be valid

  // Special chars
  assert.strictEqual(validateInput('file@name_with_special&chars.txt', 'FILENAME'), false)
  assert.strictEqual(validateInput('file.name;with,commas:and<less>than>symbols', 'FILENAME'), false)
  assert.strictEqual(validateInput('file_with_special_chars&%', 'FILENAME'), false)

  assert.strictEqual(validateInput('invalid/file.txt', 'FILENAME'), false) // Contains /
  assert.strictEqual(validateInput('invalid\\file.txt', 'FILENAME'), false) // Contains \
  assert.strictEqual(validateInput('invalid:file.txt', 'FILENAME'), false) // Contains :
  assert.strictEqual(validateInput('invalid*file.txt', 'FILENAME'), false) // Contains *
  assert.strictEqual(validateInput('invalid|file.txt', 'FILENAME'), false) // Contains |
  assert.strictEqual(validateInput('invalid<file.txt', 'FILENAME'), false) // Contains <
  assert.strictEqual(validateInput('invalid>file.txt', 'FILENAME'), false) // Contains >
  assert.strictEqual(validateInput('', 'FILENAME'), false) // Empty string
  assert.strictEqual(validateInput('invalid?file.txt', 'FILENAME'), false) // Contains ?
})

test('validations PASSWORD, validate password', () => {
  // valid admin password
  assert.strictEqual(validateInput('A1!strongpass', 'PASSWORD'), true)
  assert.strictEqual(validateInput('Secure#Password1', 'PASSWORD'), true)
  assert.strictEqual(validateInput('Another@Valid3Password', 'PASSWORD'), true)
  assert.strictEqual(validateInput('Passw0rd!', 'PASSWORD'), true)
  assert.strictEqual(validateInput('1234Abc!@#$', 'PASSWORD'), true)
  assert.strictEqual(validateInput('Valid1Password&', 'PASSWORD'), true)
  assert.strictEqual(validateInput('MyP@ssw0rd!', 'PASSWORD'), true)
  assert.strictEqual(validateInput('Uppercase1!', 'PASSWORD'), true) // No lowercase letters

  assert.strictEqual(validateInput('short1!', 'PASSWORD'), false) // Too short
  assert.strictEqual(validateInput('nospecialchars', 'PASSWORD'), false) // No special characters
  assert.strictEqual(validateInput('NOLOWERCASE1!', 'PASSWORD'), false) // No lowercase letters
  assert.strictEqual(validateInput('nouppercase1!', 'PASSWORD'), false) // No uppercase letters
  assert.strictEqual(validateInput('NoDigits!', 'PASSWORD'), false) // No digits
  assert.strictEqual(validateInput('NoSpecialChars1', 'PASSWORD'), false) // No special characters
  assert.strictEqual(validateInput('lowercase1!', 'PASSWORD'), false) // No uppercase letters
  assert.strictEqual(validateInput('12345678!', 'PASSWORD'), false) // No letters
  assert.strictEqual(validateInput('Password!', 'PASSWORD'), false) // No digits
})

test('validations URL, validate url', () => {
  assert.strictEqual(validateInput('http://example.com', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com', 'URL'), true)
  assert.strictEqual(validateInput('http://www.example.com', 'URL'), true)
  assert.strictEqual(validateInput('https://www.example.com', 'URL'), true)
  assert.strictEqual(validateInput('https://sub.example.com', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com/path/to/page', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com/path?name=value', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com/path#section', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com/path?name=value#section', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com:8080', 'URL'), true)
  assert.strictEqual(validateInput('https://example..com', 'URL'), true)
  assert.strictEqual(validateInput('https://example.x', 'URL'), true)
  assert.strictEqual(validateInput('https://example.com/path#', 'URL'), true)

  // invalid url
  assert.strictEqual(validateInput('https://', 'URL'), false)
  assert.strictEqual(validateInput('example.com', 'URL'), false)
  assert.strictEqual(validateInput('ftp://example.com', 'URL'), false)
  assert.strictEqual(validateInput('https://example', 'URL'), false)
  assert.strictEqual(validateInput('https://example com', 'URL'), false)
  assert.strictEqual(validateInput('https://#section', 'URL'), false)
})

test('validations should handle unsupported format', () => {
  assert.throws(() => validateInput('test', 'UNSUPPORTED_FORMAT'), Error)
})
