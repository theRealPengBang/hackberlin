import express from 'express'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var path = require('path')

let publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', function (socket) {
    console.log('!!!connection!!!')

    socket.emit('message', 'hallo duda');

    socket.on('message', msg => {
        console.log('position:', msg);
    });
});

// app.get('/', function(req, res){
//     res.sendFile(publicPath + '/index.html');
// });

http.listen(1337, function () {
    console.log('listening on *:1337');
});