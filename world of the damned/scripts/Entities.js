var gravity = -0.5;


class Player{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.velocityY = 0;
	}
	
	drawPlayer(context){
		context.fillStyle = "red";
		
		var scrX = (this.x - screenX) * spriteSize + screenSize/2;
		var scrY = screenSize - ((this.y - screenY) * spriteSize + screenSize/2);
		
		context.fillRect(scrX-spriteSize/2,scrY-spriteSize,spriteSize,spriteSize);
		context.beginPath();
		context.arc(scrX+spriteSize/4, scrY-spriteSize*0.8, 0.2*spriteSize, 0, 2 * Math.PI, false);
		context.arc(scrX-spriteSize/4, scrY-spriteSize*0.8, 0.2*spriteSize, 0, 2 * Math.PI, false);
		context.fillStyle = "white";
		context.fill();


		context.beginPath();
		context.arc(scrX+spriteSize/3, scrY-spriteSize*0.85, 0.05*spriteSize, 0, 2 * Math.PI, false);
		context.arc(scrX-spriteSize/3, scrY-spriteSize*0.75, 0.05*spriteSize, 0, 2 * Math.PI, false);
		context.fillStyle = "black"
		context.fill();

		context.beginPath();
		context.strokeStyle = "black";
		context.moveTo(scrX-spriteSize/3, scrY-spriteSize*0.5);
		context.lineTo(scrX-spriteSize/3, scrY-spriteSize*0.1);
		context.lineTo(scrX+spriteSize/3, scrY-spriteSize*0.2);
		context.lineTo(scrX+spriteSize/3, scrY-spriteSize*0.5);
		context.stroke();
	}
	
	
	movePlayer(up, down, left, right, context,deltaTime){
			if (left)
				this.x -= 0.1;
			if (right)
				this.x += 0.1;
			
			if (up)
				this.velocityY = 0.1;	
			this.velocityY += gravity * deltaTime;

			this.y += this.velocityY;
			var temp = testCollision(this.x, this.y,this.velocityY, 60, 60, context);
			this.x = temp[0];
			this.y = temp[1];
			this.velocityY = temp[2];

			screenX = this.x;
			screenY = this.y;


			HandleInteraction(this.x,this.y);
	}
}


class Entity{

	constructor(id, x, y, width, height, intercactionID,phrases){
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.intercactionID = intercactionID;
		this.phrases = phrases;
		this.currentDialouge = 0;
		this.isInteracting = false;
	}


	draw(context){
		drawEntity(context,this.id,this.x,this.y,this.width,this.height);
	}


	getDialouge(){
		if (this.phrases[0] == 0 && !this.isInteracting){// random
			this.currentDialouge = Math.floor(Math.random()*(this.phrases.length-1) + 1);
			this.isInteracting = true;
		}
		else if (this.phrases[0] == 1 && !this.isInteracting){ // en enkel replikk
			this.currentDialouge = 1;
			this.isInteracting = true;
		}

		return this.phrases[this.currentDialouge];
	}
	resetInteraction(){
		this.isInteracting = false;
	}


	logInfo(){
		console.log("========================");
		console.log("Enhets informasjon:");
		console.log("	  ID: " + this.id);
		console.log("	xPos: " + this.x);
		console.log("	yPos: " + this.y);
		console.log("  width: " + this.width);
		console.log(" height: " + this.height);
		console.log("  tekst: " + this.phrases);
		console.log("========================");
	}

}



function drawEntity(context, id, x, y,width,height){
	drawSprite(context,x,y+height,width,height,id);
}