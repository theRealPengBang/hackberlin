import io from 'socket.io-client'
import $ from 'jquery'

let socket = io('http://localhost:1337');

socket.on('message', msg => {
    console.log('hello', msg);
});


let players = [
    {x: 10, y: 10}
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

