'use strict';

const express = require('express');
module.exports = express.application.group = express.Router.group = function (arg1, arg2) {
  let fn;
  let path;

  if (arg2 === undefined) {
    path = '/';
    fn = arg1;
  } else {
    path = arg1;
    fn = arg2;
  }

  let router = express.Router();
  fn(router);
  this.use(path, router);
  return router;
};
