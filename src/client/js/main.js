import io from 'socket.io-client'
import $ from 'jquery'
import raf from 'raf'

const tickrate = 100;

let socket = io();

socket.on('message', msg => {
    console.log('hello', msg);
});

let players = []

let cursorPosition = {x: 0, y: 0}
window.addEventListener('mousemove', e => {
    cursorPosition = {x: e.clientX, y: e.clientY}

})
setInterval(() => {
    socket.emit('cursorPosition', cursorPosition)
}, 1000 / tickrate)


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
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    let renderPlayer = (player) => {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.position.x, player.position.y, 10, 10);
    }

    let render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        players.map(renderPlayer)
    }

    setupCanvas()
    $window.on('resize', resizeCanvas)


    // raf(function tick() {
    //
    //     render()
    //
    //     raf(tick())
    // })

    setInterval(() => {
        render()
    }, 1000 / tickrate)
})

