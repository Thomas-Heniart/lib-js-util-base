'use strict'

const test = require('brittle')
const { validateInput } = require('../index')

test('validations NUMBER, validate numbers', (t) => {
  t.is(validateInput('100', 'NUMBER'), true)

  t.is(validateInput('-100', 'NUMBER'), true)
  t.is(validateInput('1.2', 'NUMBER'), true)
  t.is(validateInput('.2', 'NUMBER'), true)
  t.is(validateInput('-0', 'NUMBER'), true)
  t.is(validateInput('0.000023323232323', 'NUMBER'), true)

  t.is(validateInput('-0.000023323232323', 'NUMBER'), true)
  t.is(validateInput('string', 'NUMBER'), false)
})

test('validations EMAIL, validate email addresses', (t) => {
  t.is(validateInput('test5678@email.com', 'EMAIL'), true)
  t.is(validateInput('test5678test@email.com', 'EMAIL'), true)
  t.is(validateInput('test5678@email123.com', 'EMAIL'), true)
  t.is(validateInput('test5678@email123.io', 'EMAIL'), true)
  t.is(validateInput('test5678@email123.io123', 'EMAIL'), true)
  t.is(validateInput('5678test@email.com', 'EMAIL'), true)
  t.is(validateInput('test@123email.com', 'EMAIL'), true)
  t.is(validateInput('test@123email.324', 'EMAIL'), true)

  t.is(validateInput('abc', 'EMAIL'), false)
})

test('validations PATH, validate path, url', (t) => {
  t.is(validateInput('/', 'PATH'), true)
  t.is(validateInput('/path', 'PATH'), true)
  t.is(validateInput('path/', 'PATH'), true)
  t.is(validateInput('/path/test', 'PATH'), true)
  t.is(validateInput('//', 'PATH'), true)
  t.is(validateInput('/', 'PATH'), true)
  t.is(validateInput('a/b/c/d/e/f/g/c/d/f/k/d/', 'PATH'), true)
  t.is(validateInput('#', 'PATH'), true)
  t.is(validateInput('/3', 'PATH'), true)

  t.is(validateInput('', 'PATH'), true)
  t.is(validateInput('//abc', 'PATH'), true)
})

test('validations NAME, validate NAME', (t) => {
  t.is(validateInput('こんにちは', 'NAME'), true) // Japanese
  t.is(validateInput('你好', 'NAME'), true) // Chinese
  t.is(validateInput('Здравствуйте', 'NAME'), true) // Russian

  // Name with digits
  t.is(validateInput('こんにちは3', 'NAME'), false) // Japanese
  t.is(validateInput('你好4', 'NAME'), false) // Chinese
  t.is(validateInput('Здравствуйте4', 'NAME'), false) // Russian

  t.is(validateInput('*', 'NAME'), false) // special characters
  t.is(validateInput('😊', 'NAME'), false) // emoji
})

test('validations INPUT, validate input text', (t) => {
  // input with/without digits
  t.is(validateInput('こんにちは', 'INPUT'), true) // Japanese
  t.is(validateInput('你好', 'INPUT'), true) // Chinese
  t.is(validateInput('Здравствуйте', 'INPUT'), true) // Russian

  t.is(validateInput('こんにちは3', 'INPUT'), true) // Japanese
  t.is(validateInput('你好4', 'INPUT'), true) // Chinese
  t.is(validateInput('Здравствуйте4', 'INPUT'), true) // Russian

  t.is(validateInput('*', 'INPUT'), false) // special characters
  t.is(validateInput('😊', 'INPUT'), false) // emoji
})

test('validations NAME_WITH_DIGITS, validate name with digits', (t) => {
  t.is(validateInput('こんにちは3', 'NAME_WITH_DIGITS'), true) // Japanese
  t.is(validateInput('你好4', 'NAME_WITH_DIGITS'), true) // Chinese
  t.is(validateInput('Здравствуйте4', 'NAME_WITH_DIGITS'), true) // Russian

  // without digits
  t.is(validateInput('こんにちは', 'NAME_WITH_DIGITS'), true) // Japanese
  t.is(validateInput('你好', 'NAME_WITH_DIGITS'), true) // Chinese
  t.is(validateInput('Здравствуйте', 'NAME_WITH_DIGITS'), true) // Russian

  t.is(validateInput('*', 'NAME_WITH_DIGITS'), false) // special characters
  t.is(validateInput('😊', 'NAME_WITH_DIGITS'), false) // emoji
})

