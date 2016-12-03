import express from 'express'
import randomcolor from 'randomcolor'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var path = require('path')

let tickrate = 100;

let publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

let players = []

let formatPlayers = (players) => players.map(player => {
    const {position,color,name} = player
    const id = player.socket.id
    return {
        id,
        position,
        color,
        name
    }
})

io.on('connection', function (socket) {
    console.log('Connection:', socket.id)

    players.push({
        socket,
        position: {x: 0, y: 0},
        color: randomcolor(),
        name : "anonymous"
    })

    socket.on('cursorPosition', pos => {
        players
            .find(player => player.socket.id === socket.id)
            .position = pos
    })
    socket.on('disconnect', () => {
        console.log(`player with id: ${socket.id} disconnected`)
        players = players
            .filter(player => player.socket.id !== socket.id)
    })
    socket.on('send playername', playerName => {
        let player = players.find(player => player.socket.id === socket.id)
        player.name = playerName
    })
});
setInterval(function () {
    io.sockets.emit('players', {items: formatPlayers(players)})
}, 1000 / tickrate)

http.listen(1337, function () {
    console.log('listening on *:1337');
});