const indentationOf = require('indentation-length')
const convertToObject = require('object-from-string')(':')

function parse (str) {
  if (str === undefined) throw new Error('missing argument')
  if (typeof str !== 'string') throw new TypeError('expecting a string')
  return (function parser (arr, acc = {}) {
    if (arr.length === 0) {
      return acc
    } else {
      const current = convertToObject(arr.slice(0, 1)[0].line)
      return parser(arr.slice(1), Object.assign(acc, current))
    }
  })(
  str
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => ({ indentation: indentationOf(line), line }))
  )
}

module.exports = parse
