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
  var noticeCount = 0

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
        notices: []
      }
    }
    if (severity === 'error' || severity === 'non-document-error') {
      ++errorCount
      issues = file.errors
    } else if (severity === 'info' && result.subType === 'warning') {
      ++warningCount
      issues = file.warnings
    } else {
      ++noticeCount
      issues = file.notices
    }
    issues.push({
      line: result.lastLine,
      column: result.lastColumn,
      message: result.message,
      extract: result.extract
    })
  })

  return template({
    files: Object.values(files),
    errorCount: errorCount,
    warningCount: warningCount,
    noticeCount: noticeCount
  })
}
