# grunt-html-html-reporter

[![Latest version](https://img.shields.io/npm/v/grunt-html-html-reporter)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/grunt-html-html-reporter)
](https://www.npmjs.com/package/grunt-html-html-reporter)
[![Coverage](https://codecov.io/gh/prantlf/grunt-html-html-reporter/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/grunt-html-html-reporter)

A custom reporter for [grunt-html] - the HTML validation task - which formats the validation results to HTML. There is a [Grunt] task available for converting already written report files, which uses this reporter - [grunt-html-html-report-converter].

## Installation

You can use the reporter programmatically. In that case you do not need [Grunt] as stated below. You can also use the reporter directly with the [grunt-html] task. The reporter is usually installed and used together with other development tasks.

You need [node >= 6][node] and [grunt >= 0.4][Grunt] installed and your project build managed by a [Gruntfile] with the necessary modules listed in [package.json], including [grunt-html]. If you haven't used Grunt before, be sure to check out the [Getting Started] guide, as it explains how to create a Gruntfile as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with your favourite package manager:

```sh
npm i -D grunt-html-html-reporter
pnpm i -D grunt-html-html-reporter
yarn add -D grunt-html-html-reporter
```

## Programmatic Usage

You can use the reporter programmatically to process accessibility results as an object in JavaScript. For example, for converting a JSON report file to a HTML report file:

```js
const report = require('grunt-html-html-reporter')
const input = fs.readFileSync('report.json', 'utf-8')
const results = JSON.parse(input)
const output = report(results, {
  showFileNameOnly: false
})
fs.writeFileSync('report.html', output, 'utf-8')
```

### Options

#### showFileNameOnly
Type: `Boolean`
Default value: `false`

Cuts the directory from tested HTML files, when creating page titles of them in the report. If you use unique names for files alone, you will not get too long page titles, if you flip this flag tp `true`.

#### showCommonPathOnly
Type: `Boolean`
Default value: `true`

Cuts the same initial part of the path from tested HTML files, when the paths are used for page titles in the report. If you use sub-directories to organize your files, this option will make the file paths in the report short, but still unique. The default is flipped to `true` already.

## Usage with grunt-html

The value of the [`reporter`] property of the [`htmllint`] task has to be a path to this module, relative to the `Gruntfile.js`, in which the task is used:

```js
htmllint: {
  options: {
    errorlevels: ['error', 'warning', 'info'],
    reporter: './node_modules/grunt-html-html-reporter',
    reporterOutput: 'output/report.html',
  },
  all: {
    src: ['input/*.html']
  }
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## License

Copyright (c) 2017-2022 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[grunt-html]: https://github.com/jzaefferer/grunt-html
[`reporter`]: https://github.com/jzaefferer/grunt-html#reporter
[`htmllint`]: https://github.com/jzaefferer/grunt-html#getting-started
[grunt-html-html-report-converter]: https://github.com/prantlf/grunt-html-html-report-converter
