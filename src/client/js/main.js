import io from 'socket.io-client'
import $ from 'jquery'
import raf from 'raf'

let socket = io('http://localhost:1337');

socket.on('message', msg => {
    console.log('hello', msg);
});

setInterval(function () {
    socket.emit('position', {position: '10'})
    console.log('gesendet')
}, 1000);

let players = [
    {x: 10, y: 10}
]

socket.on('players', data => {
    players = data.items
})

$(function () {
    let canvas = null
    let $canvas = null
    let ctx = null
    let $window = $(window)
    let $body = $('body')

    let createCanvas = () => $(`<canvas class="maincanvas" id="maincanvas" width="${window.innerWidth}" height="${window.innerHeight}">`)
    let setupCanvas = () => {
        $canvas = createCanvas()
        $body.append($canvas)
        canvas = $canvas[0]
        ctx = canvas.getContext("2d");
    }
    let resizeCanvas = () => {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    setupCanvas()
    $window.on('resize', resizeCanvas)


    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 100, 100);

    // raf(function tick() {
    //     console.log('tick')
    //
    //     raf(tick())
    // })
})

