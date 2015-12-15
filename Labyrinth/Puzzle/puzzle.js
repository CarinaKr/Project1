var version='0.0.1';
var hatFeld=new Array(4);
var hatFeldBackground=new Array(4);
for(var i=0;i<4;i++)
{
	hatFeld[i]=new Array(4);
	hatFeldBackground[i]=new Array(4);
}
var zGroesse=80;
var zX0=150;var zY0=100;
var zMausX;
var zMausY;
var zGewonnen=false;
var zGameOver=false;
var zAltX,zNeuX,zAltY,zNeuY;
var zNummerAusgewaehlt;
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
	
	document.addEventListener("mousedown",mausGedrueckt,false);
	document.addEventListener("mouseup",mausLosgelassen,false);
	
	
	for(var m=0;m<4;m++)
	{for(var n=0;n<4;n++)
		{hatFeld[m][n]=new Feld(zX0+m*zGroesse,zY0+n*zGroesse,(m+1)+(n*4));
		 hatFeldBackground[m][n]=new FeldBackground(zX0+m*zGroesse,zY0+n*zGroesse);
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
	zeichneHintergrund();
	for(var m=0;m<4;m++)
	{for(var n=0;n<4;n++)
		{
			hatFeldBackground[m][n].zNummerErhalten=(m+1)+(n*4);
			hatFeldBackground[m][n].zBesetzt=false;
			hatFeldBackground[m][n].zEnthaehlt=false;
			hatFeldBackground[m][n].zAusgewaehlt=false;
			hatFeld[m][n].zX=zX0+(m*zGroesse);
			hatFeld[m][n].zY=zY0+(n*zGroesse);
			hatFeld[m][n].zBesetzt=false;
			hatFeld[m][n].zEnthaehlt=false;
			hatFeld[m][n].zAusgewaehlt=false;
		}
	}
	shuffle();
	zGameStarted=true;
}

function zeichneHintergrund()
{
	zHintergrundCtx.drawImage(zFeldBild,300,300,100,100,zX0-4,zY0-4,(zGroesse*4)+8,(zGroesse*4)+8);
}

function Feld(pX,pY,pNummer)
{
	this.zX=pX;
	this.zY=pY;
	this.zSrcX;
	this.zSrcY;
	this.zEnthaehlt=false;
	this.zAusgewaehlt=false;
	this.zNummer=pNummer;
	
	if(pNummer==1)
	{this.zSrcX=0;this.zSrcY=0;}
	else if(pNummer==2)
	{this.zSrcX=100;this.zSrcY=0;}
	else if(pNummer==3)
	{this.zSrcX=200;this.zSrcY=0;}
	else if(pNummer==4)
	{this.zSrcX=300;this.zSrcY=0;}
	else if(pNummer==5)
	{this.zSrcX=0;this.zSrcY=100;}
	else if(pNummer==6)
	{this.zSrcX=100;this.zSrcY=100;}
	else if(pNummer==7)
	{this.zSrcX=200;this.zSrcY=100;}
	else if(pNummer==8)
	{this.zSrcX=300;this.zSrcY=100;}
	else if(pNummer==9)
	{this.zSrcX=0;this.zSrcY=200;}
	else if(pNummer==10)
	{this.zSrcX=100;this.zSrcY=200;}
	else if(pNummer==11)
	{this.zSrcX=200;this.zSrcY=200;}
	else if(pNummer==12)
	{this.zSrcX=300;this.zSrcY=200;}
	else if(pNummer==13)
	{this.zSrcX=0;this.zSrcY=300;}
	else if(pNummer==14)
	{this.zSrcX=100;this.zSrcY=300;}
	else if(pNummer==15)
	{this.zSrcX=200;this.zSrcY=300;}
	
}


function FeldBackground(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zNummerErhalten;
	this.zBesetzt=false;
	this.zEnthaehlt=false;
	this.zAusgewaehlt=false;
}
FeldBackground.prototype.enthaehlt=function(pX,pY)
{
	if(pX>this.zX&&pX<this.zX+(zGroesse)&&pY>this.zY&&pY<this.zY+(zGroesse))
	{this.zEnthaehlt=true;}
	else
	{this.zEnthaehlt=false;}
};



function mausGedrueckt()
{if(zGameOver==false)
  { for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			hatFeldBackground[i][j].enthaehlt(zMausX,zMausY);
			if(hatFeldBackground[i][j].zEnthaehlt)
			{
				hatFeldBackground[i][j].zAusgewaehlt=true;
				zNummerAusgewaehlt=hatFeldBackground[i][j].zNummerErhalten;
				zAltX=i;zAltY=j;
			}
		}
	}
   }
}

