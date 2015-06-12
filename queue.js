"use strict";
var ioLoader = require('socket.io');
var http = require('http');

var handler = function(req,res){
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end('<h1>Page not found</h1>');
};

var fun = function() {
	var queue = []; 

	// setup HTTP server
	var app = http.createServer(handler);

	app.listen("12345"); 

	// now use the connect io to http
	var io = ioLoader(app);

	// add a connection listener
	io.on('connection', function(socket){
		console.log('Client connected to the queue.');
		socket.emit('state', {hasData: queue.length > 0, queueSize: queue.length});
	
		socket.on('push', function(data){
			// console.log('Pushing data'); 
			queue.push(data.value);
			socket.emit('state', {hasData: queue.length > 0, queueSize: queue.length});
		});

		socket.on('pop', function(data){
			// console.log('Popping the data')
			var value = queue.pop(); 
			socket.emit('popReturn', {hasData: queue.length > 0, queueSize: queue.length, value: value});
		});

		socket.on('disconnect', function() {
			console.log('Client disconnected.');
		});
	});
};

module.exports = fun;