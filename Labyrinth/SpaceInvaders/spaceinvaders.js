var version='0.0.1';
var zSpielen=false;
var hatFeld=new Array(16);
for(var i=0;i<16;i++)
{
	hatFeld[i]=new Array(16);
}

function init()
{
	requestaframe=(function()
	  { return window.requestAnimationFrame        ||
			window.webkitRequestAnimationFrame  ||
			window.mozRequestAnimationFrame     ||
			window.oRequestAnimationFrame       ||
			window.msRequestAnimationFrame      ||
			 function(callback)
			 { window.setTimeout(callback,1000/60);}	
		 ;
	  })();
	
			
	zHintergrundCanvas=document.getElementById('background_canvas');
	zHintergrundCtx=background_canvas.getContext('2d');
	zMainCanvas=document.getElementById('main_canvas');
	zMainCtx=main_canvas.getContext('2d');
	
	document.addEventListener("keypress",tasteGedrueckt,false);
	
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			hatFeld[i][j]=new Feld(i*50,j*50);
		}}
	resetSpiel();
	ladeBilder();
	ladeSpielfeld();
}

function mouse(e)
{
	zMausX=e.pageX-document.getElementById('game_object').offsetLeft;
	zMausY=e.pageY-document.getElementById('game_object').offsetTop;
	document.getElementById('x').innerHTML=zMausX;
	document.getElementById('y').innerHTML=zMausY;	
}

function ladeBilder()
{
	zLabyrinthBild=new Image();
	zLabyrinthBild.src='bilder/labyrinth.png';
	zSpieler=new Image();
	zSpieler.src='bilder/feld.png';
}

function ladeSpielfeld()
{   

}

function tasteGedrueckt(e)
{
	
}

function resetSpielfeld()
{   
	
}

function restart()
{
	resetSpielfeld();
	zGewonnen=false;
	zGameOver=false;
	
}

function loop()
{
	
	
	requestaframe(loop);
}

function backToTheMaze()
{
	if(zGewonnen)
	{
		localStorage.setItem("MmindGewonnen","true");
	}
	var pTemp=localStorage.getItem("PuzzleGewonnen");
	var i=0;
	localStorage.setItem("MmindGewonnen","true");
	//window.open("../Labyrinth/Labyrinth.html","_self");
	close();
}

init();