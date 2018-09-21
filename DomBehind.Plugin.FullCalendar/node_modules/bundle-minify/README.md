# bundle-minify

[uglify-js](https://github.com/mishoo/UglifyJS2) as a [browserify](https://github.com/substack/node-browserify) plugin.

[![Build Status](https://travis-ci.org/zertosh/bundle-minify.svg?branch=master&style=flat)](https://travis-ci.org/zertosh/bundle-minify)

## Usage

### API

```js
var browserify = require('browserify');
var bundleMinify = require('bundle-minify');

var b = browserify({ /* browserify options */ });
b.plugin(bundleMinify, /* uglify options */);
```

### CLI

```sh
browserify entry-file.js --plugin [ bundle-minify ]
```
