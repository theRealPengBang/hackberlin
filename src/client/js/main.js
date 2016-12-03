import io from 'socket.io-client'

let socket = io('http://localhost:1337');

socket.on('connection', function () {
    console.log("piahdfoidfosn");
});
socket.on('message', msg => {
    console.log('hello', msg);
});