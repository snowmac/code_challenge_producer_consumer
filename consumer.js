"use strict";
var socket = require('socket.io');
var http = require('http');

var contains = function(list,value){
	if (typeof list === "string"){
		return list.indexOf(value) !== -1; 
	} else if(typeof list === "object"){
		for(var i = 0; i < list.length; i++){
			if (object[i] === value) {
				return true; 
			}
		}
	}
	return false; 
}

var outputString = function(data){
	var computedValue = eval(data);
	console.log(computedValue);
	return computedValue;
};

var consumer = function(consumerConfig){
	var io = require('socket.io-client')
	var socket = new io.Socket('localhost', {port: "12345"});
	socket.connect();

	socket.on('connect', function(data) { 
	    console.log('Connected!');
	});

	socket.on('push', function(data){
		socket.emit('pop',{}); 
	});

	socket.on('pop', function(data){
		// to do other stuff 
		console.log("Popped Data: " + data); 
		console.log(outputString(data.value)); 
	});

};

module.exports = consumer(); 