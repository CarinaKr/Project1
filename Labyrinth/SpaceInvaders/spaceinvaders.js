var version='0.0.1';
var zSpielen=false;

var zGroesse=5;

var zXFelder=800/zGroesse; 
var zYFelder=600/zGroesse;
var hatFeld=new Array(zXFelder);
for(var i=0;i<zXFelder;i++)
{
	hatFeld[i]=new Array(zYFelder);
}

var hatGegner1=new Array(11);
var hatGegner2=new Array(22);
var hatGegner3=new Array(22);
var hatSchild=new Array(4);
var hatBullet=new Array();
var hatSpieler;
var hatSchiff;

var zZeilen;
var zXFigurRand;
var zPunkte;
var zLeben;
var zSchuss;
var zBewegeNachRechts;
var zTasteRechtsGedrueckt;
var zTasteLinksGedrueckt;
var zTasteHochGedrueckt;

var zGewonnen=false;
var zGameOver=false;
var zWait;
var zStartZeit=30;
var zBulletLenghtRundenBeginn;


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
	document.addEventListener("keyup",tasteHoch,false);
	
	for(var i=0;i<zXFelder;i++)
	{for(var j=0;j<zYFelder;j++)
		{
			hatFeld[i][j]=new Feld(i*zGroesse,j*zGroesse);
		}}
		
	for(var k=0;k<11;k++)
	{
		hatGegner1[k]=new Gegner1(k,0);
	}
	for(var l=0;l<22;l++)
	{
		hatGegner2[l]=new Gegner2(l,hatGegner1[0].zY+hatGegner1[0].zYGroesse);
		hatGegner3[l]=new Gegner3(l,hatGegner2[0].zY+hatGegner2[0].zYGroesse);
	}
	for(var m=0;m<4;m++)
	{
		hatSchild[m]=new Schild(m+10,50);
	}
	hatSpieler=new Spieler(zXFelder/2,55);
	hatSchiff=new Schiff(-200,-200);
	
	ladeBilder();
	resetSpielfeld();
	ladeSpielfeld();
	loop();
}

/*function mouse(e)
{
	zMausX=e.pageX-document.getElementById('game_object').offsetLeft;
	zMausY=e.pageY-document.getElementById('game_object').offsetTop;
	document.getElementById('x').innerHTML=zMausX;
	document.getElementById('y').innerHTML=zMausY;	
}*/

function ladeBilder()
{
	zGesamtBild=new Image();
	zGesamtBild.src='bilder/gesamt.png';
}

function ladeSpielfeld()
{   
	
}

function resetSpielfeld()
{   
	for(var k=0;k<11;k++)
	{
		hatGegner1[k].zX=1+k*(hatGegner1[0].zXGroesse+1);
		hatGegner1[k].zY=1+0;
		hatGegner1[k].zLebt=true;
		hatGegner1[k].draw();
		
			hatGegner2[k].zX=1+k*(hatGegner2[0].zXGroesse+1);
			hatGegner2[k].zY=1+(hatGegner1[0].zY+hatGegner1[0].zYGroesse);
			hatGegner2[k].draw();
			hatGegner2[k].zLebt=true;
			hatGegner2[k+11].zX=1+k*(hatGegner2[0].zXGroesse+1);
			hatGegner2[k+11].zY=1+(hatGegner2[0].zY+hatGegner2[0].zYGroesse);
			hatGegner2[k+11].draw();
			hatGegner2[k+11].zLebt=true;
			
			hatGegner3[k].zX=1+k*(hatGegner3[0].zXGroesse+1);
			hatGegner3[k].zY=1+(hatGegner2[11].zY+hatGegner2[11].zYGroesse);
			hatGegner3[k].draw();
			hatGegner3[k].zLebt=true;
			hatGegner3[k+11].zX=1+k*(hatGegner3[0].zXGroesse+1);
			hatGegner3[k+11].zY=1+(hatGegner3[0].zY+hatGegner3[0].zYGroesse);
			hatGegner3[k+11].draw();
			hatGegner3[k+11].zLebt=true;
	}
	for(var i=0;i<4;i++)
	{
		hatSchild[i].zX=Math.round(15+i*(hatSchild[0].zXGroesse*2.5));
		hatSchild[i].zY=88;
		hatSchild[i].resetSchild();
		hatSchild[i].draw();
		
	}
	hatSpieler.zX=10;
	hatSpieler.zY=101;
	hatSpieler.draw();
	
	hatSchiff.zX=-200;
	hatSchiff.zY=-200;
	hatSchiff.zLebt=false;
	
	zZeilen=0;
	zPunkte=0;
	zLeben=3;
	zBewegeNachRechts=true;
	zXFigurRand=0;
	zWait=0;
	zStartZeit=10;
	zTasteHochGedrueckt=false;
	zTasteLinksGedrueckt=false;
	zTasteRechtsGedrueckt=false;
	zBulletLenghtRundenBeginn=hatBullet.length;
	for(var i=0;i<hatBullet.length;i++)
	{
		delete hatBullet[i];
	}
}

