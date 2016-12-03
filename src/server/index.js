var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')

let getWords = (cb) => {
    fs.readFile('../resources/500.dic', 'utf8', (err, data) => {
        cb(data)
    })
}

io.on('connection', function (socket) {
    getWords(data => socket.emit('message', data))
    console.log('!!!connection!!!')
});

http.listen(1337, function () {
    console.log('listening on *:1337');
});