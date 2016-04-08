
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

	var gamesound = document.getElementById('gamesnd');
	gamesound.volume = 0.2;

	var jumpSound = document.getElementById('jumpsnd');
	jumpSound.volume = 0.2;

	var scoresound = document.getElementById('scoresound');
	scoresound.volume = 1;


    var game = new window.Game($('.GameCanvas'));
    game.start();
});