function restart()
{
	resetSpielfeld();
	zGewonnen=false;
	zGameOver=false;
}

function tasteGedrueckt(e)
{
	var key_id=e.keyCode || e.which;
	if(key_id==38) //up key
	{zTasteHochGedrueckt=true;
	 e.preventDefault();
	}
	if(key_id==37) //left key
	{zTasteLinksGedrueckt=true;
	 e.preventDefault();
	}
	if(key_id==39) //right key
	{zTasteRechtsGedrueckt=true;
	 e.preventDefault();
	}
}
function tasteHoch(e)
{
	var key_id=e.keyCode || e.which;
	if(key_id==38) //up key
	{zTasteHochGedrueckt=false;
	 zSchuss=false;
	 e.preventDefault();
	}
	if(key_id==37) //left key
	{zTasteLinksGedrueckt=false;
	 e.preventDefault();
	}
	if(key_id==39) //right key
	{zTasteRechtsGedrueckt=false;
	 e.preventDefault();
	}
}

function Feld(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zBesetzt=false;
}

function Gegner1(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=11;
	this.zXEchteGroesse=6;
	this.zYGroesse=8;
	this.zLebt;
}
Gegner1.prototype.draw=function()
{
	if(this.zLebt)
	{
		zMainCtx.drawImage(zGesamtBild,260,0,80,80,this.zX*zGroesse+(zGroesse*2),this.zY*zGroesse,zGroesse*this.zXEchteGroesse,zGroesse*this.zYGroesse);
		if(Math.round(Math.random()*1000)==50)
		{
			hatBullet[hatBullet.length]=new Bullet(this.zX+(this.zXGroesse/2),this.zY);
			hatBullet[hatBullet.length-1].zGut=false;
		}
	}
};

function Gegner2(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=11;
	this.zYGroesse=8;
	this.zLebt;
}
Gegner2.prototype.draw=function()
{
	if(this.zLebt)
	{
		zMainCtx.drawImage(zGesamtBild,10,0,110,80,this.zX*zGroesse,this.zY*zGroesse,zGroesse*this.zXGroesse,zGroesse*this.zYGroesse);
		if(Math.round(Math.random()*1000)==50)
		{
			hatBullet[hatBullet.length]=new Bullet(this.zX+(this.zXGroesse/2),this.zY);
			hatBullet[hatBullet.length-1].zGut=false;
		}
	}
};

function Gegner3(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=11;
	this.zYGroesse=8;
	this.zLebt;
}
Gegner3.prototype.draw=function()
{
	if(this.zLebt)
	{
		zMainCtx.drawImage(zGesamtBild,130,0,110,80,this.zX*zGroesse,this.zY*zGroesse,zGroesse*this.zXGroesse,zGroesse*this.zYGroesse);
		if(Math.round(Math.random()*1000)==50)
		{
			hatBullet[hatBullet.length]=new Bullet(this.zX+(this.zXGroesse/2),this.zY);
			hatBullet[hatBullet.length-1].zGut=false;
		}
	}
};

