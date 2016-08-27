const test = require('tape')
const parse = require('./index.js')
const fs = require('fs')

test('parse() throws', assert => {
  assert.throws(() => parse())
  assert.end()
})

test('parse(\'\') returns {}', assert => {
  assert.looseEqual(parse(''), {})
  assert.end()
})

test('simple-key', assert => {
  const plaintext = fs.readFileSync('./simple-key.text', 'utf-8')
  const actual = parse(plaintext)
  const expected = JSON.parse(fs.readFileSync('./simple-key.json'))
  assert.deepLooseEqual(actual, expected)
  assert.end()
})

test('nested', assert => {
  const plaintext = fs.readFileSync('./nested.text', 'utf-8')
  const actual = parse(plaintext)
  const expected = JSON.parse(fs.readFileSync('./nested.json'))
  assert.deepLooseEqual(actual, expected)
  assert.end()
})
