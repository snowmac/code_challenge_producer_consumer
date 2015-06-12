"use strict";
var socket = require('socket.io');
var http = require('http');

var fun = function() {

	var queue = []; 

	// setup HTTP server
	var httpService = http.createServer(function(req,res){
	  res.writeHead(404, {'Content-Type': 'text/html'});
	  res.end('<h1>Page not found</h1>');
	});

	httpService.listen("12345"); 

	// now use the connect io to http
	var io = socket.listen(httpService); 

	// add a connection listener
	io.sockets.on('connection', function(socket){
	  console.log('Client connected to the queue.');
	  socket.emit('state', {hasData: queue.length > 0, length: queue.length});
	});

	io.sockets.on('push', function(data){
	console.log('Pushing data'); 
	// queue.push(data);
	// socket.emit('push', {hasData: queue.length > 0, length: queue.length});
	});

	io.sockets.on('pop', function(data){
	console.log('Popping the data')
	// var value = queue.pop(); 
	// socket.emit('pop', {hasData: queue.length > 0, length: queue.length, value: value});
	});

	io.sockets.on('disconnect', function() {
	console.log('Client disconnected.');
	});

};

module.exports = fun();