var Level = function (levelId) {
	this.levelId = levelId; // level depend on doors open : 2 - 4   (0 - 2)
	this.start = false;
	this.startTime = null;
	this.activeMinions = [];
	this.shoots = [];
	this.userLookWay = 3;
	this.died = false;

	this.patternLive = [];
	this.timeToNext = 0;
	this.patternIndex = 0;

	this.start = function () {
	}

	this.update = function (delta) {
		if (this.timeToNext <= 0) {
			if (this.patternLive.length -1 < this.patternIndex) {
				this.startNextPattern();
			}else{
				console.log("new mob");
				var newMob = this.patternLive[this.patternIndex]
				newMob = new Mob(newMob);
				this.timeToNext = newMob.timeToNext;
				this.activeMinions.push(newMob);
				++this.patternIndex;
			}
		}else{
			--this.timeToNext;	
		}

		for (var i = this.activeMinions.length - 1; i >= 0; i--) {
			this.activeMinions[i].update(delta);
			for (var j = this.shoots.length - 1; j >= 0; j--) {
				if(this.activeMinions[i].isHit(this.shoots[j])){
					this.shoots.splice(j, 1);
					this.activeMinions.splice(i, 1);
					break;
				}
			}
			if(this.activeMinions[i].killedUser()){
				this.died = true;
				stop();
			};
		}
		for (var i = this.shoots.length - 1; i >= 0; i--) {
			this.shoots[i].update(delta);
			if (this.shoots[i].isOutOfBounce()) { // clean up if thay are of the screen.
				this.shoots.splice(i, 1);
			}
		}
	}
	this.startNextPattern = function () {
		console.log("starte new pattern");
		var patternToLevelId = pattern[this.levelId];
		var theSelectedPattern = patternToLevelId[Math.floor(Math.random() * patternToLevelId.length)];
		console.log(theSelectedPattern);
		this.patternLive = theSelectedPattern;
		this.patternIndex = 0;
	}
	this.shoot = function(){
		console.log("new shoot");
		this.shoots.push(new Shoot(this.userLookWay));
	}
	this.render = function (ctx) {
		ctx.fillRect(490,310,40,40);

		ctx.fillStyle="green";
		if(this.userLookWay == 0){ // look up
			ctx.fillRect(500,300,20,10);
		}else if(this.userLookWay == 1){ // look down
			ctx.fillRect(500,350,20,10);
		}else if(this.userLookWay == 2){ // look right
			ctx.fillRect(530,320,10,20);
		}else { // look left
			ctx.fillRect(480,320,10,20);
		}
		for (var i = 0; i < this.activeMinions.length; i++) {
			this.activeMinions[i].render(ctx);
		}
		for (var i = 0; i < this.shoots.length; i++) {
			this.shoots[i].render(ctx);
		}
		if (this.died) {
			ctx.font = '32px sans-serif'
    		ctx.textAlign = 'center';
    		ctx.fillText('you died!', canvas.width / 2, canvas.height / 2);
				
		}
	}

	this.keyPress = function (key) {
		switch (key.keyCode) {
	        case 37: //left
	        	this.userLookWay = 3;
	        	this.shoot();
	            break;
	        case 39: // right
	        	this.userLookWay = 2;
	        	this.shoot();
	            break;
	        case 38: // up 
	        	this.userLookWay = 0;
	        	this.shoot();
	            break;
	        case 40: // down
	        	this.userLookWay = 1;
	        	this.shoot();
	            break;
	        default: 
	        	console.log("error???!?!");
	        	break;
	    }
	}
	this.showDoor = function (doorId) {
		if (this.levelId == 0) {
			if (doorId == 0 || doorId == 2) {
				return true;
			}else{
				return false;
			}
		}
		else if (this.levelId == 1) {
			if (doorId == 0 || doorId == 1 || doorId == 2) {
				return true;
			}else{
				return false;
			}
		}
		else{
			return true;
		}
	}
}