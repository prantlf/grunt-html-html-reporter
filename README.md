# grunt-html-html-reporter

A custom reporter for [grunt-html] - the HTML validation task - which formats the validation results to HTML.

## Installation

You need [node >= 4][node], [npm] and [grunt >= 0.4][Grunt] installed and your project build managed by a [Gruntfile] with the necessary modules listed in [package.json], including [grunt-html]. If you haven't used Grunt before, be sure to check out the [Getting Started] guide, as it explains how to create a Gruntfile as well as install and use Grunt plugins.  Once you're familiar with that process, you may install this plugin with this command:

```sh
$ npm install grunt-html-html-reporter --save-dev
```

## Usage

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

 * 2017-11-24   v0.1.0   Initial release

## License

Copyright (c) 2017 Ferdinand Prantl

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
