import io from 'socket.io-client'
import $ from 'jquery'

let socket = io('http://localhost:1337');

socket.on('message', msg => {
    console.log('hello', msg);
});

setInterval(function() {
    socket.emit('position', {position:'10'})
    console.log('gesendet')
}, 1000);

let players = []

socket.on('players', data => {
    players = data.items
})