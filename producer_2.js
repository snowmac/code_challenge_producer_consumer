"use strict";
var socket = require('socket.io-client')('http://localhost:12345');

var produceRandomAddition = function(){
	// Math Random produces values between 0 and 1, times it by 100 gives us the ability to have whole integers when we parse
	var x = parseInt(100 * Math.random());
	var y = parseInt(100 * Math.random());
	
	return x + "+" + y + "="; 
}; 

var pushData = function(data){
	if(data&&!data.hasData){
		socket.emit('push',{value:produceRandomAddition()}); 
	}
};

var producer_1 = function(){ 
	socket.on('connect', function(data) { 
	    console.log('Producer 1 Connected!');
		socket.emit('push',{value:produceRandomAddition()}); 
	});

	socket.on('popReturn',function(data){
		pushData(data);
	});

	socket.on('state', function(data){
		pushData(data);
	});
};

module.exports = producer_1; 