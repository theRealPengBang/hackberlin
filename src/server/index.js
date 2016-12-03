var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var path = require('path')

let publicPath = path.join(__dirname, '../public')

io.on('connection', function (socket) {
    console.log('!!!connection!!!')
});

app.get('/', function(req, res){
    res.sendFile(publicPath + '/index.html');
});

http.listen(1337, function () {
    console.log('listening on *:1337');
});