function mausLosgelassen()
{ if(zGameOver==false)
  {
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			hatFeldBackground[i][j].enthaehlt(zMausX,zMausY);
			if(hatFeldBackground[i][j].zEnthaehlt&&hatFeldBackground[i][j].zNummerErhalten==16)
			{
				zNeuX=i;zNeuY=j;
				if(zNeuX!=zAltX||zNeuY!=zAltY)	//nicht gleiches Feld
				{
					if((zNeuX==zAltX+1&&zAltY==zNeuY)||(zNeuX==zAltX-1&&zAltY==zNeuY)
						||(zNeuY==zAltY+1&&zAltX==zNeuX)||(zNeuY==zAltY-1&&zAltX==zNeuX))
					{
						hatFeldBackground[zNeuX][zNeuY].zNummerErhalten=hatFeldBackground[zAltX][zAltY].zNummerErhalten;
						hatFeldBackground[zAltX][zAltY].zNummerErhalten=16;
						
						for(var m=0;m<4;m++)
						{ for(var n=0;n<4;n++)
							{
								if(hatFeld[m][n].zNummer==zNummerAusgewaehlt)
								{hatFeld[m][n].zX=zX0+(zNeuX*zGroesse);
								  hatFeld[m][n].zY=zY0+(zNeuY*zGroesse);}
							}				
						}
					}
				}
			}
			hatFeldBackground[i][j].zEnthaehlt=false;
		}
	}
	zNummerAusgewaehlt=0;
  }
}

function pruefeGameOver()
{
	var pRichtige=0;
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(hatFeldBackground[i][j].zNummerErhalten==(i+1)+(j*4))
			{
				pRichtige++;
			}
		}
	}
	if(pRichtige==16)
	{
		zGameOver=true;
		zGewonnen=true;
	}
}

function shuffle()
{
	var pZufallRichtung=Math.round(Math.random()*3);
	var pZuege=20;
	var pNeuX,pNeuY,pAltX,pAltY;
	var pNummerAusgewaehlt;
	var pBewegt=false;
	
	
	do
	{	pBewegt=false;
		pZufallRichtung=Math.round(Math.random()*3);
		//freies Feld suchen
	  for(var i=0;i<4;i++)
	  { for(var j=0;j<4;j++)
		{
			if(hatFeldBackground[i][j].zNummerErhalten==16)
			{
				pNeuX=i;pNeuY=j;
				if(pZufallRichtung==0)  //oberer Stein nach unten
				{
					if(j>0)
					{
						pAltX=i;pAltY=j-1;
						pZuege--;
						pBewegt=true;
					}
				}
				else if(pZufallRichtung==1)   //linker Stein nach rechts
				{
					if(i>0)
					{
						pAltX=i-1;pAltY=j;
						pZuege--;
						pBewegt=true;
					}
				}
				else if(pZufallRichtung==2)   //unterer Stein nach oben
				{
					if(j<3)
					{
						pAltX=i;pAltY=j+1;
						pZuege--;
						pBewegt=true;
					}
				}
				else if(pZufallRichtung==3)   //rechter Stein nach links
				{
					if(i<3)
					{
						pAltX=i+1;pAltY=j;
						pZuege--;
						pBewegt=true;
					}
				}
			}
		}
	  }
	  
	  if(pBewegt)
	  { pNummerAusgewaehlt=hatFeldBackground[pAltX][pAltY].zNummerErhalten;
		hatFeldBackground[pNeuX][pNeuY].zNummerErhalten=hatFeldBackground[pAltX][pAltY].zNummerErhalten;
		hatFeldBackground[pAltX][pAltY].zNummerErhalten=16;
					
		for(var m=0;m<4;m++)
		{ for(var n=0;n<4;n++)
			{
				if(hatFeld[m][n].zNummer==pNummerAusgewaehlt)
				{hatFeld[m][n].zX=zX0+(pNeuX*zGroesse);
					hatFeld[m][n].zY=zY0+(pNeuY*zGroesse);}
			}				
		}
	  }
		
	}while(pZuege>=0);
	//zGameStarted=true;
}

function restart()
{
	zGameStarted=false;
	zGewonnen=false;
	zGameOver=false;
	resetSpielfeld();
}

function loop()
{
	//Feld zeu zeichnen
	zMainCtx.clearRect(0,0,800,600);
	zeichneHintergrund();
	for(var i=0;i<4;i++)
	{ for(var j=0;j<4;j++)
		{
			zMainCtx.drawImage(zFeldBild,hatFeld[i][j].zSrcX,hatFeld[i][j].zSrcY,100,100,hatFeld[i][j].zX,hatFeld[i][j].zY,zGroesse,zGroesse);
		}
	}
	
	zGewonnen=false;
	pruefeGameOver();
	if(zGewonnen&&zGameStarted)
	{
		zMainCtx.fillStyle="red";
		zMainCtx.font="50px Arial"
		zMainCtx.textBaseLine='top';
		zMainCtx.fillText("You won!",100,200);
	}

	requestaframe(loop);
}

function backToTheMaze()
{
	if(zGewonnen)
	{
		localStorage.setItem("PuzzleGewonnen","true");
	}
	//localStorage.setItem("PuzzleGewonnen","true");
	window.open('../Labyrinth.html',"_self");
}


init();