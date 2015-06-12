"use strict";
var socket = require('socket.io');
var http = require('http');
var socket = require('socket.io-client')('http://localhost:12345');

var consumeTheValue = function(data){
	if(data&&data.value){
		console.log(eval(data.value.replace('=',''))); 
	}
};

var popData = function(data){
	if(data && data.hasData){
		socket.emit('pop');
	}
};

var consumer = function(){
	socket.connect();

	socket.on('connect', function(data) { 
	    console.log('Consumer 1 Connected!');
	    popData(data);
	});

	socket.on('state',function(data){
		popData(data);
	});

	socket.on('popReturn', function(data){
		consumeTheValue(data);
		popData(data);
	});
};

module.exports = consumer; 