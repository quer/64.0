var Mob = function (mob) {
	this.x = null;
	this.y = null;
	this.way = mob.way;
	this.timeToNext = mob.timeToNext
	this.color = "green";

	if (this.way == 0) {
		this.x = 0;
		this.y = 320; 
	}else if (this.way == 1) {
		this.x = 1020;
		this.y = 320; 
	}else if (this.way == 2) {
		this.x = 500;
		this.y = 660; 
	}else {
		this.x = 500;
		this.y = 0; 
	}

	this.update = function (delta) {
		var movePixels = 10;
		if (this.way == 0) {
			this.x += movePixels; 
		}else if (this.way == 1) {
			this.x -= movePixels; 
		}else if (this.way == 2) {
			this.y -= movePixels; 
		}else {
			this.y += movePixels; 
		}
	}
	this.isHit = function (shoot) {
		var rect1 = {x: shoot.x, y: shoot.y, width: 20, height: 20}
		var rect2 = {x: this.x, y: this.y, width: 20, height: 20}

		if (rect1.x < rect2.x + rect2.width &&
		   rect1.x + rect1.width > rect2.x &&
		   rect1.y < rect2.y + rect2.height &&
		   rect1.height + rect1.y > rect2.y) {
		    return true;
		}
		return false;
		
	}
	this.killedUser = function () {
		if (this.x > 490 && this.x < 530 && this.y > 310 && this.y < 350) {
			//user die;!
			return true;
		}
		return false;
	}
	this.render = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x , this.y , 20, 20);
	}
}