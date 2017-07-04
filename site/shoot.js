var Shoot = function (way) {
	this.x = null;
	this.y = null;
	this.way = way;
	this.loopDelay = 5; //loops
	this.startDelta = null;

	if (this.way == 0) {
		this.x = 500;
		this.y = 300; 
	}else if (this.way == 1) {
		this.x = 500;
		this.y = 350; 
	}else if (this.way == 2) {
		this.x = 530;
		this.y = 320; 
	}else {
		this.x = 480;
		this.y = 320; 
	}


	this.render = function (ctx) {
		ctx.fillRect(this.x , this.y , 20, 20);
	}
	this.update = function (delta) {
		if (this.startDelta != null) {
			//if ((this.startDelta - delta) % this.loopDelay === 0) {
				this.move();
			//}
		}else{
			this.startDelta = delta;
		}
	}
	this.isOutOfBounce = function () {
		if (this.x <= 0 || this.x >= 1020 || this.y <= 0 || this.y >= 660) {
			return true;
		}else{
			return false;
		}
	}
	this.move = function () {
		var movePixels = 10;
		if (this.way == 0) {
			this.y -= movePixels; 
		}else if (this.way == 1) {
			this.y += movePixels; 
		}else if (this.way == 2) {
			this.x += movePixels; 
		}else {
			this.x -= movePixels; 
		}
	}
}