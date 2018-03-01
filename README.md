# grunt-html-html-reporter

[![NPM version](https://badge.fury.io/js/grunt-html-html-reporter.png)](http://badge.fury.io/js/grunt-html-html-reporter) [![Build Status](https://travis-ci.org/prantlf/grunt-html-html-reporter.svg?branch=master)](https://travis-ci.org/prantlf/grunt-html-html-reporter) [![Dependency Status](https://david-dm.org/prantlf/grunt-html-html-reporter.svg)](https://david-dm.org/prantlf/grunt-html-html-reporter) [![devDependency Status](https://david-dm.org/prantlf/grunt-html-html-reporter/dev-status.svg)](https://david-dm.org/prantlf/grunt-html-html-reporter#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/prantlf/grunt-html-html-reporter.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM Downloads](https://nodei.co/npm/grunt-html-html-reporter.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-html-html-reporter)

A custom reporter for [grunt-html] - the HTML validation task - which formats the validation results to HTML. There is a [Grunt] task available for converting already written report files, which uses this reporter - [grunt-html-html-report-converter].

## Installation

You can use the reporter programmatically. In that case you do not need [Grunt] as stated below. You can also use the reporter directly with the [grunt-html] task. The reporter is usually installed and used together with other development tasks.

You need [node >= 4][node], [npm] and [grunt >= 0.4][Grunt] installed and your project build managed by a [Gruntfile] with the necessary modules listed in [package.json], including [grunt-html]. If you haven't used Grunt before, be sure to check out the [Getting Started] guide, as it explains how to create a Gruntfile as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```sh
$ npm install grunt-html-html-reporter --save-dev
```

## Programmatic Usage

You can use the reporter programmatically to process accessibility results as an object in JavaScript. For example, for converting a JSON report file to a HTML report file:

```js
const report = require('grunt-html-html-reporter')
const input = fs.readFileSync('report.json', 'utf-8')
const results = JSON.parse(input)
const output = report(results)
fs.writeFileSync('report.html', output, 'utf-8')
```

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

## Release History

 * 2018-03-01   v2.0.0   Change the HTML format to look like Koa11y reports
 * 2018-03-01   v1.0.0   Release a stable version using a simple HTML format
 * 2018-02-28   v0.2.4   Add \<meta charset="utf-8"\> to the HTML page
 * 2018-01-27   v0.2.2   Do not report unknown messqge types as notices
 * 2017-11-25   v0.2.1   Support Node.js < 7
 * 2017-11-24   v0.2.0   Fix recognition of warnings,
                         say "notices" instead of "notes"
 * 2017-11-24   v0.0.1   Initial release

## License

Copyright (c) 2017-2018 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[grunt-html]: https://github.com/jzaefferer/grunt-html
[`reporter`]: https://github.com/jzaefferer/grunt-html#reporter
[`htmllint`]: https://github.com/jzaefferer/grunt-html#getting-started
[grunt-html-html-report-converter]: https://github.com/prantlf/grunt-html-html-report-converter
