'use strict';

var Phx = require("bucklescript-phx/src/phx.bs.js");

var socket = Phx.connectSocket(undefined, Phx.initSocket(undefined, "/socket"));

var channel = Phx.initChannel("todo", undefined, socket);

exports.socket = socket;
exports.channel = channel;
/* socket Not a pure module */
