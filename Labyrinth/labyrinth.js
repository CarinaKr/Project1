var version='0.0.1';
var zSpielen=false;
var hatFeld=new Array(16);
for(var i=0;i<16;i++)
{
	hatFeld[i]=new Array(16);
}
var zErwarteEingabe=false;

var zSpiel1Gewonnen="MmindGewonnen";
var zSpiel2Gewonnen="PuzzleGewonnen";
var zSpiel3Gewonnen="FarbenGewonnen";
var zSpiel4Gewonnen="SnakeGewonnen";

var zSpiel1Link="Mastermind/Mastermind.html";
var zSpiel2Link="Puzzle/Puzzle.html";
var zSpiel3Link="Farben/Farben.html";
var zSpiel4Link="Snake/Snake.html";

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
	window.addEventListener("storage",storage,false);
	
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
	//var tempWindow=window.open("../Mastermind/Mastermind.html","");
	//var pString=tempWindow.temp();
	//tempWindow.close();
	
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
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	zMainCtx.drawImage(zSpieler,0,0,100,100,hatFeld[zXS][zYS].zX+5,hatFeld[zXS][zYS].zY+3,45,45);
	
	document.getElementById("enter").disabled = true;
}

function Feld(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zAktiv=false;
}

function oben()
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	if(zYS>0&&hatFeld[zXS+0][zYS-1].zAktiv)
	{
		zYS--;
		localStorage.setItem("zYSpieler",zYS);
		pruefeFeld(zXS,zYS);
	}
}

function unten()
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	if(zYS<15&&hatFeld[zXS][zYS+1].zAktiv)
	{
		zYS++;
		localStorage.setItem("zYSpieler",zYS);
		pruefeFeld(zXS,zYS);
	}
}

function links1()
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	if(zXS>0&&hatFeld[zXS-1][zYS].zAktiv)
	{
		zXS--;
		localStorage.setItem("zXSpieler",zXS);
		pruefeFeld(zXS,zYS);
	}
}

function rechts()
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	if(zXS<15&&hatFeld[zXS+1][zYS].zAktiv)
	{
		zXS++;
		localStorage.setItem("zXSpieler",zXS);
		pruefeFeld(zXS,zYS);
	}
}

