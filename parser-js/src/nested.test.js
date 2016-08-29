const fs = require('fs')

const nested = {
  plaintext: fs.readFileSync(__dirname + '/nested.test.text', 'utf-8'),
  json: JSON.stringify(require('./nested.test.json'))
}

const parse = require('./index.js')

const actual = JSON.stringify(parse(nested.plaintext))

console.log('EXPECTED')
console.log(nested.json)
console.log('ACTUAL')
console.log(actual)
console.log('EQUAL', nested.json === actual)