function Schiff(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=16;
	this.zYGroesse=7;
	this.zLebt=false;
}
Schiff.prototype.draw=function()
{
	if(this.zLebt)
	{zMainCtx.drawImage(zGesamtBild,350,0,160,70,this.zX*zGroesse,this.zY*zGroesse,zGroesse*this.zXGroesse,zGroesse*this.zYGroesse);}
};

function Spieler(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=15;
	this.zYGroesse=8;
}
Spieler.prototype.draw=function()
{
	zMainCtx.drawImage(zGesamtBild,0,80,150,80,this.zX*zGroesse,this.zY*zGroesse,zGroesse*this.zXGroesse,zGroesse*this.zYGroesse);
};

function Schild(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=15;
	this.zYGroesse=11;
}
Schild.prototype.resetSchild=function()
{
	for(var i=0;i<9;i++)
	{ for(var j=0;j<5;j++)
		{
			hatFeld[this.zX+3+i][this.zY+j].zBesetzt=true;
		}
	}
	for(var k=0;k<4;k++)
	{
		hatFeld[this.zX+2][this.zY+1+k].zBesetzt=true;
		hatFeld[this.zX+12][this.zY+1+k].zBesetzt=true;
	}
	for(var l=0;l<3;l++)
	{
		hatFeld[this.zX+1][this.zY+2+l].zBesetzt=true;
		hatFeld[this.zX+13][this.zY+2+l].zBesetzt=true;
	}
	for(var m=0;m<2;m++)
	{
		hatFeld[this.zX][this.zY+3+m].zBesetzt=true;
		hatFeld[this.zX+14][this.zY+3+m].zBesetzt=true;
	}
	for(var n=0;n<6;n++)
	{
		hatFeld[this.zX+n][this.zY+5].zBesetzt=true;
		hatFeld[this.zX+9+n][this.zY+5].zBesetzt=true;
	}
	for(var b=0;b<5;b++)
	{
		hatFeld[this.zX+b][this.zY+6].zBesetzt=true;
		hatFeld[this.zX+10+b][this.zY+6].zBesetzt=true;
	}
	for(var w=0;w<4;w++)
	{ for(var q=0;q<4;q++)
		{
			hatFeld[this.zX+w][this.zY+7+q].zBesetzt=true;
			hatFeld[this.zX+11+w][this.zY+7+q].zBesetzt=true;
		}
	}
};
Schild.prototype.draw=function()
{
	for(var i=0;i<zXFelder;i++)
	{
		for(var j=0;j<zYFelder;j++)
		{
			if(hatFeld[i][j].zBesetzt)
			{
				zMainCtx.beginPath();
				zMainCtx.fillStyle="#00ff00";
				zMainCtx.rect(hatFeld[i][j].zX,hatFeld[i][j].zY,zGroesse,zGroesse);
				zMainCtx.fill();
				zMainCtx.closePath();
			}
		}
	}
};

function Bullet(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zXGroesse=1;
	this.zYGroesse=3;
	this.zLebt=true;
	this.zGut;
}
Bullet.prototype.draw=function()
{
	if(this.zLebt)
	{
		if(this.zGut)
		{this.zY--;}
		else if(this.zGut==false)
		{this.zY++;}
		zMainCtx.drawImage(zGesamtBild,350,90,10,30,this.zX*zGroesse,this.zY*zGroesse,zGroesse*this.zXGroesse,zGroesse*this.zYGroesse);
	}
};

