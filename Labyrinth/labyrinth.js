var version='0.0.1';
var zBeginn=0;

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
var zSpiel5Gewonnen="DartGewonnen";
var zSpiel6Gewonnen="SpaceInvadersGewonnen";
var zSpiel7Gewonnen="QuizGewonnen";

var zSpiel1Link="Mastermind/Mastermind.html";
var zSpiel2Link="Puzzle/Puzzle.html";
var zSpiel3Link="Farben/Farben.html";
var zSpiel4Link="Snake/Snake.html";
var zSpiel5Link="Dart/Dart.html";
var zSpiel6Link="SpaceInvaders/SpaceInvaders.html";
var zSpiel7Link="Quiz/Quiz.html";

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
	  
	  /*
	  === Feedback Alpers, Dez 2 ===
	  
	  Das sieht sehr danach aus, als wenn Ihre Anwendung nicht systemunabhängig ist. Genau das war aber 
	  für das Projekt gefordert.
	  
	  === Feedback Alpers, Ende ===
	  */
	
			
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
		
	if(localStorage.getItem("Reset")==null)
	{
		resetSpiel();
		localStorage.setItem("Reset",true);
	}
	ladeBilder();
	ladeSpielfeld();
	loop();
}

function mouse(e)
{
	zMausX=e.pageX-document.getElementById('game_object').offsetLeft;
	zMausY=e.pageY-document.getElementById('game_object').offsetTop;
	//document.getElementById('x').innerHTML=zMausX;
	//document.getElementById('y').innerHTML=zMausY;	
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
			else if(localStorage.getItem("Feld"+i+j)=="false")
			{
				hatFeld[i][j].zAktiv=false;
			}
		}}

	zHintergrundCtx.drawImage(zLabyrinthBild,0,0,800,600,0,0,800,600);
	//Schlösser setzen
	if(localStorage.getItem(zSpiel1Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+1+9)=="true"||localStorage.getItem("Feld"+2+10)=="true")	//Raum 1
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,75,470,50,60);}
		else if(localStorage.getItem("Feld"+1+9)=="false"||localStorage.getItem("Feld"+2+10)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,75,470,50,60);}
	}
	if(localStorage.getItem(zSpiel2Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+3+2)=="true"||localStorage.getItem("Feld"+3+11)=="true")	//Raum 2
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,170,120,50,60);}
		else if(localStorage.getItem("Feld"+3+2)=="false"||localStorage.getItem("Feld"+3+11)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,170,120,50,60);}
	}
	if(localStorage.getItem(zSpiel3Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+4+6)=="true"||localStorage.getItem("Feld"+5+5)=="true")	//Raum 3
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,225,275,50,60);}
		else if(localStorage.getItem("Feld"+4+6)=="false"||localStorage.getItem("Feld"+5+5)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,225,275,50,60);}
	}
	if(localStorage.getItem(zSpiel4Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+6+3)=="true"||localStorage.getItem("Feld"+7+3)=="true")	//Raum 4
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,325,120,50,60);}
		else if(localStorage.getItem("Feld"+6+3)=="false"||localStorage.getItem("Feld"+7+3)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,325,120,50,60);}
	}
	if(localStorage.getItem(zSpiel5Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+6+8)=="true"||localStorage.getItem("Feld"+7+7)=="true")	//Raum 5
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,325,375,50,60);}
		else if(localStorage.getItem("Feld"+6+8)=="false"||localStorage.getItem("Feld"+7+7)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,325,375,50,60);}
	}
	if(localStorage.getItem(zSpiel6Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+9+4)=="true")	//Raum 6
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,475,225,50,60);}
		else if(localStorage.getItem("Feld"+9+4)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,475,225,50,60);}
	}
	if(localStorage.getItem(zSpiel7Gewonnen)=="false")
	{
		if(localStorage.getItem("Feld"+13+4)=="true")	//Raum 7
		{zHintergrundCtx.drawImage(zSpieler,0,100,65,90,675,175,50,60);}
		else if(localStorage.getItem("Feld"+13+4)=="false")
		{zHintergrundCtx.drawImage(zSpieler,100,10,65,90,675,175,50,60);}
	}
	
	/*
	=== Feedback Alpers, Dez 2 ===
	
	Fassen Sie diese Kontrollstruktur bitte zu einer Funktion zusammen.
	
	=== Feedback Alpers, Ende ===
	*/
	
	zMainCtx.clearRect(0,0,800,600);
	var zXS=parseInt(localStorage.getItem("zXSpieler"));
	var zYS=parseInt(localStorage.getItem("zYSpieler"));
	zMainCtx.drawImage(zSpieler,0,0,100,100,hatFeld[zXS][zYS].zX+5,hatFeld[zXS][zYS].zY+3,45,45);
	pruefeFeld(zXS,zYS);
	

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
	if(zYS>0&&hatFeld[zXS+0][zYS-1].zAktiv&&nachObenErlaubt(zXS,zYS))
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
	if(zYS<15&&hatFeld[zXS][zYS+1].zAktiv&&nachUntenErlaubt(zXS,zYS))
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
	if(zXS>0&&hatFeld[zXS-1][zYS].zAktiv&&nachLinksErlaubt(zXS,zYS))
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
	if(zXS<15&&hatFeld[zXS+1][zYS].zAktiv&&nachRechtsErlaubt(zXS,zYS))
	{
		zXS++;
		localStorage.setItem("zXSpieler",zXS);
		pruefeFeld(zXS,zYS);
	}
}

