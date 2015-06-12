var consumer = require('./consumer');
var packageJSON = require('./package');
var producer_1 = require('./producer_1');
var producer_2 = require('./producer_2');
var queue = require('./queue');

queue(); 
producer_1(); 
producer_2(); 
consumer();