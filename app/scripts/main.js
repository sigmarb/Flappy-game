
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

	var gamesound = document.getElementById('gamesnd');
	gamesound.volume = 0.2;

	var jumpsound = document.getElementById('jumpsnd');
	jumpsound.volume = 0.4;

	var scoresound = document.getElementById('scoresound');
	scoresound.volume = 1;


    var game = new window.Game($('.GameCanvas'));
    game.start();
});
