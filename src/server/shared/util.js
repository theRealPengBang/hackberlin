export default {

    distance: (player1, player2) => Math.sqrt(Math.pow(player1.position.x - player2.position.x, 2) + Math.pow(player1.position.y - player2.position.y, 2))


}