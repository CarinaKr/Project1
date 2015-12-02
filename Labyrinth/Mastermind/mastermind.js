var version='0.0.1';
var zSpielen=false;
var hatFeld=new Array(4);
for(var i=0;i<4;i++)
{
	hatFeld[i]=new Array(10);
}
var zLoesung=new Array(4);
var zGroesse=50;
var zFarbeAusgewaehlt=false;
var zMausX;
var zMausY;
var zReihe=0;
var hatErgenisse=new Array(10);
var zGewonnen=false;
var zGameOver=false;

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
	
	hatKugel=new Array(8);
	for(var i=0;i<8;i++)
	{hatKugel[i]=new Kugel(0,0,i);}
	for(var m=0;m<4;m++)
	{for(var n=0;n<10;n++)
		{hatFeld[m][n]=new Feld(100+m*zGroesse,40+n*zGroesse);}}
	for(k=0;k<10;k++)
	{hatErgenisse[k]=new Ergebnisse(k,0,0);}

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
	zMainBild=new Image();
	zFeldBild.src='bilder/rechteck.png';
	zMainBild.src='bilder/kreise.png';
}

function resetSpielfeld()
{   
	zeichneHintergrund();
	
	for(var i=0;i<8;i++) //farbige Kugeln zurücksetzen
	{   
		hatKugel[i].zX=50+i*(zGroesse+10);
		hatKugel[i].zY=550;
		hatKugel[i].draw();
	}
	
	erstelleLoesung();
	zeigeLoesung();
}

