var version='0.0.1';
var hatFeld=new Array(28);
for(var i=0;i<28;i++)
{
	hatFeld[i]=new Array(28);
}
var zGroesse=50;
var zX0=150;var zY0=100;
var zGewonnen=false;
var zGameOver=false;
var zGameStarted=false;

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
	
	
	for(var m=0;m<28;m++)
	{for(var n=0;n<28;n++)
		{hatFeld[m][n]=new Feld(m,n,Math.round(Math.random()*6));
		}
	}

	ladeBilder();
	resetSpielfeld();
	loop();
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
	zFeldBild=new Image();
	zFeldBild.src='bilder/gesamt.png';
}

function resetSpielfeld()
{   
	for(var m=0;m<28;m++)
	{for(var n=0;n<28;n++)
		{
			hatFeld[m][n].zFarbe=Math.round(Math.random()*6);
		}
	}
	zGameStarted=true;
}

function Feld(pX,pY,pNummer)
{
	this.zX=pX;
	this.zY=pY;
	this.zSrcX;
	this.zSrcY;
	this.zNummer=pNummer;
	
	if(pNummer==0)
	{this.zSrcX=0;this.zSrcY=0;} //blau
	else if(pNummer==1)
	{this.zSrcX=50;this.zSrcY=0;}  //rot
	else if(pNummer==2)
	{this.zSrcX=100;this.zSrcY=0;} //gelb
	else if(pNummer==3)
	{this.zSrcX=0;this.zSrcY=50;} //gruen
	else if(pNummer==4)
	{this.zSrcX=50;this.zSrcY=50;} //orange
	else if(pNummer==5)
	{this.zSrcX=100;this.zSrcY=50;} //hellblau
}


function pruefeGameOver()
{
	
}

function restart()
{
	zGameStarted=false;
	zGewonnen=false;
	zGameOver=false;
	resetSpielfeld();
}


function backToTheMaze()
{
	window.history.back();
}


init();