function enter()
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	
		if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel1")	//Spiel 1
		{
			window.open(zSpiel1Link,"");			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel2")	//Spiel  2
		{
			window.open(zSpiel2Link,"");	
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel3")	//Spiel  3
		{
			window.open(zSpiel3Link,"");	
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel4")	//Spiel  4
		{
			window.open(zSpiel4Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel5")	//Spiel  5
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel6")	//Spiel  6
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel7")	//Spiel  7
		{
			
		}
}

function pruefeFeld( pX, pY)
{
	zMainCtx.clearRect(0,0,800,600);
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	zMainCtx.drawImage(zSpieler,0,0,100,100,hatFeld[pX][pY].zX+5,hatFeld[pX][pY].zY+3,45,45);

	var button=document.getElementById("enter");
	var pSpiel=localStorage.getItem("spielFeld"+pX+pY);
	if(pSpiel=="Spiel1"||pSpiel=="Spiel2"||pSpiel=="Spiel3"||pSpiel=="Spiel4"||pSpiel=="Spiel5"||
		pSpiel=="Spiel6"||pSpiel=="Spiel7")
		{
			zErwarteEingabe=true;
			document.getElementById("enter").disabled = false;
		/*zMainCtx.fillStyle="grey";
		zMainCtx.font="20px Arial"
		zMainCtx.textBaseLine='bottom';
		zMainCtx.fillText("Press Enter",hatFeld[zXS][zYS].zX,hatFeld[zXS][zYS].zY);*/
	}
	else
	{zErwarteEingabe=false;
	 document.getElementById("enter").disabled = true;}
	
}

function tasteGedrueckt(e)
{
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	var pTaste=e.keyCode || e.which;
	if(zErwarteEingabe&&pTaste==13)
	{
		if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel1")	//Spiel 1
		{
			window.open(zSpiel1Link,"");			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel2")	//Spiel  2
		{
			window.open(zSpiel2Link,"");	
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel3")	//Spiel  3
		{
			window.open(zSpiel3Link,"");	
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel4")	//Spiel  4
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel5")	//Spiel  5
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel6")	//Spiel  6
		{
			
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel7")	//Spiel  7
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
	raum1Freischalten();
	
	localStorage.setItem("spielFeld"+1+9,"Spiel1");
	localStorage.setItem("spielFeld"+2+10,"Spiel1");
	localStorage.setItem("spielFeld"+3+2,"Spiel2");
	localStorage.setItem("spielFeld"+4+3,"Spiel2");
	localStorage.setItem("spielFeld"+4+6,"Spiel3");
	localStorage.setItem("spielFeld"+5+5,"Spiel3");
	localStorage.setItem("spielFeld"+6+3,"Spiel4");
	localStorage.setItem("spielFeld"+7+3,"Spiel4");
	localStorage.setItem("spielFeld"+6+8,"Spiel5");
	localStorage.setItem("spielFeld"+7+7,"Spiel5");
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
	
	localStorage.setItem("zXSpieler","1");
	localStorage.setItem("zYSpieler","7");
}

function storage(e)
{
	var i=e.key;
	var j=e.newValue;
	
	localStorage.setItem(e.key,e.newValue);
	if(i==zSpiel1Gewonnen&&j=="true")
	{spiel1Freischalten();}
	else if(i==zSpiel2Gewonnen&&j=="true")
	{spiel2Freischalten();}
	else if(i==zSpiel3Gewonnen&&j=="true")
	{spiel3Freischalten();}
	else if(i==zSpiel4Gewonnen&&j=="true")
	{spiel3Freischalten();}

	ladeSpielfeld();
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	pruefeFeld(zXS,zYS);
}

function spiel1Freischalten()
{
		//localStorage.setItem("spielFeld"+1+9,"");
		//localStorage.setItem("spielFeld"+2+10,"");
		
		//Raum von Spiel 1
		localStorage.setItem("Feld"+1+9,"true");
		localStorage.setItem("Feld"+2+9,"true");
		localStorage.setItem("Feld"+1+10,"true");
		localStorage.setItem("Feld"+2+10,"true");
		
		raum2Freischalten();
}
function spiel2Freischalten()
{
		//localStorage.setItem("spielFeld"+3+2,"");
		//localStorage.setItem("spielFeld"+4+3,"");
		
		//Raum von Spiel 2
		localStorage.setItem("Feld"+3+2,"true");
		localStorage.setItem("Feld"+3+3,"true");
		localStorage.setItem("Feld"+4+2,"true");
		localStorage.setItem("Feld"+4+3,"true");
		
		raum3Freischalten();	
}
function spiel3Freischalten()
{
	//localStorage.setItem("spielFeld"+4+6,"");
	//localStorage.setItem("spielFeld"+5+5,"");
	
	//Raum von spiel 3
	for(var k=4;k<=5;k++)
		{ for(var l=5;l<=6;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
	
	raum3Freischalten();
	raum4Freischalten();
	
}
function spiel4Freischalten()
{
	//Raum von spiel 4
	for(var k=6;k<=7;k++)
		{ for(var l=2;l<=3;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
	
	raum3Freischalten();
	raum2Freischalten();
}
function spiel5Freischalten()
{
	//Raum von spiel 5
	for(var k=6;k<=7;k++)
		{ for(var l=7;l<=8;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
	
	raum2Freischalten();
	raum4Freischalten();
}
function spiel6Freischalten()
{
	//Raum von spiel 3
	for(var k=9;k<=10;k++)
		{ for(var l=4;l<=5;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
}
function spiel7Freischalten()
{
	//Raum von spiel 7
	for(var k=13;k<=14;k++)
		{ for(var l=3;l<=4;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
}

function raum1Freischalten()
{
	localStorage.setItem("Feld"+1+7,"true");
	localStorage.setItem("Feld"+1+8,"true");
	localStorage.setItem("Feld"+1+9,"true");
	for(var k=2;k<=8;k++)
	{localStorage.setItem("Feld"+2+k,"true");}
	localStorage.setItem("Feld"+3+2,"true");
}
function raum2Freischalten()
{
		
		for(var i=3;i<=8;i++)
		{localStorage.setItem("Feld"+i+10,"true");}
		localStorage.setItem("Feld"+8+9,"true");
		localStorage.setItem("Feld"+8+8,"true");
		localStorage.setItem("Feld"+9+8,"true");
		for(var j=8;j<=11;j++)
		{localStorage.setItem("Feld"+j+7,"true");}
		localStorage.setItem("Feld"+10+6,"true");
		localStorage.setItem("Feld"+11+6,"true");
		localStorage.setItem("Feld"+11+5,"true");
		localStorage.setItem("Feld"+11+4,"true");
		localStorage.setItem("Feld"+12+4,"true");
		for(var k=8;k<=11;k++)
		{ for(var l=2;l<=3;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
		
		localStorage.setItem("Feld"+7+3,"true");
		localStorage.setItem("Feld"+7+7,"true");
}
function raum3Freischalten()
{
		for(var k=5;k<=5;k++)
		{ for(var l=2;l<=4;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
		for(var i=6;i<=8;i++)
		{ for(var j=4;j<=6;j++)
			{localStorage.setItem("Feld"+i+j,"true");}
		}
		localStorage.setItem("Feld"+9+6,"true");
		
			//Türen
		localStorage.setItem("Feld"+6+3,"true");
		localStorage.setItem("Feld"+5+5,"true");
		localStorage.setItem("Feld"+9+4,"true");
		
}
function raum4Freischalten()
{
	for(var k=4;k<=5;k++)
		{ for(var l=7;l<=8;l++)
			{localStorage.setItem("Feld"+k+l,"true");}
		}
	for(var i=3;i<=7;i++)
	{localStorage.setItem("Feld"+i+9,"true");}
	
	//Türen
	localStorage.setItem("Feld"+4+6,"true");
	localStorage.setItem("Feld"+6+8,"true");
}

init();