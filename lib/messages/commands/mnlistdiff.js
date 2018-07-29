'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('@dashevo/dashcore-lib');
var BufferUtil = bitcore.util.buffer;
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * Contains information about a MnListDiff
 * @param {MnListDiff} arg - An instance of MnListDiff
 * @param {Object=} options
 * @param {Function} options.MnListDiff - a MnListDiff constructor
 * @extends Message
 * @constructor
 */
function MnListDiffMessage(arg, options) {
  Message.call(this, options);
  this.MnListDiff = options.MnListDiff;
  this.command = 'mnlistdiff';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.MnListDiff,
    'An instance of MnListDiff or undefined is expected'
  );
  this.mnlistdiff = arg;
}
inherits(MnListDiffMessage, Message);

MnListDiffMessage.prototype.setPayload = function (payload) {
  $.checkArgument(BufferUtil.isBuffer(payload));
  this.mnlistdiff = this.MnListDiff.fromBuffer(payload);
};

MnListDiffMessage.prototype.getPayload = function () {
  return this.mnlistdiff ? this.mnlistdiff.toBuffer() : BufferUtil.EMPTY_BUFFER;
};

module.exports = MnListDiffMessage;