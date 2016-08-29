const indentationOf = require('indentation-length')
const objectFromString = require('object-from-string')(':')

const takeFirst = arr => arr.slice(0, 1)[0]

const splitAndClean = str => {
  return (
  str
    .split('\n')
    .reduce((acc, line) => {
      if (line.length > 0) {
        return acc.concat(
          {
            indentation: indentationOf(line),
            node: objectFromString(line.trim())
          }
        )
      } else {
        return acc
      }
    }, [])
  )
}

const tree = arr => {
  return (function createTree (arr) {
    if (arr.length > 0) {
      const indentation = takeFirst(arr).indentation
      return arr.reduce((acc, el, i) => {
        if (el.indentation === indentation) {
          return acc.concat(Object.assign(
            {},
            { index: arr.indexOf(el) },
            el
          ))
        } else {
          return acc
        }
      }, [])
        .map((leaf, i, branches) => {
          const next = branches[i + 1]
          if (arr[leaf.index + 1]) {
            if (leaf.indentation < arr[leaf.index + 1].indentation) {
              if (next) {
                const newArr = arr.slice(leaf.index + 1, next.index)
                leaf.children = createTree(newArr)
                return leaf
              } else {
                const newArr = arr.slice(leaf.index + 1)
                leaf.children = createTree(newArr)
                return leaf
              }
            }
          }
          return leaf
        })
    }
  })(arr)
}

const flattenTree = arr => {
  return (function flatten (arr) {
    return arr.reduce((acc, el) => {
      if (el.hasOwnProperty('children')) {
        return Object.assign(acc, { [Object.keys(el.node)[0]] : flatten(el.children) })
      } else {
        return Object.assign(acc, el.node)
      }
    }, {})
  })(arr)
}

function parse (str) {
  if (str === undefined) throw new Error('missing argument')
  if (typeof str !== 'string') throw new TypeError('expecting a string')

  return flattenTree(tree(splitAndClean(str)))
}

module.exports = parse
