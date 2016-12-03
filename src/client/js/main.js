import io from 'socket.io-client'
import $ from 'jquery'
import raf from 'raf'

const tickrate = 100;
let name = 'Anon';

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

let distance = (player1, player2) => Math.sqrt(Math.pow(player1.position.x - player2.position.x, 2) + Math.pow(player1.position.y - player2.position.y, 2))

let playerIsClose = (player) => players.filter(other => other.id !== player.id && distance(other, player) < 50).length > 0

let initGame = () => {
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
        ctx.beginPath()
        ctx.fillStyle = player.color
        ctx.arc(player.position.x, player.position.y, 10, 0, 2 * Math.PI)
        ctx.fill()

        if (playerIsClose(player)) {
            ctx.font = "12px sans-serif";
            ctx.fillStyle = '#000000'
            ctx.fillText(player.name, player.position.x + 15, player.position.y + 5);
        }
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
}

$(function () {
    let $inputform = $('.nameinput')
    let $submit = $('#submit')
    let $nameinput = $('#name')

    $submit.on('click', (e) => {
        name = $nameinput.val()

        $inputform.hide()

        socket.emit('send playername', name)

        initGame()
    })
})

