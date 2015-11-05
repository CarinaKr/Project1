var version='0.0.1';
var zSpielen=false;
var hatFeld=new Array(16);
for(var i=0;i<16;i++)
{
	hatFeld[i]=new Array(16);
}
var zXSpieler=55;
var zYSpieler=303;


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
	
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			hatFeld[i]=new Feld(i*50,j*50);
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
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			if()
		}}

	zHintergrundCtx.drawImage(zLabyrinthBild,0,50,800,600,0,0,800,600);
	zMainCtx.clearRect(0,0,800,600);
	zMainCtx.drawImage(zSpieler,0,0,100,100,zXSpieler,zYSpieler,45,45);
}

function Feld(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zAktiv=false;
}

function oben()
{
	
}

function unten()
{
	
}

function links()
{
	
}

function rechts()
{
	
}

resetSpiel()
{
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			localStorage.setItem("Feld"+i+j,"false");
		}}
	localStorage.setItem("Feld"+01+07,"true");
	localStorage.setItem("Feld"+01+08,"true");
	for(var k=2;k<=8;k++)
	{localStorage.setItem("Feld"+02+0k,"true");}
}

function backToTheMaze()
{
	window.history.back();
}


init();