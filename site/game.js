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
	this.can = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 1020;
    this.height = 660;
    this.init = function () {
    	this.can.width = this.width;
    	this.can.height = this.height;
    	/*this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;*/
    }
    this.render = function () {
    	// body...
    }
    this.update = function () {
    	this.delta++;
    }
}
function start() {
	interval = setInterval(loop, 33);
}
function stop() {
    clearInterval(interval);
}
function loop() {
    game.update();
    game.render();
    console.log("loop");
}