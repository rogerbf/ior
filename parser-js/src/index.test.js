const test = require('tape')
const parse = require('./index.js')
const fs = require('fs')

test('parse() throws', assert => {
  assert.throws(() => parse())
  assert.end()
})

test("parse('') returns {}", assert => {
  assert.looseEqual(parse(''), {})
  assert.end()
})

test('simple-key', assert => {
  const plaintext = 'NCC-1701:'
  const actual = JSON.stringify(parse(plaintext))
  const expected = JSON.stringify({ 'NCC-1701': {} })
  assert.equal(actual, expected)
  assert.end()
})

test('nested', assert => {
  const plaintext = fs.readFileSync(__dirname + '/nested.test.text', 'utf-8')
  const actual = parse(plaintext)
  const expected = require('./nested.test.json')
  assert.equal(actual, expected)
})
