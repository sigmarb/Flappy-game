
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
    
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		
        this.obstacleOne = new window.Obstacle(this.el.find('#firstObstacleUpper'),
                                                 this.el.find('#firstObstacleLower'), this, 115);
        this.obstacleTwo = new window.Obstacle(this.el.find('#secondObstacleUpper'),
                                                 this.el.find('#secondObstacleLower'), this, 147);
        this.obstacleThree = new window.Obstacle(this.el.find('#thirdObstacleUpper'),
                                                 this.el.find('#thirdObstacleLower'), this, 171);
        this.isPlaying = false;
        this.highScore = 0;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
        this.obstacleOne.onFrame(delta);
        this.obstacleTwo.onFrame(delta);
        this.obstacleThree.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */  

	Game.prototype.start = function() {
        this.reset();   

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
        this.obstacleOne.reset();
        this.obstacleTwo.reset();
        this.obstacleThree.reset();
        this.score = 0;
		$('#World-score').html(this.score);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
        
        if(this.score > this.highScore) {
            this.highScore = this.score;
        }
        
        $('#Scoreboard-highScore').html(this.highScore);
        $('#Scoreboard-score').html(this.score);
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};
    
	/**
	 * Some shared constants.
	 */
    Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
    
	return Game;
})();


