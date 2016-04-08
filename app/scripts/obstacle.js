window.Obstacle = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 10;
	var PLAYER_HEIGHT = 4.9;
	var PLAYER_WIDTH = 7;
	var GAP = 14;
	var STOP = false;

	var Obstacle = function(elUpper, elLower, game, initialPos) {
		this.elUpper = elUpper;
		this.elLower = elLower;
		this.pos =  { x: 0, y: 0 };
		this.game = game;
		this.playing = false;
		this.initialPositionX = initialPos;
		this.gameOver = false;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Obstacle.prototype.reset = function() {
		this.generateObstacles(this.initialPositionX);
		this.dead = false;
		this.gameOver = false;
		this.playing = false;
		STOP = false;
	};
    
    Obstacle.prototype.generateObstacles = function (initialPos) {
		this.pos.x = initialPos;

		this.lowerHeight = getRandomInt(10, this.game.DISTANCE_TO_GROUND - GAP);
		this.upperHeight = this.game.DISTANCE_TO_GROUND - this.lowerHeight - GAP;
		this.lowerTop = this.upperHeight + GAP;

		this.lowerPos = this.upperHeight + GAP;
		this.upperPos = this.upperHeight;

		this.elUpper.css('height', this.upperHeight + 'em');
		this.elUpper.css('width', WIDTH + 'em');
		this.elLower.css('width', WIDTH + 'em');
		this.elLower.css('top', this.lowerTop + 'em');
		this.elLower.css('height', this.lowerHeight + 'em');

		this.passed = false;
	};

	Obstacle.prototype.onFrame = function(delta) {
		if(!STOP) {
			if (this.playing) {
				this.pos.x -= delta * SPEED;
			} else if (Controls.keys.space || Controls.mouseclicked) {
				this.playing = true;
			}

			if (this.pos.x + WIDTH < 0) {
				this.generateObstacles (108);
			}

			this.checkCollision();
			//this.checkIfPlayerPassed();
            
			this.elUpper.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
			this.elLower.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
		} else {	 //Bird dead animaiton
			if(this.game.player.pos.y < this.game.DISTANCE_TO_GROUND) {
				this.game.player.pos.y += 0.5;
				this.game.player.el.css('-webkit-transform',
										'translate3d(' + this.game.player.pos.x + 'em, ' + this.game.player.pos.y + 'em, 0em)' +
										'rotate(90deg)');
			} else {	//When the animation is done we can return gameover
				this.gameOver = true;
			}
		}
	};

	

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}


	Obstacle.prototype.checkCollision = function() {
		if (this.pos.x + PLAYER_WIDTH >= this.game.player.pos.x && this.pos.x - PLAYER_WIDTH <= this.game.player.pos.x && (this.game.player.pos.y <= this.upperPos || this.game.player.pos.y + PLAYER_HEIGHT >= this.lowerPos)) {
            //var crash = document.getElementById('crash');
            //crash.play();
            
            STOP = true;
            //this.game.ground.removeClass('sliding');
            //this.game.player.el.removeClass('flapping');
            if(this.gameOver) {
                return this.game.gameover();
            }
 		} 
	};

	return Obstacle;

})();
