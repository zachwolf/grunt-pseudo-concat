// simple.js
var test = require('./test');
var cool = require('./test2');
var events = require('events');

//I will be run as soon as the bundle is loaded on the page
test();
cool();
