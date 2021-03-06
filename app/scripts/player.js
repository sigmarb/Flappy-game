window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		
        if (Controls.keys.space) {
			SPEED = 40;
			this.pos.y -= delta * SPEED;

			var jumpSound = document.getElementById('jumpsnd');
            jumpSound.currentTime = 0;
			jumpSound.play();

		}
		else if (Controls.keys.onclick) {
			SPEED = 40;
			this.pos.y -= delta * SPEED;
		}
		else
		{
			SPEED -= 2;
			this.pos.y -= delta * SPEED;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + HEIGHT > (this.game.WORLD_HEIGHT - 5)) {
			var deathSound = document.getElementById('deathsnd');
			deathSound.play();
			return this.game.gameover();
		}
	};

	return Player;

})();
