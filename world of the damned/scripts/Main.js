var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.fillStyle = "blue";
context.fillRect(0,0,600,600);
context.canvas.width = 600;
context.canvas.height = 600;
context.imageSmoothingEnabled = false;


var testImage = new Image();
testImage.onload = function(){ 
	init();

}

var left = false;
var right = false;
var up = false;
var down = false;

document.onkeydown = function (e)
{
	var key = e.keyCode;
	
	if (key == 87)
		up = true;
	
	if (key == 65)
		left = true;
	
	if (key == 68)
		right = true;
	
	if (key == 83)
		down = true;
}

document.onkeyup = function (e)
{
	var key = e.keyCode;
	
	if (key == 87)
		up = false;
	
	if (key == 65)
		left = false;
	
	if (key == 68)
		right = false;
	
	if (key == 83)
		down = false;
}


var player;

var screenX = 0;
var screenY = 0;

function init(){
	player = new Player(1,2);
	loadDoc("maps/test.json");
	run();
}

var d = new Date();

var current = 0;
var old = d.getTime();
var deltaTime = 0;

function run(){


	d = new Date();

	current = d.getTime();

	deltaTime = current - old;
	old = current;
	update(deltaTime/1000);
	render();

	if (loadedData != "NOTHING"){
		console.log(loadedData);
		tekst = readMap(loadedData);
		console.log(tekst);

		console.log("attempt to load map");
		loadMap(tekst);
		console.log("attempted to load map");
		
		loadedData = "NOTHING";
	}

	requestAnimationFrame(run);
}

function render(){

	clearScreen(context);
	
	if (MapData !=null && CollisionData != null)
	{
	RenderMap(context);
	drawCols(context);
	RenderEntities(context);
	Interact();
	player.drawPlayer(context);
	}
}

function update(deltaTime){
	if (CollisionData != null)
	{
	player.movePlayer(up,down,left,right,context,deltaTime);
	}
}



window.onload = function(){ testImage.src = "spriteSheetTest.png"; }