"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _nodeChild_process() {
  const data = require("node:child_process");
  _nodeChild_process = function _nodeChild_process() {
    return data;
  };
  return data;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _default(_x) {
  return _ref.apply(this, arguments);
}
function _ref() {
  _ref = _asyncToGenerator(function* (api) {
    api.logger.info('use git plugin');
    const gitLogBuffer = (0, _nodeChild_process().execSync)('git log');
    const gitLog = gitLogBuffer.toString();
    const latestCommitLine = gitLog.split('\n')[0];
    const latestCommitHash = latestCommitLine.split(' ')[1];
    api.logger.info('Latest commit hash: ', latestCommitHash);
    const gitStatusBuffer = (0, _nodeChild_process().execSync)('git status');
    const gitStatus = gitStatusBuffer.toString();
    const onBranchLine = gitStatus.split('\n')[0];
    const onBranch = onBranchLine.split(' ')[2];
    api.logger.info('On branch: ', onBranch);
    api.modifyHTML($ => {
      $('head').prepend(`<meta name="Current build commit hash" content="${latestCommitHash}"></meta>`);
      $('head').prepend(`<meta name="Current build branch" content="${onBranch}"></meta>`);
      return $;
    });
  });
  return _ref.apply(this, arguments);
}