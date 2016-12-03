export default {

    distance: (player1, player2) => Math.sqrt(Math.pow(player1.position.x - player2.position.x, 2) + Math.pow(player1.position.y - player2.position.y, 2)),

    closePlayers: function(player, players) {
        return players
            .filter(other => other.id !== player.id && this.distance(other, player) < 70)
            .sort((a, b) => this.distance(player, a) - this.distance(player, b))
    }
}