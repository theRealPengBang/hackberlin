import express from 'express'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var path = require('path')

let publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

let players = []

let formatPlayers = (players) => players.map(player => {
    return {
        id: player.socket.id,
        position: player.position
    }
})

io.on('connection', function (socket) {
    let connectionId;
    console.log('Connection:', socket.id)

    players.push({
        socket,
        position: {x: 0, y: 0}
    })

    socket.on('cursorPosition', pos => {
        players
            .find(player => player.socket.id === socket.id)
            .position = pos
    })
});

setInterval(function () {
    io.sockets.emit('players', {items: formatPlayers(players)})
}, 50)

// app.get('/', function(req, res){
//     res.sendFile(publicPath + '/index.html');
// });

http.listen(1337, function () {
    console.log('listening on *:1337');
});