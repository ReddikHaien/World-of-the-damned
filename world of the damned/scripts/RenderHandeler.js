

function DrawSpeakBox(context, x,y,minHeight, id){


	context.fillStyle = "white";
	
	var boxsize = interactiontick * (1/50);

	var text = Entities[id].getDialouge().split(";");
	
	var speakBoxWidth = getLongestString(text).length/7;
	var speakBoxHeight = text.length/4;
	boxsize = Math.min(boxsize,1);


	//console.log(x + " " + y + " " + boxsize + " " + speakBoxWidth);
	drawRect(context,x,y+speakBoxHeight,boxsize*speakBoxWidth,boxsize*speakBoxHeight);

		if (interactiontick* 1/50 > 1){
		context.fillStyle = "black";

		for (var i = 0; i < text.length; i++){
			drawText(context,x,y+speakBoxHeight-0.20-i*0.25,text[i]);		
		}
	}



}


function RenderEntities(context){
	if (Entities != null){
		for (var i = 0; i < Entities.length; i++){
			context.fillStyle = "magenta";
			Entities[i].draw(context);
		}
	}
}


function RenderMap(context){
	if (MapData != null){
		for (var i = 0; i < MapData.length; i++){
			if (MapData[i][0] == 0){ // polygon
				context.fillStyle = MapData[i][MapData[i].length-1];
				context.beginPath();
				context.moveTo((MapData[i][1] - screenX)*spriteSize + 600/2,600 - (MapData[i][2] - screenY)*spriteSize - 300);
				for (var j = 3; j < MapData[i].length-1; j+=2){
					context.lineTo((MapData[i][j] - screenX)*spriteSize + 600/2, 600 - (MapData[i][j+1] - screenY)*spriteSize - 300);
				}
				context.closePath();
				context.fill();
			}
		}
	}
}
