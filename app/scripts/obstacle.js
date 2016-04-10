window.Obstacle = (function() {
	'use strict';

	var Controls = window.Controls;

	var SPEED = 30; 
	var PLAYER_HEIGHT = 4.9;
	var PLAYER_WIDTH = 5;
	var GAP_SIZE = 15.6;
	var DEAD = false;

	var Obstacle = function(upper, lower, game, initialPos) {
		this.elUpper = upper;
		this.elLower = lower;
		this.pos = { x: 0, y: 0 };
		this.game = game;
		this.initialPosX = initialPos;
		this.gameOver = false;
	};
    
	Obstacle.prototype.onFrame = function(delta) {
		if(!DEAD) {
			this.pos.x -= delta * SPEED;
            if (this.pos.x + 10 < 0) {
				this.makeObstacles (104);
                this.showObstacles();
			}
			this.checkCollision();
			this.checkScore();           
			this.elUpper.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
			this.elLower.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
		} else {
			if(this.game.player.pos.y < 52.1) {
				this.game.player.pos.y += 0.5;
				this.game.player.el.css('-webkit-transform',
										'translate3d(' + this.game.player.pos.x + 'em, ' + this.game.player.pos.y + 
                                        'em, 0em)' + 'rotate(225deg)');
			} else {
				this.gameOver = true;
			}
		}
	};    
   
    Obstacle.prototype.makeObstacles = function (initialPos) {
        this.pos.x = initialPos;
		this.lowerObsHeight = Math.floor(Math.random() * (10 - (52.1 - GAP_SIZE - 10)) + (52.1 - GAP_SIZE - 10));
        this.lowerObsBottom = 52.1 - this.lowerObsHeight - GAP_SIZE;
		this.lowerObsTop = this.lowerObsBottom + GAP_SIZE;
		this.passedObs = false;
	};
    
    Obstacle.prototype.showObstacles = function() {
        this.elUpper.css('height', this.lowerObsBottom + 'em');
		this.elUpper.css('width', 10 + 'em');
		this.elLower.css('width', 10 + 'em');
		this.elLower.css('top', this.lowerObsTop + 'em');
		this.elLower.css('height', this.lowerObsHeight + 'em');
    };
      
    Obstacle.prototype.checkCollision = function() {
        if(this.pos.x + PLAYER_WIDTH >= this.game.player.pos.x) {
            if(this.pos.x - PLAYER_WIDTH <= this.game.player.pos.x) {
                if(this.game.player.pos.y <= this.lowerObsBottom || this.game.player.pos.y + PLAYER_HEIGHT >= this.lowerObsTop) {
                    DEAD = true;
                    if(this.gameOver) {
                        return this.game.gameover();
                    }
                } 
            }
        }
    };
    
    Obstacle.prototype.checkScore = function() {
        if(!this.passedObs && this.pos.x < this.game.player.pos.x) {
            this.passedObs = true;
            var scoresound = document.getElementById('scoresound');
            scoresound.currentTime = 0;
			scoresound.play();           
            this.game.score++;
            $('#Scoreboard-score').html(this.game.score);
            $('#World-score').html(this.game.score);
        }
    };

	Obstacle.prototype.reset = function() {
		this.makeObstacles(this.initialPosX);
        this.showObstacles();
		this.gameOver = false;
		DEAD = false;
	};
        
	return Obstacle;

})();