function findeRandFigur()
{
	if(zBewegeNachRechts)
	{ 
		zXFigurRand=0;
		for(var k=0;k<11;k++)
		{	
			if(hatGegner1[k].zLebt&&hatGegner1[k].zX>zXFigurRand)
			{zXFigurRand=hatGegner1[k].zX;}
			if(hatGegner2[k].zLebt&&hatGegner2[k].zX>zXFigurRand)
			{hatGegner2[k].zX;}
			if(hatGegner2[k+11].zLebt&&hatGegner2[k+11].zX>zXFigurRand)
			{hatGegner2[k+11].zX;}
			if(hatGegner3[k].zLebt&&hatGegner3[k].zX>zXFigurRand)
			{hatGegner3[k].zX;}
			if(hatGegner3[k+11].zLebt&&hatGegner3[k+11].zX>zXFigurRand)
			{hatGegner3[k+11].zX;}
		}
	}
	else if(zBewegeNachRechts==false)
	{
		zXFigurRand=zXFelder;
		for(var k=0;k<11;k++)
		{	
			if(hatGegner1[k].zLebt&&hatGegner1[k].zX<zXFigurRand)
			{zXFigurRand=hatGegner1[k].zX;}
			if(hatGegner2[k].zLebt&&hatGegner2[k].zX<zXFigurRand)
			{hatGegner2[k].zX;}
			if(hatGegner2[k+11].zLebt&&hatGegner2[k+11].zX<zXFigurRand)
			{hatGegner2[k+11].zX;}
			if(hatGegner3[k].zLebt&&hatGegner3[k].zX<zXFigurRand)
			{hatGegner3[k].zX;}
			if(hatGegner3[k+11].zLebt&&hatGegner3[k+11].zX<zXFigurRand)
			{hatGegner3[k+11].zX;}
		}
	}
}

function enthaehlt(pX,pY,pXBild,pYBild,pBreite,pHoehe)
{
	if(pX>pXBild&&pX<pXBild+pBreite&&pY>pYBild&&pY<pYBild+pHoehe)
	{
		return true;
	}
	return false;
}

function pruefeGetroffen()
{
	for(var n=zBulletLenghtRundenBeginn;n<hatBullet.length;n++)
	{	
		//Gegner getroffen
		for(var k=0;k<11;k++)
		{
			if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatGegner1[k].zX,hatGegner1[k].zY,hatGegner1[k].zXEchteGroesse,hatGegner1[k].zYGroesse)
							&&hatBullet[n].zLebt&&hatBullet[n].zGut)
			{
				hatGegner1[k].zX=-200;
				hatGegner1[k].zY=-200;
				hatGegner1[k].zLebt=false;
				hatBullet[n].zLebt=false;
				zPunkte+=30;
				zStartZeit--;
			}
			
			else if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatGegner2[k].zX,hatGegner2[k].zY,hatGegner2[k].zXGroesse,hatGegner2[k].zYGroesse)
							&&hatBullet[n].zLebt&&hatBullet[n].zGut)
			{
				hatGegner2[k].zX=-200;
				hatGegner2[k].zY=-200;
				hatGegner2[k].zLebt=false;
				hatBullet[n].zLebt=false;
				zPunkte+=20;
			}
			else if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatGegner2[k+11].zX,hatGegner2[k+11].zY,hatGegner2[k+11].zXGroesse,hatGegner2[k+11].zYGroesse)
							&&hatBullet[n].zLebt&&hatBullet[n].zGut)
			{
				hatGegner2[k+11].zX=-200;
				hatGegner2[k+11].zY=-200;
				hatGegner2[k+11].zLebt=false;
				hatBullet[n].zLebt=false;
				zPunkte+=20;
			}
			
			else if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatGegner3[k].zX,hatGegner3[k].zY,hatGegner3[k].zXGroesse,hatGegner3[k].zYGroesse)
							&&hatBullet[n].zLebt&&hatBullet[n].zGut)
			{
				hatGegner3[k].zX=-200;
				hatGegner3[k].zY=-200;
				hatGegner3[k].zLebt=false;
				hatBullet[n].zLebt=false;
				zPunkte+=10;
			}
			else if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatGegner3[k+11].zX,hatGegner3[k+11].zY,hatGegner3[k+11].zXGroesse,hatGegner3[k+11].zYGroesse)
							&&hatBullet[n].zLebt&&hatBullet[n].zGut)
			{
				hatGegner3[k+11].zX=-200;
				hatGegner3[k+11].zY=-200;
				hatGegner3[k+11].zLebt=false;
				hatBullet[n].zLebt=false;
				zPunkte+=10;
			}
		}
		//prüfe Schilder getroffen
		for(var i=hatSchild[0].zX;i<hatSchild[3].zX+hatSchild[3].zXGroesse;i++)
		{ for(var j=hatSchild[0].zY;j<hatSchild[3].zY+hatSchild[3].zYGroesse;j++)
			{
				if(Math.round(hatBullet[n].zX)==i&&Math.round(hatBullet[n].zY)==j
					&&hatFeld[i][j].zBesetzt&&hatBullet[n].zLebt)
				{
					hatFeld[i][j].zBesetzt=false;
					hatBullet[n].zLebt=false;
				}
			}	
		}
		
		//Schiff getroffen
		if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatSchiff.zX,hatSchiff.zY,hatSchiff.zXGroesse,hatSchiff.zYGroesse)
			&&hatBullet[n].zLebt)
		{
			hatBullet[n].zLebt=false;
			hatSchiff.zLebt=false;
			hatSchiff.zX=-200;
			hatSchiff.zY=-200;
			zPunkte+=Math.round(Math.random()*50);
		}
		
		//Bullet auserhalb des Bildes
		if(hatBullet[n].zY<-3||hatBullet[n].zY>605)
		{hatBullet[n].zLebt=false;}
	
		//Spieler getroffen
		if(enthaehlt(hatBullet[n].zX,hatBullet[n].zY,hatSpieler.zX,hatSpieler.zY,hatSpieler.zXGroesse,hatSpieler.zYGroesse)
			&&hatBullet[n].zLebt)
		{
			hatBullet[n].zLebt=false;
			zLeben--;
		}
	}
}

