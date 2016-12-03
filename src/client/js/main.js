import io from 'socket.io-client'
import $ from 'jquery'
import util from '../../server/shared/util'

let name = 'Anon';

let initGame = () => {
    let canvas = null
    let $canvas = null
    let ctx = null
    let $window = $(window)
    let $body = $('body')

    const tickrate = 100;

    let socket = io();

    socket.emit('send playername', name)

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
        ctx.arc(player.position.x, player.position.y, player.radius, 0, 2 * Math.PI)
        ctx.fill()

        let others = util.closePlayers(player, players)

        if (others.length > 0) {
            ctx.font = "12px sans-serif"
            ctx.fillStyle = `rgba(0,0,0,${1 - (util.distance(others[0], player) - 20) / 50})`
            ctx.fillText(player.name, player.position.x + 15, player.position.y + 5)
        }
    }

    let render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        players.map(renderPlayer)
    }

    setupCanvas()
    $window.on('resize', resizeCanvas)

    // we should use requestanimationframe, but naaaahhhh
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

        initGame()
    })
})

