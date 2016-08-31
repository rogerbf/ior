const indentationOf = require('indentation-length')
const objectFromString = require('object-from-string')(':')

const splitCreateObjects = str => {
  return (
  str
    .split('\n')
    .reduce((acc, line) => {
      if (line.length > 0) {
        return acc.concat({
          indentation: indentationOf(line),
          node: objectFromString(line.trim())
        })
      } else { return acc }
    }, [])
  )
}

const createTree = arr => {
  if (arr.length > 0) {
    const indentation = arr.slice(0, 1)[0].indentation
    return (
    arr
      .reduce((acc, el, i) => {
        if (el.indentation === indentation) {
          return acc.concat(Object.assign({}, { index: arr.indexOf(el) }, el))
        } else { return acc }
      }, [])
      .map((branch, i, branches) => {
        const next = branches[i + 1]
        if (arr[branch.index + 1]) {
          if (branch.indentation < arr[branch.index + 1].indentation) {
            if (next) {
              branch.children = (
                createTree(arr.slice(branch.index + 1, next.index))
              )
              return branch
            } else {
              branch.children = createTree(arr.slice(branch.index + 1))
              return branch
            }
          }
        }
        return branch
      })
    )
  }
}

const flattenTree = arr => {
  return arr.reduce((acc, el) => {
    if (el.hasOwnProperty('children')) {
      return Object.assign(acc, { [Object.keys(el.node)[0]]: flattenTree(el.children) })
    } else {
      return Object.assign(acc, el.node)
    }
  }, {})
}

function parse (str) {
  if (str === undefined) throw new Error('missing argument')
  if (typeof str !== 'string') throw new TypeError('expecting a string')
  return flattenTree(createTree(splitCreateObjects(str)))
}

module.exports = parse
