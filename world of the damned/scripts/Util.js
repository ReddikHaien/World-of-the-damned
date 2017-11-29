var screenSize = 600
var spriteSize = 60;

class Vector2{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}



function clearScreen(context){
	context.fillStyle = "grey";
	context.fillRect(0,0,screenSize,screenSize);
}


function drawRect(context, x,y,width,height){
	var _x = (x - screenX)*spriteSize + 600/2;
	var _y = 600 - (y - screenY)*spriteSize - 300;


	//console.log(_x +" "+ _y + " " + width + " " + height);

	context.fillRect(_x,_y,spriteSize*width,spriteSize*height);
	
}

function drawText(context, x, y, text){
	var _x = (x - screenX)*spriteSize + 600/2;
	var _y = 600 - (y - screenY)*spriteSize - 300;

	context.font = "15px monospace";
	context.fillText(text,_x,_y);

}

function drawSprite(context, x, y,width,height, id){
	var _x = (x - screenX)*spriteSize + 600/2;
	var _y = 600 - (y - screenY)*spriteSize - 300;


context.drawImage(testImage,EntityTypes[id][0]*spriteSize,EntityTypes[id][1]*spriteSize,EntityTypes[id][2]*spriteSize,EntityTypes[id][3]*spriteSize,_x,_y,width*spriteSize,height*spriteSize);

}



function getLongestString(values){
	var res = "";

	for (var i = 0; i < values.length; i++){
		if (values[i].length > res.length){
			res = values[i];
		}
	}

	return res;
}