// ====== Map handeler =====

// kollisjonsdataen:
// når en scene blir lastet inn blir kollisjonsdataen for den scenen puttet inn i denne arrayen.
// Det som skjer er at dataen blir testet og omgjort til en av de følgende typene: vegg, gulv, tak.
// Dataen er strukturert på følgende måte:
// Vegg:
// 0 - 0
// 1 - x1
// 2 - y1
// 3 - x2
// 4 - y2
//
// Tak:
// 0 - 1
// 1 - x1
// 2 - y1
// 3 - x2
// 4 - y2
//
// Gulv:
// 0 - 2
// 1 - x1
// 2 - y1
// 3 - x2
// 4 - y2
// 5 - skjekkdybde
//
//
var CollisionData = null;
// kartdataen:
// kartdataen er all den visuelle dataen som skal vises. 
//

var	MapData = null;

var Entities = null;
var EntityTypes = null;



// variabler som brukes ved interaksjon mellom spiller og enhet
var shouldInteractWith = -1;
var oldInteraction = -1;
var interactiontick = 0;

// function testCollision:
// tester om en enhet, på posisjon x, y med høyde height og bredde with i piksler, kolliderer med noen av platene i
// den aktive scenen.
//
//
function testCollision(x, y,velocityY, width,height, context){
	var newPos = [x,y,velocityY];
	for (i = 0; i < CollisionData.length; i++)
	{
		if (CollisionData[i][0] == 0) // vegg
		{
			newPos = testCollisionAtWall(x, y,velocityY, width, height, i, context);
			x = newPos[0];
			y = newPos[1];
			velocityY = newPos[2];
		}
		else if (CollisionData[i][0] == 1) // tak
		{
			newPos = testCollisionAtRoof(x, y,velocityY, width, height, i, context);
			x = newPos[0];
			y = newPos[1];
			velocityY = newPos[2];
		}
		else if (CollisionData[i][0] == 2) // gulv
		{
			newPos = testCollisionAtFloor(x, y,velocityY, width, height, i, context);
			x = newPos[0];
			y = newPos[1];
			velocityY = newPos[2];
		}
	}
	return newPos;
}

function testCollisionAtWall(x, y,velocityY, width, height, index, context){
	wallDir = [CollisionData[index][1] - CollisionData[index][3], CollisionData[index][2] - CollisionData[index][4]];
	
	var a = (CollisionData[index][4] - CollisionData[index][2])*x - (CollisionData[index][3] - CollisionData[index][1])*y + CollisionData[index][3]*CollisionData[index][2] - CollisionData[index][4]*CollisionData[index][1];
	var b = Math.sqrt(Math.pow(CollisionData[index][4] - CollisionData[index][2],2) + Math.pow(CollisionData[index][3] - CollisionData[index][1],2));
	var c = a/b;
	c = Math.abs(c);
	
	if (c < 2)
		context.fillStyle = "pink";
	else
		context.fillStyle = "black";
	context.fillRect(projX * spriteSize + screenSize/2,600 - (projY * spriteSize + screenSize/2),10,10);
	if (c < 0.5 && y < Math.max(CollisionData[index][2],CollisionData[index][4])-0.1 && y > Math.min(CollisionData[index][2],CollisionData[index][4])-1){ // spilleren er innenfor rekkevidden
		
		if (wallDir[1] < 0){
			x += 0.1;
		}
		else{
			x -= 0.1;
		}
		return [x,y,velocityY];
	}		
	else
		return [x,y,velocityY];
	
	
}

function testCollisionAtRoof(x, y, velocityY, width, height, index, context){
	
	if (x > Math.min(CollisionData[index][1],CollisionData[index][3]) && x < Math.max(CollisionData[index][1],CollisionData[index][3])){
		wallDir = [CollisionData[index][1] - CollisionData[index][3], CollisionData[index][2] - CollisionData[index][4]];
	
		p1 = [CollisionData[index][1],CollisionData[index][2]];
		p2 = [CollisionData[index][3],CollisionData[index][4]];
		
		relativeX  = x - (CollisionData[index][1] + CollisionData[index][3])/2;
		relativeY =  y - (CollisionData[index][2] + CollisionData[index][4])/2;
	
		projX =  x
		projY = (p1[1] * (p2[0] - x) + p2[1] * (x - p1[0]))/(p2[0] - p1[0]);
	
		distance = Math.abs(y - projY);
		
		
			if (distance < 1){
				y -= Math.abs(distance-1);
				if (velocityY > 0)
				{
					velocityY = 0;
				}
			}
		context.fillStyle = "lime";
	
	context.fillRect(projX * spriteSize + screenSize/2,600 - (projY * spriteSize + screenSize/2),10,10);

	}
	

	return [x,y,velocityY];
}

