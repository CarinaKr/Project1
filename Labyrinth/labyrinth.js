var version='0.0.1';
var zSpielen=false;
var hatFeld=new Array(16);
for(var i=0;i<16;i++)
{
	hatFeld[i]=new Array(16);
}
var zXSpieler=1;
var zYSpieler=7;
var zErwarteEingabe=false;


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
	document.addEventListener("storage",storage,false);
	
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			hatFeld[i][j]=new Feld(i*50,j*50);
		}}
	//resetSpiel();
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

	if(localStorage.getItem("MmindGewonnen")=="true")
	{
		localStorage.setItem("Feld"+1+9,"true");
		localStorage.setItem("Feld"+1+10,"true");
		localStorage.setItem("Feld"+2+9,"true");
		localStorage.setItem("Feld"+2+10,"true");
	}

	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			if(localStorage.getItem("Feld"+i+j)=="true")
			{
				hatFeld[i][j].zAktiv=true;
			}
		}}

	zHintergrundCtx.drawImage(zLabyrinthBild,0,0,800,600,0,0,800,600);
	zMainCtx.clearRect(0,0,800,600);
	zMainCtx.drawImage(zSpieler,0,0,100,100,hatFeld[zXSpieler][zYSpieler].zX+5,hatFeld[zXSpieler][zYSpieler].zY+3,45,45);
}

function Feld(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zAktiv=false;
}

function oben()
{
	if(zYSpieler>0&&hatFeld[zXSpieler][zYSpieler-1].zAktiv)
	{
		zYSpieler--;
		pruefeFeld(zXSpieler,zYSpieler);
	}
}

function unten()
{
	if(zYSpieler<15&&hatFeld[zXSpieler][zYSpieler+1].zAktiv)
	{
		zYSpieler++;
		pruefeFeld(zXSpieler,zYSpieler);
	}
}

function links1()
{
	if(zXSpieler>0&&hatFeld[zXSpieler-1][zYSpieler].zAktiv)
	{
		zXSpieler--;
		pruefeFeld(zXSpieler,zYSpieler);
	}
}

function rechts()
{
	if(zXSpieler<15&&hatFeld[zXSpieler+1][zYSpieler].zAktiv)
	{
		zXSpieler++;
		pruefeFeld(zXSpieler,zYSpieler);
	}
}

function pruefeFeld( pX, pY)
{
	zMainCtx.clearRect(0,0,800,600);
	zMainCtx.drawImage(zSpieler,0,0,100,100,hatFeld[zXSpieler][zYSpieler].zX+5,hatFeld[zXSpieler][zYSpieler].zY+3,45,45);

	var pSpiel=localStorage.getItem("spielFeld"+pX+pY);
	if(pSpiel=="Mastermind"||pSpiel=="Farben"||pSpiel=="Puzzle"||pSpiel=="Spiel4"||pSpiel=="Spiel5"||
		pSpiel=="Spiel6"||pSpiel=="Spiel7")
		{
			zErwarteEingabe=true;
		zMainCtx.fillStyle="grey";
		zMainCtx.font="20px Arial"
		zMainCtx.textBaseLine='bottom';
		zMainCtx.fillText("Press Enter",hatFeld[zXSpieler][zYSpieler].zX,hatFeld[zXSpieler][zYSpieler].zY);
	}
	else
	{zErwarteEingabe=false;}
	
}

function tasteGedrueckt(e)
{
	var pTaste=e.keyCode || e.which;
	if(zErwarteEingabe&&pTaste==13)
	{
		if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Mastermind")	//Spiel 1
		{
			window.open("Mastermind/Mastermind.html","");
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Puzzle")	//Spiel  2
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Farben")	//Spiel  3
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Spiel4")	//Spiel  4
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Spiel5")	//Spiel  5
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Spiel6")	//Spiel  6
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXSpieler+zYSpieler)=="Spiel7")	//Spiel  7
		{
			
		}
	}
}

function resetSpiel()
{
	for(var i=0;i<16;i++)
	{for(var j=0;j<16;j++)
		{
			localStorage.setItem("Feld"+i+j,"false");
			localStorage.setItem("spielFeld"+i+j,"");
		}}
	localStorage.setItem("Feld"+1+7,"true");
	localStorage.setItem("Feld"+1+8,"true");
	localStorage.setItem("Feld"+1+9,"true");
	for(var k=2;k<=8;k++)
	{localStorage.setItem("Feld"+2+k,"true");}
	localStorage.setItem("Feld"+3+2,"true");
	
	localStorage.setItem("spielFeld"+1+9,"Mastermind");
	localStorage.setItem("spielFeld"+3+2,"Puzzle");
	localStorage.setItem("spielFeld"+4+6,"Farben");
	localStorage.setItem("spielFeld"+6+3,"Spiel4");
	localStorage.setItem("spielFeld"+3+8,"Spiel5");
	localStorage.setItem("spielFeld"+9+4,"Spiel6");
	localStorage.setItem("spielFeld"+13+4,"Spiel7");
	
	localStorage.setItem("MmindGewonnen","false");
	localStorage.setItem("PuzzleGewonnen","false");
	localStorage.setItem("FarbenGewonnen","false");
	localStorage.setItem("Spiel3Gewonnen","false");
	localStorage.setItem("Spiel4Gewonnen","false");
	localStorage.setItem("Spiel5Gewonnen","false");
	localStorage.setItem("Spiel6Gewonnen","false");
	localStorage.setItem("Spiel7Gewonnen","false");
}

function storage(e)
{
	localStorage.setItem(e.key(),e.newValue());
}


init();