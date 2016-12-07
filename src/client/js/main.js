import $ from 'jquery'
import game from './game'

let name = null

$(function () {

    let instance = game.init()

    let $inputform = $('.nameinput')
    let $nameform = $('#nameform')
    let $nameinput = $('#name')

    $nameform.on('submit', (e) => {
        e.preventDefault()
        name = $nameinput.val()

        $inputform.hide()

        instance.join('name')
    })

})

