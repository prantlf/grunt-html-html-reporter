const test = require('tehanu')('getCommonPathStart')
const { strictEqual } = require('assert')
const report = require('..')
const fs = require('fs')
const path = require('path')

test('module exports a function', () => {
  strictEqual(typeof report, 'function')
})

test('transforms JSON object to string in HTML format', () => {
  const file = path.join(__dirname, 'results', 'report.json')
  const results = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const expected = fs.readFileSync(path.join(__dirname, 'results',
    'common-path.html'), 'utf-8')
  const actual = report(results)
  strictEqual(typeof actual, 'string')
  strictEqual(expected, actual)
})

test('optionally generates page titles from file names without directory', () => {
  const file = path.join(__dirname, 'results', 'report.json')
  const results = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const expected = fs.readFileSync(path.join(__dirname, 'results',
    'name-only.html'), 'utf-8')
  const actual = report(results, {
    showFileNameOnly: true
  })
  strictEqual(typeof actual, 'string')
  strictEqual(expected, actual)
})

test('optionally generates page titles with full file paths', () => {
  const file = path.join(__dirname, 'results', 'report.json')
  const results = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const expected = fs.readFileSync(path.join(__dirname, 'results',
    'full-path.html'), 'utf-8')
  const actual = report(results, {
    showCommonPathOnly: false
  })
  strictEqual(typeof actual, 'string')
  strictEqual(expected, actual)
})
