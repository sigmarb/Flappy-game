window.Obstacle = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Obstacle = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Obstacle.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Obstacle.prototype.onFrame = function(delta) {
		
       
	
			SPEED -= 2;
			this.pos.x -= delta * SPEED;

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Obstacle.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) 
		{
			
		}
	};

	return Player;

})();