test('validations ADDRESS, validate address text', (t) => {
  t.is(validateInput('123 Main Street, Springfield, IL 62701, USA', 'ADDRESS'), true) // english
  t.is(validateInput('東京都新宿区西新宿2丁目8-1', 'ADDRESS'), true) // Japanese
  t.is(validateInput('北京市朝阳区建国门外大街甲12', 'ADDRESS'), true) // Chinese
  t.is(validateInput('г. Москва, ул. Тверская, д. 15', 'ADDRESS'), true) // Russian
  t.is(validateInput('м. Київ, вул. Хрещатик, 22', 'ADDRESS'), true) // Ukrainian

  // Simple addresses
  t.is(validateInput('123 Main St.', 'ADDRESS'), true)
  t.is(validateInput('456 Elm Street; Apt #2', 'ADDRESS'), true)
  t.is(validateInput('789 Maple Ave, Unit 5', 'ADDRESS'), true)
  t.is(validateInput('321 Broadway St: Suite 100', 'ADDRESS'), true)

  // punctuation in address
  t.is(validateInput('15-20 First Ave.', 'ADDRESS'), true)
  t.is(validateInput('30/40 Oak Drive', 'ADDRESS'), true)
  t.is(validateInput('25:40 Second St.', 'ADDRESS'), true)
  t.is(validateInput('47:50 3rd Blvd; Apt 4B', 'ADDRESS'), true)

  // Including special character
  t.is(validateInput('Street Name & Co.', 'ADDRESS'), true)
  t.is(validateInput('First St. + Second St.', 'ADDRESS'), true)
  t.is(validateInput('Apt #123 & 456', 'ADDRESS'), true)
  t.is(validateInput('Cross St @ 78', 'ADDRESS'), true)

  // Address with new line
  t.is(validateInput('123 Main St\nApt 4', 'ADDRESS'), true)
  t.is(validateInput('456 Elm St\nSuite B', 'ADDRESS'), true)

  // Complex address
  t.is(validateInput('221B Baker Street, London', 'ADDRESS'), true)
  t.is(validateInput('1234 Example Rd, City, State 56789', 'ADDRESS'), true)
  t.is(validateInput('PO Box 1234', 'ADDRESS'), true)
  t.is(validateInput('456 High St. #10, New York, NY 10001', 'ADDRESS'), true)
  t.is(validateInput('456 Elm St@', 'ADDRESS'), true) // special character

  // Leading/trailing spaces
  t.is(validateInput(' 123 Main St ', 'ADDRESS'), true) // leading/trailing space
  t.is(validateInput('#456 Elm St', 'ADDRESS'), true) // leading character
  t.is(validateInput('Unit 5; Apt #', 'ADDRESS'), true) // leading character
  t.is(validateInput('22 Main St? Apt', 'ADDRESS'), true) // question mark
  t.is(validateInput('\n', 'ADDRESS'), true) // newline

  // Invalid characters
  t.is(validateInput('123 Main St!', 'ADDRESS'), false) // Exclamation mark
  t.is(validateInput('789 Maple Ave#1*', 'ADDRESS'), false) // asterisk

  t.is(validateInput('', 'ADDRESS'), false) // (empty)

  // // invalid characters
  t.is(validateInput('!!!', 'ADDRESS'), false)
  // t.is(validateInput('@@@', 'ADDRESS'), false)
  t.is(validateInput('123*456', 'ADDRESS'), false) // contains asterisk

  // // improper address format
  t.is(validateInput('First St $ Apt 4', 'ADDRESS'), false) // dollar sign

  t.is(validateInput('*', 'ADDRESS'), false) // special characters
  t.is(validateInput('😊', 'ADDRESS'), false) // emoji
})

test('validations PHONE_CODE, validate phone code', (t) => {
  t.is(validateInput('+123', 'PHONE_CODE'), true) // single plus sign
  t.is(validateInput('789', 'PHONE_CODE'), true) // no plus sign
  t.is(validateInput('+1', 'PHONE_CODE'), true) // plus with digit
  t.is(validateInput('0', 'PHONE_CODE'), true) // only digit
  t.is(validateInput('+0', 'PHONE_CODE'), true) // leading plus sign with zero

  t.is(validateInput('+123456', 'PHONE_CODE'), false) // plus with multiple digits, more than 4
  t.is(validateInput('++456', 'PHONE_CODE'), false) // multiple plus sign
  t.is(validateInput('+12a34', 'PHONE_CODE'), false) // plus sign followed by non-digts
  t.is(validateInput('a123', 'PHONE_CODE'), false) // leading character
  t.is(validateInput('++', 'PHONE_CODE'), false) // double plus sign
  t.is(validateInput('', 'PHONE_CODE'), false) // (empty)
  t.is(validateInput('+ 123', 'PHONE_CODE'), false) // spaces around number
  t.is(validateInput('+123abc', 'PHONE_CODE'), false) // invalid characters mixed
  t.is(validateInput('-123', 'PHONE_CODE'), false) // negative sign
  t.is(validateInput('*', 'PHONE_CODE'), false) // special characters
  t.is(validateInput('😊', 'PHONE_CODE'), false) // emoji
})