function testCollisionAtFloor(x, y,velocityY, width, height, index, context){
	
	if (x > Math.min(CollisionData[index][1],CollisionData[index][3]) && x < Math.max(CollisionData[index][1],CollisionData[index][3])){
		wallDir = [CollisionData[index][1] - CollisionData[index][3], CollisionData[index][2] - CollisionData[index][4]];
	
		p1 = [CollisionData[index][1],CollisionData[index][2]];
		p2 = [CollisionData[index][3],CollisionData[index][4]];
		
		relativeX  = x - (CollisionData[index][1] + CollisionData[index][3])/2;
		relativeY =  y - (CollisionData[index][2] + CollisionData[index][4])/2;
	
		projX =  x
		projY = (p1[1] * (p2[0] - x) + p2[1] * (x - p1[0]))/(p2[0] - p1[0]);
	
		distance = Math.abs(y - projY);
		
		if (projY > y){ // spiller er under linje
			distance = -distance;
		}
		
		
		if (CollisionData[index][5] == 0)
		{
			if (distance < 0){
				y += Math.abs(distance);
				if (velocityY < 0)
					velocityY = 0;
			}
		}
		else
		{
			if (distance < 0 && CollisionData[index][5] >= Math.abs(distance)){
				y+= Math.abs(distance);
				if (velocityY < 0)
					velocityY = 0;
			}
		}
		
		
		context.fillStyle = "lime";
	
	context.fillRect(projX * spriteSize + screenSize/2,600 - (projY * spriteSize + screenSize/2),10,10);
		
	}
	
	
	return [x,y,velocityY];
}

function drawCols(context){
	context.strokeStyle = "black";
	for (i = 0; i < CollisionData.length; i++)
	{
		
		if (CollisionData[i][0] == 0)
			context.strokeStyle = "orange";
		else if (CollisionData[i][0] == 1)
			context.strokeStyle = "yellow";
		else if (CollisionData[i][0] == 2)
			context.strokeStyle = "purple";
		
	
	
		context.beginPath();
		context.moveTo((CollisionData[i][1] - screenX) * spriteSize + screenSize/2,screenSize - ((CollisionData[i][2] - screenY) * spriteSize + screenSize/2));
		context.lineTo((CollisionData[i][3] - screenX) * spriteSize + screenSize/2,screenSize - ((CollisionData[i][4] - screenY) * spriteSize + screenSize/2));
		context.stroke();
		
	}
}

function HandleInteraction(posX, posY){
	if (Entities != null){
		shouldInteractWith = -1;
		for (var i = 0; i < Entities.length; i++){
			if (testIfInRange(posX,posY,Entities[i].x,Entities[i].y)){
				shouldInteractWith = i;
			}
		}
		
		if (shouldInteractWith != -1 && oldInteraction == shouldInteractWith){
			interactiontick++;
		}
		else if(oldInteraction != shouldInteractWith) {
			console.log(oldInteraction + " " + shouldInteractWith);
			if (oldInteraction != -1)
				Entities[oldInteraction].resetInteraction();
			oldInteraction = shouldInteractWith;
			interactiontick = 0;
		}
		else{
			interactiontick = 0;
			oldInteraction = shouldInteractWith;
		}

		
	}

}

function testIfInRange(ax, ay, bx,by){
	var _x = ax - bx;
	var _y = ay - by;
	return _x*_x + _y*_y < 1;
}


function Interact(){
	if (shouldInteractWith != -1){
		UpdateEntity();
	}
}

function UpdateEntity(){
	DrawSpeakBox(context,Entities[shouldInteractWith].x,Entities[shouldInteractWith].y + Entities[shouldInteractWith].height ,Entities[shouldInteractWith].height,shouldInteractWith);	
}
