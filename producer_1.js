"use strict";

var produceRandomAddition = function(){
	// Math Random produces values between 0 and 1, times it by 100 gives us the ability to have whole integers when we parse
	var x = parseInt(100 * Math.random());
	var y = parseInt(100 * Math.random());
	
	return x + "+" + y + "="; 
}; 

var producer_1 = function(){ 

	var io = require('socket.io-client')('http://localhost:12345');

	// socket.on('connect', function(data) { 
	// 	socket.emit('push',{value:produceRandomAddition()}); 
	//     console.log('Connected!');
	// });

	// socket.on('pop',function(){
	// 	socket.emit('push',{value:produceRandomAddition()}); 
	// });

};

module.exports = producer_1(); 