'use strict'

const {getCommonPathLength} = require('common-path-start')
const {readFileSync} = require('fs')
const {basename, join, normalize} = require('path')

const objectValues = require('object.values')
if (!Object.values) {
  objectValues.shim()
}

function formatIssues (issues, panelColor) {
  return issues.map(issue => {
    const extract = issue.extract.split('<').join('&lt;')
    const message = issue.message.split('<').join('&lt;').split('"').join('&quot;')
    const line = issue.line
    const column = issue.column
    const position = 'line: ' + line + ', column: ' + column
    const positionAudio = '(at line ' + line + ' and column ' + column + ')'
    const entry =
      '<div class="panel panel-' + panelColor + '" tabindex="0" aria-label="' + message + ' ' + positionAudio + '">\n' +
        '<div class="panel-heading"></div>\n' +
        '<div class="panel-body">\n' +
          '<div class="message">' + message + '</div>\n' +
          '<pre><code>' + extract + '</code></pre>\n' +
        '</div>\n' +
        '<div class="panel-footer text-sm"><span class="heading3" role="heading" aria-level="3">' + position + '</span></div>\n' +
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
      '    <div class="row page">\n' +
      '      <button type="button"><span class="heading2" role="heading" aria-level="2">' + file.name + '</span></button>' +
      '      <span class="buttons">' + buttonMarkup + '</span>\n' +
      '    </div>\n' +
      '    <div class="row report">' + returnedErrors + returnedWarnings + returnedNotices + '</div>\n'

  return content
}

module.exports = (results, options) => {
  const showFileNameOnly = options && options.showFileNameOnly
  const showCommonPathOnly = !(options && options.showCommonPathOnly === false)
  const commonPathLength = showCommonPathOnly &&
    getCommonPathLength(results.map(result => normalize(result.file)))
  const files = {}
  let errorCount = 0
  let warningCount = 0
  let noticeCount = 0

  results.forEach(result => {
    const name = normalize(result.file)
    const severity = result.type
    let file = files[name]
    let fileName, issues
    if (!file) {
      if (showFileNameOnly) {
        fileName = basename(name)
      } else if (commonPathLength) {
        fileName = name.substr(commonPathLength)
      } else {
        fileName = name
      }
      file = files[name] = {
        name: fileName,
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

  const template = readFileSync(
    join(__dirname, 'template.html'), 'utf8')

  const buttonMarkup =
      '<button class="btn btn-sm btn-danger">Errors <span class="badge">' + errorCount + '</span></button>' +
      '<button class="btn btn-sm btn-warning">Warnings <span class="badge">' + warningCount + '</span></button>' +
      '<button class="btn btn-sm btn-primary">Notices <span class="badge">' + noticeCount + '</span></button>'

  const messageFilter = 'Enter text to filter messages with'
  const firstOccurrence = 'Warn about the first occurrence only'
  const heading =
      '    <div class="row summary">\n' +
      '      <button type="button"><span class="heading1" role="heading" aria-level="1">HTML Validity Report</span></button>' +
      '      <span class="buttons">' + buttonMarkup + '</span>\n' +
      '    </div>\n' +
      '    <div class="row filters form-group">\n' +
      '      <input id="message-filter" type="text" class="form-control input-lg" placeholder="' + messageFilter + '">\n' +
      '      <label><input id="first-occurrences" type="checkbox" aria-checked="false" aria-label="' + firstOccurrence + '"> ' + firstOccurrence + '</label>\n' +
      '    </div>\n'

  const content = Object.values(files)
    .map(formatFile)
    .join('\n')

  return template.replace('<!-- Heading goes here -->', heading)
    .replace('<!-- Content goes here -->', content)
}
