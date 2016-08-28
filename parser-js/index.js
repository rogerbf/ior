const indentationOf = require('indentation-length')
const objectFromString = require('object-from-string')(':')

const takeFirst = arr => arr.slice(0, 1)[0]

const extractKeyValuePairs = obj => {
  return Object.keys(obj).map(k => ({ key: k, value: obj[k] }))
}

function parse (str) {
  if (str === undefined) throw new Error('missing argument')
  if (typeof str !== 'string') throw new TypeError('expecting a string')

  return (function parser (arr, acc = {}, previous = { indentation: 0 }) {
    if (arr.length === 0) {
      return acc
    } else {
      const current = takeFirst(arr)
      if (current.indentation > previous.indentation) {
        return parser(arr.slice(1), acc[current.kv.key] = current.kv.value, current)
      }
      if (current.indentation === previous.indentation) {
        return parser(arr.slice(1), acc, current)
      }
      if (current.indentation < previous.indentation) {
        return parser(arr.slice(1), acc, current)
      }
    }
  })(
  str
    .split('\n')
    .reduce((acc, line) => {
      if (line.length > 0) {
        return acc.concat({
            indentation: indentationOf(line),
            kv: objectFromString(line.trim())
          })
      } else {
        return acc
      }
    }, [])
  )
}

module.exports = parse
