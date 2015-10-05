'use strict';

var context = require('di-linker')('they.online');

// disable require internally
context._requireIndicator = undefined;

window.they = window.they || {};
window.they.online = context;