/*
=== Feedback Alpers, Dez 2 ===

Fassen Sie die vier Funktionen für die Richtungen bitte zu einer zusammen.

=== Feedback Alpers, Ende ===
*/

function nachObenErlaubt(pX,pY)
{
	if((pX==4&&pY==4)||(pX==7&&pY==4)||(pX==9&&pY==6)||(pX==10&&pY==6)
		||(pX==5&&pY==7)||(pX==8&&pY==7)||(pX==9&&pY==7)||(pX==7&&pY==9)
		||(pX==3&&pY==10)||(pX==4&&pY==10)||(pX==5&&pY==10)||(pX==5&&pY==10)||(pX==7&&pY==10)
		||(pX==2&&pY==9)||(pX==4&&pY==5)||(pX==5&&pY==5)||(pX==6&&pY==7)||(pX==7&&pY==7)
		||(pX==9&&pY==4)||(pX==9&&pY==4)||(pX==8&&pY==4))
	{
		return false;
	}
	
	return true;
}
function nachUntenErlaubt(pX,pY)
{
	if((pX==2&&pY==8)||(pX==4&&pY==4)||(pX==5&&pY==4)||(pX==6&&pY==6)||(pX==7&&pY==6)
		||(pX==8&&pY==6)||(pX==9&&pY==6)||(pX==8&&pY==3)||(pX==9&&pY==3)||(pX==10&&pY==3)
		||(pX==3&&pY==9)||(pX==4&&pY==9)||(pX==5&&pY==9)||(pX==6&&pY==9)||(pX==7&&pY==9)
		||(pX==3&&pY==3)||(pX==7&&pY==3)||(pX==5&&pY==6)||(pX==7&&pY==8)||(pX==4&&pY==3)
		||(pX==10&&pY==5)||(pX==10&&pY==5)||(pX==9&&pY==5))
	{
		return false;
	}
	
	return true;
}
function nachLinksErlaubt(pX,pY)
{
	if((pX==3&&pY==9)||(pX==5&&pY==2)||(pX==6&&pY==6)||(pX==8&&pY==2)||(pX==8&&pY==8)
		||(pX==8&&pY==9)||(pX==10&&pY==6)||(pX==11&&pY==4)||(pX==11&&pY==5)
		||(pX==3&&pY==3)||(pX==4&&pY==5)||(pX==4&&pY==6)||(pX==6&&pY==2)||(pX==6&&pY==3)
		||(pX==6&&pY==7)||(pX==6&&pY==8)||(pX==9&&pY==5)||(pX==2&&pY==7))
	{
		return false;
	}
	
	return true;
}
function nachRechtsErlaubt(pX,pY)
{
	if((pX==2&&pY==3)||(pX==5&&pY==2)||(pX==5&&pY==3)||(pX==5&&pY==7)||(pX==7&&pY==9)
		||(pX==1&&pY==7)||(pX==5&&pY==8)
		||(pX==2&&pY==9)||(pX==4&&pY==2)||(pX==5&&pY==6)||(pX==7&&pY==2)||(pX==7&&pY==8)
		||(pX==10&&pY==4)||(pX==10&&pY==5))
	{
		return false;
	}
	
	return true;
}

