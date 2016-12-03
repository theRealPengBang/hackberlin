import io from 'socket.io-client'
import $ from 'jquery'

let socket = io('http://localhost:1337');

socket.on('message', msg => {
    console.log('hello', msg);
});

setInterval(function () {
    socket.emit('position', {position: '10'})
    console.log('gesendet')
}, 1000);

let players = [
    {x: 10, y: 10},
    {x: 50, y: 10},
    {x: 10, y: 50},
    {x: 20, y: 40},
    {x: 10, y: 70},
]
let cursorPosition  = {x : 0, y : 0}
window.addEventListener('mousemove', e=> {
    cursorPosition=  {x : e.clientX, y: e.clientY }
    console.log("CP!!",cursorPosition)

})
setInterval(()=> {
    socket.emit('cursorPosition', cursorPosition)
},100)


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

    let renderPlayer = (player) => {
        ctx.fillStyle = "green";
        ctx.fillRect(player.x, player.y, player.x + 10, player.y + 10);
    }

    let render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        players.map(renderPlayer)
    }

    setupCanvas()
    $window.on('resize', resizeCanvas)


    render()

    // raf(function tick() {
    //     console.log('tick')
    //
    //     raf(tick())
    // })
})

