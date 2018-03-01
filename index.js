'use strict'

const fs = require('fs')
const path = require('path')

const objectValues = require('object.values')
if (!Object.values) {
  objectValues.shim()
}

function formatIssues (issues, panelColor) {
  return issues.map(function (issue) {
    const extract = issue.extract.split('<').join('&lt;')
    const position = 'line: ' + issue.line + ', column:' + issue.column
    const entry =
      '<div class="panel panel-' + panelColor + '">\n' +
        '<div class="panel-heading"></div>\n' +
        '<div class="panel-body">\n' +
          issue.message + '<br><br>\n' +
          '<pre><code>' + extract + '</code></pre>\n' +
        '</div>\n' +
        '<div class="panel-footer text-sm"><h4><small>' + position + '</small></h4></div>\n' +
      '</div>\n'

    return entry
  }).join('') || ''
}

function formatFile (file) {
  const errors = file.errors
  const warnings = file.warnings
  const notices = file.notices

  const returnedErrors = formatIssues(errors, 'danger')
  const returnedWarnings = formatIssues(warnings, 'warning')
  const returnedNotices = formatIssues(notices, 'primary')

  const buttonMarkup =
      '<button class="btn btn-sm btn-danger">Errors <span class="badge">' + errors.length + '</span></button>' +
      '<button class="btn btn-sm btn-warning">Warnings <span class="badge">' + warnings.length + '</span></button>' +
      '<button class="btn btn-sm btn-primary">Notices <span class="badge">' + notices.length + '</span></button>'

  const content =
      '    <div class="row">\n' +
      '      <a href="javascript:void(0)"><h2>' + file.name + '</h2></a>' +
      '      <span class="buttons">' + buttonMarkup + '</span>\n' +
      '    </div>\n' +
      '    <div class="row">' + returnedErrors + returnedWarnings + returnedNotices + '</div>\n'

  return content
}

module.exports = function (results) {
  const files = {}
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
    } else if (severity === 'info') {
      if (result.subType === 'warning') {
        ++warningCount
        issues = file.warnings
      } else {
        ++noticeCount
        issues = file.notices
      }
    } else {
      issues = []
    }
    issues.push({
      line: result.lastLine,
      column: result.lastColumn,
      message: result.message,
      extract: result.extract
    })
  })

  const template = fs.readFileSync(
    path.join(__dirname, 'template.html'), 'utf8')

  const buttonMarkup =
      '<button class="btn btn-sm btn-danger">Errors <span class="badge">' + errorCount + '</span></button>' +
      '<button class="btn btn-sm btn-warning">Warnings <span class="badge">' + warningCount + '</span></button>' +
      '<button class="btn btn-sm btn-primary">Notices <span class="badge">' + noticeCount + '</span></button>'

  const heading =
      '    <div class="row summary">\n' +
      '      <h1>HTML Validity Report</h1>' +
      '      <span class="buttons">' + buttonMarkup + '</span>\n' +
      '    </div>\n'

  const content = Object.values(files)
    .map(formatFile)
    .join('\n')

  return template.replace('<!-- Heading goes here -->', heading)
    .replace('<!-- Content goes here -->', content)
}
