const fs = require('fs')

const simple = {
  plaintext: fs.readFileSync(__dirname + '/simple.test.text', 'utf-8'),
  json: JSON.stringify(require('./simple.test.json'))
}

const parse = require('./index.js')

const actual = JSON.stringify(parse(simple.plaintext))

console.log('EXPECTED')
console.log(simple.json)
console.log('ACTUAL')
console.log(actual)
console.log('EQUAL', simple.json === actual)