test('validations PHONE, validate phone code', (t) => {
  t.is(validateInput('+1 234 567 8900', 'PHONE'), true)
  t.is(validateInput('123 45 678 9334', 'PHONE'), true)
  t.is(validateInput('+12 3456', 'PHONE'), true)
  t.is(validateInput('+44 20 1234 5678', 'PHONE'), true)
  t.is(validateInput('123-456-7890', 'PHONE'), true)
  t.is(validateInput('(123) 456-7890', 'PHONE'), true)
  t.is(validateInput('+91 (22) 1234 5678', 'PHONE'), true)
  t.is(validateInput('+49 30 123456', 'PHONE'), true)
  t.is(validateInput('001 234 567 8900', 'PHONE'), true)
  t.is(validateInput('+81 3-1234-5678', 'PHONE'), true)
  t.is(validateInput('0044 20 1234 5678', 'PHONE'), true)
  t.is(validateInput('12-34-56-78', 'PHONE'), true)
  t.is(validateInput('123-456-78 90', 'PHONE'), true)

  t.is(validateInput('abc-def-ghij', 'PHONE'), false) // Non-numeric
  t.is(validateInput('+44 1234 56789 0123', 'PHONE'), false) // Too long
  t.is(validateInput('+12 34-56-78-90-12', 'PHONE'), false) // Too many parts
  t.is(validateInput('+33 1 23 45 67 89', 'PHONE'), false) // Too many parts
  t.is(validateInput('++123 456', 'PHONE'), false) // Extra plus sign
  t.is(validateInput('123 456 7890a', 'PHONE'), false) // Extra character
})