function pruefeGameOver()
{
	zGewonnen=true;
	for(var k=0;k<11;k++)
	{
		if(hatGegner1[k].zY+hatGegner1[k].zYGroesse>hatSchild[0].zY
			||hatGegner2[k].zY+hatGegner2[k].zYGroesse>hatSchild[0].zY
			||hatGegner2[k+11].zY+hatGegner2[k+11].zYGroesse>hatSchild[0].zY
			||hatGegner3[k].zY+hatGegner3[k].zYGroesse>hatSchild[0].zY
			||hatGegner3[k+11].zY+hatGegner3[k+11].zYGroesse>hatSchild[0].zY)
		{
			zGameOver=true;
		}
		
		var pZaehler=0;
		if(hatGegner1[k].zLebt||hatGegner2[k].zLebt||hatGegner2[k+11].zLebt
			||hatGegner3[k].zLebt||hatGegner3[k+11].zLebt)
		{
			zGewonnen=false;
		}
	}
	if(zLeben==0)
	{
		zGameOver=true;
		zGewonnen=false;
	}
}

function loop()
{
	if(zGameOver==false)
	{
		//Bild neu Zeichnen
		zMainCtx.clearRect(0,0,800,600);
		findeRandFigur();
		if(zBewegeNachRechts&&zXFigurRand>=(zXFelder-hatGegner1[0].zXGroesse)-1&&zWait<=0)	//prüfe ob am rechten Rand
		{
			zBewegeNachRechts=false;
			for(var k=0;k<11;k++)
			{	
				hatGegner1[k].zY++;
				hatGegner2[k].zY++;
				hatGegner2[k+11].zY++;
				hatGegner3[k].zY++;
				hatGegner3[k+11].zY++;
			}
			zWait=zStartZeit;
			zZeilen++;
		}
		else if(zBewegeNachRechts==false&&zXFigurRand<=1&&zWait<=0) //prüfe ob am linken Rand
		{
			zBewegeNachRechts=true;
			for(var k=0;k<11;k++)
			{
				hatGegner1[k].zY++;
				hatGegner2[k].zY++;
				hatGegner2[k+11].zY++;
				hatGegner3[k].zY++;
				hatGegner3[k+11].zY++;
			}
			zWait=zStartZeit;
			zZeilen++;
		}
		for(var k=0;k<11;k++)
		{	
			if(zBewegeNachRechts&&zWait<=0)
			{
				hatGegner1[k].zX++;
				hatGegner2[k].zX++;
				hatGegner2[k+11].zX++;
				hatGegner3[k].zX++;
				hatGegner3[k+11].zX++;
			}
			else if(zBewegeNachRechts==false&&zWait<=0)
			{
				hatGegner1[k].zX--;
				hatGegner2[k].zX--;
				hatGegner2[k+11].zX--;
				hatGegner3[k].zX--;
				hatGegner3[k+11].zX--;
			}
			hatGegner1[k].draw();
			hatGegner2[k].draw();
			hatGegner2[k+11].draw();
			hatGegner3[k].draw();
			hatGegner3[k+11].draw();
		}
		
		//schiff
		if(hatSchiff.zLebt==false)
		{
			var pZufall=Math.round(Math.random()*500);
			if(pZufall==50&&zZeilen>hatSchiff.zYGroesse+2&&hatSchiff.zLebt==false)
			{
				hatSchiff.zX=-hatSchiff.zXGroesse;
				hatSchiff.zY=1;
				hatSchiff.zLebt=true;
			}
		}
		else if(hatSchiff.zLebt&&zWait<=0)
		{
			hatSchiff.zX+=2;
			if(hatSchiff.zX>zXFelder)
			{
				hatSchiff.zLebt=false;
				hatSchiff.zX=-200;
				hatSchiff.zY=-200;
			}
		}
		hatSchiff.draw();
		
		for(var i=0;i<4;i++)
		{
			hatSchild[i].draw();	
		}
		hatSpieler.draw();
		
		//zeichne Bullets
		for(var m=zBulletLenghtRundenBeginn;m<hatBullet.length;m++)
		{
			hatBullet[m].draw();
		}
		pruefeGetroffen();
		pruefeGameOver();
		
		if(zTasteLinksGedrueckt&&hatSpieler.zX>1)
		{
			hatSpieler.zX--;
		}
		else if(zTasteRechtsGedrueckt&&hatSpieler.zX<(zXFelder-hatSpieler.zXGroesse)-1)
		{
			hatSpieler.zX++;
		}
		if(zTasteHochGedrueckt&&zSchuss==false)
		{
			hatBullet[hatBullet.length]=new Bullet(hatSpieler.zX+(hatSpieler.zXGroesse/2),hatSpieler.zY);
			hatBullet[hatBullet.length-1].zGut=true;
			zSchuss=true;
		}
	}
	zWait--;
	if(zWait<0)
	{zWait=zStartZeit;}

	zMainCtx.fillStyle="white";
	zMainCtx.font="20px Arial"
	zMainCtx.textBaseLine='buttom';
	zMainCtx.fillText("Punkte: "+zPunkte,650,590);
	for(var u=0;u<zLeben;u++)
	{
		zMainCtx.drawImage(zGesamtBild,0,80,150,80,10+(u*((hatSpieler.zXGroesse*zGroesse/2)+10)),570,zGroesse*(hatSpieler.zXGroesse/2),zGroesse*(hatSpieler.zYGroesse/2));

	}
	
	if(zGameOver||zGewonnen)
	{	zGameOver=true;
		zMainCtx.fillStyle="red";
		zMainCtx.font="50px Arial"
		zMainCtx.textBaseLine='top';
		if(zGewonnen)
		{zMainCtx.fillText("You won!",100,200);}
		else
		{zMainCtx.fillText("You lost!",100,200);}
	}
	
	requestaframe(loop);
}

function backToTheMaze()
{
	if(zGewonnen)
	{
		localStorage.setItem("SpaceInvadersGewonnen","true");
	}
	//localStorage.setItem("SpaceInvadersGewonnen","true");
	close();
}

init();