'use strict';

var Transform = require('stream').Transform;
var uglify = require('uglify-js');

module.exports = function apply(b, opts_) {
  var opts = {fromString: true};
  if (opts_) {
    Object.keys(opts_).forEach(function(key) {
      opts[key] = opts_[key];
    });
  }

  var buffers = [];
  var transformer = new Transform();
  transformer._transform = function(chunk, enc, next) {
    buffers.push(chunk);
    next();
  };
  transformer._flush = function(next) {
    var source = Buffer.concat(buffers).toString();
    var minified = uglify.minify(source, opts);
    this.push(minified.code);
    next();
  };

  b.pipeline.get('wrap').push(transformer);

  b.once('reset', function() {
    apply(b, opts_);
  });
};
