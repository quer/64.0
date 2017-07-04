var canvas,
	interval,
	game;
window.onload = function(){
	canvas = $("#canvas")[0];
	game = new Game();
	game.init();
	start();
};
var Game = function () {
	this.delta = 0;
	this.interval = null;
	this.can = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 1020;
    this.height = 660;
    this.level = new Level(1);
    this.init = function () {
    	this.can.width = this.width;
    	this.can.height = this.height;
    	/*this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;*/
    }
    this.render = function () {
		this.ctx.save();
        this.ctx.translate(0,0);
        this.ctx.clearRect(0, 0,this.width,this.height);
		

    	//the color to kill
    	this.ctx.fillStyle="red";
    	this.ctx.fillRect(0,0,this.width,this.height);

    	this.ctx.fillStyle="black";
    	//left wall
    	if (this.level.showDoor(0)) {
    		this.ctx.fillRect(0,0,30,250);
    		this.ctx.fillRect(0,410,30,250);
    	}else{
    		this.ctx.fillRect(0,0,30,660);
    	}

    	//right wall
    	if (this.level.showDoor(2)) {
	    	this.ctx.fillRect(990,0,30,250);
    		this.ctx.fillRect(990,410,30,250);
    	}else{
    		this.ctx.fillRect(990,0,30,660);
    	}

    	//top wall
    	if (this.level.showDoor(3)) {
    		this.ctx.fillRect(30,0,400,30);
    		this.ctx.fillRect(590,0,430,30);
    	}else{
    		this.ctx.fillRect(30,0,990,30);
    	}

    	//bottom wall
    	if (this.level.showDoor(1)) {
    		this.ctx.fillRect(30,630,400,30);
    		this.ctx.fillRect(590,630,430,30);
    	}else{
    		this.ctx.fillRect(30,630,990,30);
    	}

    	if (this.level != null) {
    		this.level.render(this.ctx);
    	}

    	this.ctx.restore();
    }
    this.update = function () {
    	this.delta++;
    	console.log("loop");
    	if (this.level != null) {
    		this.level.update(this.delta);
    	}
    }
    this.keyPress = function (key) {
    	if(this.level != null ){
    		this.level.keyPress(key);
    	}
    }
}
function start() {
	interval = setInterval(function () {
		var start = Date.now();
		game.update();
		game.render();
		var end = Date.now();
		game.ctx.font = '16px sans-serif'
	    game.ctx.textAlign = 'center';
	    game.ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);
	}, 33);
}
function stop() {
    clearInterval(interval);
}
function loop() {
    game.update();
    game.render();
    console.log("loop");
}

window.addEventListener('keydown', function(e) {
    game.keyPress(e);
}, false);