function erstelleLoesung()
{
	for(var i=0;i<4;i++)
	{zLoesung[i]=0;}
		var f=Math.round(Math.random()*7);
		zLoesung[0]=f;
		do{f=Math.round(Math.random()*7);zLoesung[1]=f; }while (f==zLoesung[0]);
		do{f=Math.round(Math.random()*7); zLoesung[2]=f; }while (f==zLoesung[0]||f==zLoesung[1]);
		do{f=Math.round(Math.random()*7); zLoesung[3]=f; }while (f==zLoesung[0]||f==zLoesung[1]||f==zLoesung[2]);
}
function zeigeLoesung()
{
	for(var i=0;i<4;i++)
	{
		if(zLoesung[i]==0){zMainCtx.drawImage(zMainBild,0,0,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==1){zMainCtx.drawImage(zMainBild,50,0,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==2){zMainCtx.drawImage(zMainBild,100,0,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==3){zMainCtx.drawImage(zMainBild,150,0,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==4){zMainCtx.drawImage(zMainBild,0,50,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==5){zMainCtx.drawImage(zMainBild,50,50,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==6){zMainCtx.drawImage(zMainBild,0,100,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
		else if(zLoesung[i]==7){zMainCtx.drawImage(zMainBild,50,100,50,50,400+i*(zGroesse+10),250,(zGroesse-5),(zGroesse-5));}
	}
	zMainCtx.fillStyle="black";
	zMainCtx.font="30px Arial"
	zMainCtx.textBaseLine='bottom';
	zMainCtx.fillText("Loesung:",400,250);
}

function zeichneHintergrund()
{
	for(var i=0;i<4;i++)
	{for(var j=0;j<10;j++)
		{zHintergrundCtx.drawImage(zFeldBild,0,0,100,100,100+i*zGroesse,40+j*zGroesse,zGroesse,zGroesse);}
	}
}

function Kugel(pX, pY, pFarbe)
{
	this.zX=pX;
	this.zY=pY;
	this.zFarbe=pFarbe;
	this.zEnthaehlt=false;
	this.zAusgewaehlt=false;
	
}
Kugel.prototype.draw=function()
{   
	if(this.zFarbe==0){zMainCtx.drawImage(zMainBild,0,0,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //blau
	else if(this.zFarbe==1){zMainCtx.drawImage(zMainBild,50,0,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //rot
	else if(this.zFarbe==2){zMainCtx.drawImage(zMainBild,100,0,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //gelb
	else if(this.zFarbe==3){zMainCtx.drawImage(zMainBild,150,0,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //gruen
	else if(this.zFarbe==4){zMainCtx.drawImage(zMainBild,0,50,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //d-gruen
	else if(this.zFarbe==5){zMainCtx.drawImage(zMainBild,50,50,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //d-rot
	else if(this.zFarbe==6){zMainCtx.drawImage(zMainBild,0,100,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //lila
	else if(this.zFarbe==7){zMainCtx.drawImage(zMainBild,50,100,50,50,this.zX,this.zY,(zGroesse-5),(zGroesse-5));} //orange
};
Kugel.prototype.enthaehlt=function(pX,pY)
{
	if(pX>this.zX&&pX<this.zX+(zGroesse-5)&&pY>this.zY&&pY<this.zY+(zGroesse-5))
	{this.zEnthaehlt=true;}
	else
	{this.zEnthaehlt=false;}
};

function Feld(pX,pY)
{
	this.zX=pX;
	this.zY=pY;
	this.zBesetzt=false;
	this.zEnthaehlt=false;
	this.zFarbe;
}
Feld.prototype.enthaehlt=function(pX,pY)
{
	if(pX>this.zX&&pX<this.zX+(zGroesse)&&pY>this.zY&&pY<this.zY+(zGroesse))
	{this.zEnthaehlt=true;}
	else
	{this.zEnthaehlt=false;}
}

function Ergebnisse(pReihe, pWeisse,pScharze)
{
	this.Reihe=pReihe;
	this.zWeisse=pWeisse;
	this.zSchwarze=pScharze;
}
Ergebnisse.prototype.draw=function()
{
	for(var k=0;k<this.zWeisse;k++)
	{zeichneKugel(350+((k*zGroesse)+10),40+(9-this.Reihe)*zGroesse,8);}
	for(var p=0;p<this.zSchwarze;p++)
	{zeichneKugel(350+((zGroesse+10)*this.zWeisse)+((p*zGroesse)+10),40+(9-this.Reihe)*zGroesse,9);}
};

function mausGedrueckt()
{if(zGameOver==false)
  { for(var i=0;i<8;i++)
	{
		hatKugel[i].enthaehlt(zMausX,zMausY);
		if(hatKugel[i].zEnthaehlt&&zFarbeAusgewaehlt==false)
		{
			hatKugel[i].zAusgewaehlt=true;
			zFarbeAusgewaehlt=true;
		}
	}
  }
}
function mausLosgelassen()
{	
	for(var m=0;m<8;m++)
	{
		hatKugel[m].zEnthaehlt=false;
		hatKugel[m].zAusgewaehlt=false;
	}
	zFarbeAusgewaehlt=false;
}

function reiheAuswerten()
{if(zGameOver==false)
  {	var zKugelnSchwarz=0;
	var zKugelnWeiss=0;
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<8;j++)
		{
			if(hatFeld[i][9-zReihe].enthaehlt(hatKugel[j].zX+(zGroesse/2), hatKugel[j].zY+(zGroesse/2)))
             {hatFeld[i][9-zReihe].zEnthaehlt=true;}
			if(hatFeld[i][9-zReihe].zEnthaehlt)
			{
				if(j==zLoesung[0]){zKugelnSchwarz++;}if(j==zLoesung[1]){zKugelnSchwarz++;}
				if(j==zLoesung[2]){zKugelnSchwarz++;}if(j==zLoesung[3]){zKugelnSchwarz++;}
				if(j==zLoesung[i]){zKugelnWeiss++;zKugelnSchwarz--;}
				//zeichneKugel(hatFeld[i][9-zReihe].zX+2,hatFeld[i][9-zReihe].zY+2,j);
				hatFeld[i][9-zReihe].zBesetzt=true;
				hatFeld[i][9-zReihe].zFarbe=j;
			}
		}
	}
	hatErgenisse[zReihe].zWeisse=zKugelnWeiss;
	hatErgenisse[zReihe].zSchwarze=zKugelnSchwarz;
	
	for(var l=0;l<8;l++) //farbige Kugeln zurücksetzen
	{   
		hatKugel[l].zX=50+l*(zGroesse+10);
		hatKugel[l].zY=550;
		hatKugel[l].draw();
	}
	
	if(zKugelnWeiss==4)
	{
		zGameOver=true;
		zGewonnen=true;
		zMainCtx.fillStyle="red";
		zMainCtx.font="50px Arial"
		zMainCtx.textBaseLine='top';
		zMainCtx.fillText("You won!",100,200);
		zeigeLoesung();
		
	}
	if(zReihe<9)
	{zReihe++;}
	else if(zReihe==9)
	{
		zGameOver=true;
		zMainCtx.fillStyle="red";
		zMainCtx.font="50px Arial"
		zMainCtx.textBaseLine='top';
		zMainCtx.fillText("You lost!",100,200);
		zeigeLoesung();
	}
  }
}

function zeichneKugel(pX,pY,pFarbe)
{
	if(pFarbe==0){zMainCtx.drawImage(zMainBild,0,0,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //blau
	else if(pFarbe==1){zMainCtx.drawImage(zMainBild,50,0,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //rot
	else if(pFarbe==2){zMainCtx.drawImage(zMainBild,100,0,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //gelb
	else if(pFarbe==3){zMainCtx.drawImage(zMainBild,150,0,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //gruen
	else if(pFarbe==4){zMainCtx.drawImage(zMainBild,0,50,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //d-gruen
	else if(pFarbe==5){zMainCtx.drawImage(zMainBild,50,50,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //d-rot
	else if(pFarbe==6){zMainCtx.drawImage(zMainBild,0,100,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //lila
	else if(pFarbe==7){zMainCtx.drawImage(zMainBild,50,100,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //orange
	else if(pFarbe==8){zMainCtx.drawImage(zMainBild,150,100,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //weiss
	else if(pFarbe==9){zMainCtx.drawImage(zMainBild,150,50,50,50,pX,pY,(zGroesse-5),(zGroesse-5));} //schwarz
}

function restart()
{
	resetSpielfeld();
	zReihe=0;
	zGewonnen=false;
	zGameOver=false;
	zFarbeAusgewaehlt=false;
	
	for(var j=0;j<10;j++)
	{for(var i=0;i<4;i++)
		{
			hatFeld[i][j].zBesetzt=false;
			hatFeld[i][j].zAusgewaehlt=false;
		}
	  hatErgenisse[j].zWeisse=0;
	  hatErgenisse[j].zSchwarze=0;
	}
}

function loop()
{
	if(zFarbeAusgewaehlt)
	{
		for(var i=0;i<8;i++)
		{
			if(hatKugel[i].zAusgewaehlt)
			{
				hatKugel[i].zX=zMausX-(((zGroesse)-5)/2);
				hatKugel[i].zY=zMausY-(((zGroesse)-5)/2);
			}
		}
	}
	
	//zeichne ganzes Spielfeld
	zeichneHintergrund();
	zMainCtx.clearRect(0,0,800,600);
	for(var j=0;j<8;j++)
	{
		if(hatKugel[j]!=null)
		{hatKugel[j].draw();}
	}
	for(var m=0;m<4;m++)
	{for(var n=0;n<10;n++)
		{
			if(hatFeld[m][n].zBesetzt)
			{
				zeichneKugel(hatFeld[m][n].zX+2,hatFeld[m][n].zY+2,hatFeld[m][n].zFarbe);
			}
	}	}
	for(k=0;k<zReihe;k++)
	{hatErgenisse[k].draw();}
	
	if(zGameOver)
	{
		zeigeLoesung();
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
		localStorage.setItem("MmindGewonnen","true");
	}
	//localStorage.setItem("MmindGewonnen","true");
	close();
}

init();