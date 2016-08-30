const test = require('tape')
const parse = require('./index.js')

test('parse() throws', assert => {
  assert.throws(() => parse())
  assert.end()
})

test("parse('') returns {}", assert => {
  assert.looseEqual(parse(''), {})
  assert.end()
})

test('simple-key', assert => {
  assert.plan(1)
  const plaintext = 'NCC-1701:'
  const actual = JSON.stringify(parse(plaintext))
  const expected = JSON.stringify({ 'NCC-1701': {} })
  assert.equal(actual, expected)
})
