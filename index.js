'use strict'

const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const template = handlebars.compile(fs.readFileSync(
          path.join(__dirname, 'template.hbs'), 'utf-8'))

module.exports = function (results) {
  var files = {}
  var errorCount = 0
  var warningCount = 0
  var noteCount = 0

  results.forEach(function (result) {
    const name = path.normalize(result.file)
    const severity = result.type
    var file = files[name]
    var issues
    if (!file) {
      file = files[name] = {
        name: name,
        errors: [],
        warnings: [],
        notes: []
      }
    }
    if (severity === 'error') {
      ++errorCount
      issues = file.errors
    } else if (severity === 'warning') {
      ++warningCount
      issues = file.warnings
    } else {
      ++noteCount
      issues = file.notes
    }
    issues.push({
      line: result.lastLine,
      column: result.lastColumn,
      message: result.message,
      extract: result.extract
    })
  })

  files = Object.values(files)
  return template({
    files: files,
    errorCount: errorCount,
    warningCount: warningCount,
    noteCount: noteCount
  })
}