/*
=== Feedback Alpers, Dez 2 ===

Fassen Sie diese vier Funktionen bitte zu einer zusammen.

=== Feedback Alpers, Ende ===
*/

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
			window.open(zSpiel5Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel6")	//Spiel  6
		{
			window.open(zSpiel6Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel7")	//Spiel  7
		{
			window.open(zSpiel7Link,"");
		}
}

/* 
=== Feedback Alpers, Dez 2 ===

Nutzen Sie hier bitte Switch/Cases und nutzen Sie am Ende einmal den Funktionsaufruf window.open()
Verschmelzen Sie außerdem diese Funktion mit der Funktion tasteGedrueckt(e) zu einer Funktion.

=== Feedback Alpers, Ende ===
*/

function reset()
{
	resetSpiel();
	ladeSpielfeld();
}

function win()
{
	localStorage.setItem("MmindGewonnen","true");
	localStorage.setItem("PuzzleGewonnen","true");
	localStorage.setItem("FarbenGewonnen","true");
	localStorage.setItem("SnakeGewonnen","true");
	localStorage.setItem("DartGewonnen","true");
	localStorage.setItem("SpaceInvadersGewonnen","true");
	localStorage.setItem("QuizGewonnen","true");
	ladeSpielfeld();
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
		
		/*
		=== Feedback Alpers, Dez 2 ===
		
		Gliedern Sie dieses Konditional (a or b or c or ...) bitte in eine Funktion aus.
		
		=== Feedback Alpers, Ende ===
		*/
		
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
			window.open(zSpiel4Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel5")	//Spiel  5
		{
			window.open(zSpiel5Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel6")	//Spiel  6
		{
			window.open(zSpiel6Link,"");
		}
		else if(localStorage.getItem("spielFeld"+zXS+zYS)=="Spiel7")	//Spiel  7
		{
			window.open(zSpiel7Link,"");
		}
	}
}

function resetSpiel()
{
	zBeginn=0;
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
	localStorage.setItem("SnakeGewonnen","false");
	localStorage.setItem("DartGewonnen","false");
	localStorage.setItem("SpaceInvadersGewonnen","false");
	localStorage.setItem("QuizGewonnen","false");
	
	localStorage.setItem("zXSpieler","1");
	localStorage.setItem("zYSpieler","7");
	
	/*
	=== Feedback Alpers, Dez 2 ===
	
	Ändern Sie das bitte in eine Schleife ab, in der der Methodenaufruf mit den in jedem Schleifendurchlauf
	geänderten Argumenten aufgerufen wird.
	
	=== Feedback Alpers, Dez 2 ===
	*/
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
	{spiel4Freischalten();}
	else if(i==zSpiel5Gewonnen&&j=="true")
	{spiel5Freischalten();}
	else if(i==zSpiel6Gewonnen&&j=="true")
	{spiel6Freischalten();}
	else if(i==zSpiel7Gewonnen&&j=="true")
	{spiel7Freischalten();}

	/*
	=== Feedback Alpers, Dez 2 ===
	
	Bitte ändern Sie auch diesen Teil in Switch/Cases um.
	
	=== Feedback Alpers, Dez 2 ===
	*/

	if(localStorage.getItem(zSpiel1Gewonnen)=="true"
		&&localStorage.getItem(zSpiel2Gewonnen)=="true"
		&&localStorage.getItem(zSpiel3Gewonnen)=="true"
		&&localStorage.getItem(zSpiel4Gewonnen)=="true"
		&&localStorage.getItem(zSpiel5Gewonnen)=="true"
		&&localStorage.getItem(zSpiel6Gewonnen)=="true")
	{
		//Eingang von Spiel 7 freischalten
		localStorage.setItem("Feld"+13+4,"true");
	}

	/*
	=== Feedback Alpers, Dez 2 ===
	
	Gliedern Sie bitte auch hier das Konditional in eine eigene Funktion aus.
	
	=== Feedback Alpers, Dez 2 ===
	*/
	
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
	//Raum von spiel 6
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
		localStorage.setItem("Feld"+2+10,"true");
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
		localStorage.setItem("Feld"+4+4,"true");
		
			//Türen
		localStorage.setItem("Feld"+6+3,"true");
		localStorage.setItem("Feld"+5+5,"true");
		localStorage.setItem("Feld"+9+4,"true");
		localStorage.setItem("Feld"+4+3,"true");
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

/*
=== Feedback Alpers, Dez 2 ===

Auch hier (gemeint sind alle ...Freischalten()-Funktionen können Sie die Fehleranfälligkeit deutlich reduzieren,
indem Sie mehrere Funktionen zu einer Verschmelzen und mehrfach auftretende gleichartige Funktionsaufrufe,
wie localStorage.setItem() über eine Iteration ausführen.

=== Feedback Alpers, Ende ===
*/

function loop()
{
	if(zBeginn<3)
	{ladeSpielfeld();
	 requestaframe(loop);
	 zBeginn++;
	}
}

init();

/*
=== Feedback Alpers, Dez 2 ===

Lassen Sie sich nicht von den vielen Kommentaren irritieren. Sie haben hier einen echten ersten Zwischenstand erreicht.
Die ganzen Kommentare haben folgenden Hintergrund: In einem Softwareprojekt sind bezüglich des Quellcodes u.a. zwei Dinge sehr wichtig,
die gemeinsam zu einem dritten Grund führen:

1. Möglichst geringe Fehleranfälligkeit. 
Eines der wirkungsvollsten Mittel dagegen besteht darin, dass gleiche Funktionalitäten, 
die im Programm mehrfach auftauchen in Funktionen ausgegliedert werden.

2. Leicht lesbarer Code.
Es ist für Projekte überlebenswichtig, dass jede/r sich in kurzer Zeit in einen Code einarbeiten kann.
(Und das bezieht auch die/denjenigen mit ein, der/die den Code programmiert haben. Versuchen Sie mal diese Datei in einem Monat zu verstehen,
ohne sich intensiv wieder in die Aufgabe einzuarbeiten.)
Leider ist bei dieser Datei kaum erkennbar, warum die einzelnen Funktionen und Aufrufe in der gegebenen Reihenfolge vorgenommen werden.
Auch die setItem()-Funktion ist nicht wirklich klar.
Aus diesen Gründen sollten Sie Ihren Code mit kurzen Kommentaren versehen, die das Einlesen erleichtern.

3. Leicht erweiterbarer Code.
Praktisch alle Softwareprojekte werden kontinuierlich erweitert. Und auch wenn Sie bei den Fallunterscheidungen
meist weniger als 10 Fälle hatten, können Sie sich darauf verlassen, dass das mittel- bis langfristig Dutzende
bis Hunderte Fälle werden. Wenn Sie dann jeden Fall wie hier implementieren und nicht den Umweg über eine oder mehrere
Funktionen gehen, die die Konditionale eigenständig prüfen, dann haben Sie nicht nur massiv überfrachtete und damit
unlesbare Programmzeilen, sondern obendrein noch eine so hohe Fehlerwahrscheinlichkeit, dass Sie schon von einer sicheren Fehlerhaftigkeit sprechen können.

All das gilt entsprechend auch für die übrigen Spiele, die Sie programmiert haben. 
Aber es genügt mir, wenn Sie die Änderung bei dieser Datei einarbeiten.

=== Feedback Alpers, Ende ===