test('validations IMAGE, validate image uri', (t) => {
  t.is(validateInput('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), true) // image/png
  t.is(validateInput('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIu', 'IMAGE'), true) // image/jpeg
  t.is(validateInput('data:image/gif;base64,R0lGODlhEAAQAMIAAAAAAP///wAAACH5BAEAAAAALAAAAAAQABAAAAIhIhIhIhIhIhIhIhIhIh', 'IMAGE'), true) // image/gif
  t.is(validateInput('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'IMAGE'), true) // image/svg
  t.is(validateInput('data:image/bmp;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'IMAGE'), true) // image/bmp
  t.is(validateInput('data:image/xyz;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), true) // allow all types of format

  t.is(validateInput('image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), false) // Missing data:image/
  t.is(validateInput('data:image/png,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'IMAGE'), false) // ;base64,
  t.is(validateInput('data:image/png;base64,iVBORw0KGgo@@@AAAAUA', 'IMAGE'), false) // incorrect base64
  t.is(validateInput('data:image/png;base64,', 'IMAGE'), false) // incorrect string, no base64
  t.is(validateInput('data:image/png;base64,abcde==!#%&', 'IMAGE'), false) // Missing base64
})

test('validations FILE, validate data uri', (t) => {
  t.is(validateInput('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), true) // image/png
  t.is(validateInput('data:application/pdf;base64,JVBERi0xLjQKJcfs', 'FILE'), true) // image/pdf
  t.is(validateInput('data:video/mp4;base64,AAAAFGZ0eXBNUDANCk1vZGU', 'FILE'), true) // video/mp4
  t.is(validateInput('data:video/webm;base64,GkXFo3zqEKZxKbOQGh', 'FILE'), true) // video/webm
  t.is(validateInput('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci', 'FILE'), true) // image/svg
  t.is(validateInput('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkL', 'FILE'), true) // image/jpeg
  t.is(validateInput('data:image/xyz;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), true) // allow all types of format

  t.is(validateInput('data:image;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Missing media type
  t.is(validateInput('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==', 'FILE'), false) // Invalid media type
  t.is(validateInput('data:application/json;base64,{"key":"value"}', 'FILE'), false) // Invalid media type
  t.is(validateInput('data:video/mp4;base64,AAAAFGZ0eXBNUDANCk1vZGU...', 'FILE'), false) // Correct type but incomplete format
  t.is(validateInput('data:image/png;base64 iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Missing the comma
  t.is(validateInput('data://image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', 'FILE'), false) // Incorrect syntax
  t.is(validateInput('data:image/png;base64,', 'FILE'), false) // No Base64 data
  t.is(validateInput('data:image/png;base64,abcde==!', 'FILE'), false) // Invalid characters
  t.is(validateInput('data:image/jpeg;base64,abc@123', 'FILE'), false) // Invalid characters in Base64
})

test('validations FILENAME, validate file name', (t) => {
  t.is(validateInput('valid-file.txt', 'FILENAME'), true)
  t.is(validateInput('another_valid_file123', 'FILENAME'), true)
  t.is(validateInput('file_with_spaces (and more).jpg', 'FILENAME'), true)
  t.is(validateInput('file-name_1234.pdf', 'FILENAME'), true)
  t.is(validateInput(' ', 'FILENAME'), true) // Space should be valid
  t.is(validateInput('...', 'FILENAME'), true) // Dots should be valid
  t.is(validateInput('-_', 'FILENAME'), true) // Dash and underscore should be valid

  // Special chars
  t.is(validateInput('file@name_with_special&chars.txt', 'FILENAME'), false)
  t.is(validateInput('file.name;with,commas:and<less>than>symbols', 'FILENAME'), false)
  t.is(validateInput('file_with_special_chars&%', 'FILENAME'), false)

  t.is(validateInput('invalid/file.txt', 'FILENAME'), false) // Contains /
  t.is(validateInput('invalid\\file.txt', 'FILENAME'), false) // Contains \
  t.is(validateInput('invalid:file.txt', 'FILENAME'), false) // Contains :
  t.is(validateInput('invalid*file.txt', 'FILENAME'), false) // Contains *
  t.is(validateInput('invalid|file.txt', 'FILENAME'), false) // Contains |
  t.is(validateInput('invalid<file.txt', 'FILENAME'), false) // Contains <
  t.is(validateInput('invalid>file.txt', 'FILENAME'), false) // Contains >
  t.is(validateInput('', 'FILENAME'), false) // Empty string
  t.is(validateInput('invalid?file.txt', 'FILENAME'), false) // Contains ?
})

test('validations PASSWORD, validate password', (t) => {
  // valid admin password
  t.is(validateInput('A1!strongpass', 'PASSWORD'), true)
  t.is(validateInput('Secure#Password1', 'PASSWORD'), true)
  t.is(validateInput('Another@Valid3Password', 'PASSWORD'), true)
  t.is(validateInput('Passw0rd!', 'PASSWORD'), true)
  t.is(validateInput('1234Abc!@#$', 'PASSWORD'), true)
  t.is(validateInput('Valid1Password&', 'PASSWORD'), true)
  t.is(validateInput('MyP@ssw0rd!', 'PASSWORD'), true)
  t.is(validateInput('Uppercase1!', 'PASSWORD'), true) // No lowercase letters

  t.is(validateInput('short1!', 'PASSWORD'), false) // Too short
  t.is(validateInput('nospecialchars', 'PASSWORD'), false) // No special characters
  t.is(validateInput('NOLOWERCASE1!', 'PASSWORD'), false) // No lowercase letters
  t.is(validateInput('nouppercase1!', 'PASSWORD'), false) // No uppercase letters
  t.is(validateInput('NoDigits!', 'PASSWORD'), false) // No digits
  t.is(validateInput('NoSpecialChars1', 'PASSWORD'), false) // No special characters
  t.is(validateInput('lowercase1!', 'PASSWORD'), false) // No uppercase letters
  t.is(validateInput('12345678!', 'PASSWORD'), false) // No letters
  t.is(validateInput('Password!', 'PASSWORD'), false) // No digits
})

test('validations URL, validate url', (t) => {
  t.is(validateInput('http://example.com', 'URL'), true)
  t.is(validateInput('https://example.com', 'URL'), true)
  t.is(validateInput('http://www.example.com', 'URL'), true)
  t.is(validateInput('https://www.example.com', 'URL'), true)
  t.is(validateInput('https://sub.example.com', 'URL'), true)
  t.is(validateInput('https://example.com/path/to/page', 'URL'), true)
  t.is(validateInput('https://example.com/path?name=value', 'URL'), true)
  t.is(validateInput('https://example.com/path#section', 'URL'), true)
  t.is(validateInput('https://example.com/path?name=value#section', 'URL'), true)
  t.is(validateInput('https://example.com:8080', 'URL'), true)
  t.is(validateInput('https://example..com', 'URL'), true)
  t.is(validateInput('https://example.x', 'URL'), true)
  t.is(validateInput('https://example.com/path#', 'URL'), true)

  // invalid url
  t.is(validateInput('https://', 'URL'), false)
  t.is(validateInput('example.com', 'URL'), false)
  t.is(validateInput('ftp://example.com', 'URL'), false)
  t.is(validateInput('https://example', 'URL'), false)
  t.is(validateInput('https://example com', 'URL'), false)
  t.is(validateInput('https://#section', 'URL'), false)
})

test('validations should handle unsupported format', (t) => {
  t.exception(() => validateInput('test', 'UNSUPPORTED_FORMAT'), Error)
})
