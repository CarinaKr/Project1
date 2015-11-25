var version='0.0.1';

var hatFrage=new Array(10);
var hatButton=new Array(4);

var zRichtige;
var zFragenGestellt;
var zAktuelleFrage;
var zRichtigerButton;
var zWait=0;

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
	
	//document.addEventListener("mousedown",mausGedrueckt,false);
	//document.addEventListener("mouseup",mausLosgelassen,false);
	document.addEventListener("click",mausKlick,false);
	
	for(var i=0;i<10;i++)
	{
		hatFrage[i]=new Frage();
	}
	for(var j=0;j<4;j++)
	{
		hatButton[j]=new Button(0,0);
	}

	ladeBilder();
	resetSpielfeld();
	loop();
}
function mouse(e)
{
	zMausX=e.pageX-document.getElementById('game_object').offsetLeft;
	zMausY=e.pageY-document.getElementById('game_object').offsetTop;
	
	for(var i=0;i<4;i++)
	{
		if(hatButton[i].enthaelt(zMausX,zMausY))
			{
				hatButton[i].zHover=true;
			}
		else
		{
			hatButton[i].zHover=false;
		}
	}
	
	document.getElementById('x').innerHTML=zMausX;
	document.getElementById('y').innerHTML=zMausY;	
}

function ladeBilder()
{
	zGesamtBild=new Image();
	zGesamtBild.src='bilder/gesamt.png';
}

function resetSpielfeld()
{   
	hatButton[0].zX=50;hatButton[0].zY=200;
	hatButton[1].zX=400;hatButton[1].zY=200;
	hatButton[2].zX=50;hatButton[2].zY=350;
	hatButton[3].zX=400;hatButton[3].zY=350;
	
	hatFrage[0].zFrage="Frage 0";
	hatFrage[0].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[0].zAntwortF1="Jan Joseph Liefers";
	hatFrage[0].zAntwortF2="Thomas Gottschalk";
	hatFrage[0].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[1].zFrage="Frage 1";
	hatFrage[1].zAntwortRichtig="dark and stormy";
	hatFrage[1].zAntwortF1="Sie legen ein Ei und das Baby schlüpft nach 9-10 Monaten.";
	hatFrage[1].zAntwortF2="Gebären es lebend.";
	hatFrage[1].zAntwortF3="Das Junge wächst in einem Ei im Uterus der Mutter heran.";
	
	hatFrage[2].zFrage="Frage 2";
	hatFrage[2].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[2].zAntwortF1="Jan Joseph Liefers";
	hatFrage[2].zAntwortF2="Thomas Gottschalk";
	hatFrage[2].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[3].zFrage="Frage 3";
	hatFrage[3].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[3].zAntwortF1="Jan Joseph Liefers";
	hatFrage[3].zAntwortF2="Thomas Gottschalk";
	hatFrage[3].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[4].zFrage="Frage 4";
	hatFrage[4].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[4].zAntwortF1="Jan Joseph Liefers";
	hatFrage[4].zAntwortF2="Thomas Gottschalk";
	hatFrage[4].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[5].zFrage="Frage 5";
	hatFrage[5].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[5].zAntwortF1="Jan Joseph Liefers";
	hatFrage[5].zAntwortF2="Thomas Gottschalk";
	hatFrage[5].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[6].zFrage="Frage 6";
	hatFrage[6].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[6].zAntwortF1="Jan Joseph Liefers";
	hatFrage[6].zAntwortF2="Thomas Gottschalk";
	hatFrage[6].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[7].zFrage="Frage 7";
	hatFrage[7].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[7].zAntwortF1="Jan Joseph Liefers";
	hatFrage[7].zAntwortF2="Thomas Gottschalk";
	hatFrage[7].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[8].zFrage="Frage 8";
	hatFrage[8].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[8].zAntwortF1="Jan Joseph Liefers";
	hatFrage[8].zAntwortF2="Thomas Gottschalk";
	hatFrage[8].zAntwortF3="Barbara Schöneberger";
	
	hatFrage[9].zFrage="Frage 9";
	hatFrage[9].zAntwortRichtig="Karl Lagerfeld";
	hatFrage[9].zAntwortF1="Jan Joseph Liefers";
	hatFrage[9].zAntwortF2="Thomas Gottschalk";
	hatFrage[9].zAntwortF3="Barbara Schöneberger";
	
	zRichtige=0;
	zFragenGestellt=0;
	zWait=-1;
	stelleFrage();
}

function Frage()
{
	this.zFrage;
	this.zAntwortRichtig;
	this.zAntwortF1;this.zAntwortF2;this.zAntwortF3;
	this.zGefragt=false;
}

function Button()
{
	this.zX;
	this.zY;
	this.zWidth=270;
	this.zHeight=100;
	this.zHover=false;
	this.zText="";
}
Button.prototype.enthaelt=function(pX,pY)
{
	if(pX>this.zX&&pX<this.zX+this.zWidth&&pY>this.zY&&pY<this.zY+this.zHeight)
	{
		return true;
	}
	return false;
};
Button.prototype.draw=function()
{
	if(this.zHover==false)
	{
		zMainCtx.drawImage(zGesamtBild,0,0,100,50,this.zX,this.zY,this.zWidth,this.zHeight);
	}
	else if(this.zHover)
	{
		zMainCtx.drawImage(zGesamtBild,0,50,100,50,this.zX,this.zY,this.zWidth,this.zHeight);
	}
	zMainCtx.fillStyle="grey";
	zMainCtx.font="20px Arial"
	zMainCtx.textBaseLine='top';
	zMainCtx.fillText(this.zText,this.zX+10,this.zY+this.zHeight/2);
};
Button.prototype.zeichneGruen=function()
{
	zMainCtx.drawImage(zGesamtBild,0,150,100,50,this.zX,this.zY,this.zWidth,this.zHeight);
	zMainCtx.fillStyle="grey";
	zMainCtx.font="20px Arial"
	zMainCtx.textBaseLine='top';
	zMainCtx.fillText(this.zText,this.zX+10,this.zY+this.zHeight/2);
};
Button.prototype.zeichneRot=function()
{
	zMainCtx.drawImage(zGesamtBild,0,100,100,50,this.zX,this.zY,this.zWidth,this.zHeight);
	zMainCtx.fillStyle="grey";
	zMainCtx.font="20px Arial"
	zMainCtx.textBaseLine='top';
	zMainCtx.fillText(this.zText,this.zX+10,this.zY+this.zHeight/2);
};

function stelleFrage()
{
	for(var i=0;i<4;i++)
	{
		hatButton[i].zText="";
	}
	var pFrage=Math.round(Math.random()*9);
	do
	{
		pFrage=Math.round(Math.random()*9);
		
	}while(hatFrage[pFrage].zGefragt==true);
	zAktuelleFrage=pFrage;
	hatFrage[zAktuelleFrage].zGefragt=true;
	
	zRichtigerButton=Math.round(Math.random()*3);
	hatButton[zRichtigerButton].zText=hatFrage[zAktuelleFrage].zAntwortRichtig;
	
	var f;
	do
	{f=Math.round(Math.random()*3); 
	}while (hatButton[f].zText!="");
	hatButton[f].zText=hatFrage[zAktuelleFrage].zAntwortF1;
	do
	{f=Math.round(Math.random()*3);
	}while (hatButton[f].zText!="");
	hatButton[f].zText=hatFrage[zAktuelleFrage].zAntwortF2;
	do
	{f=Math.round(Math.random()*3); 
	}while (hatButton[f].zText!="");
	hatButton[f].zText=hatFrage[zAktuelleFrage].zAntwortF3; 
	
}

function mausKlick()
{
	for(var i=0;i<4;i++)
	{
		if(hatButton[i].zHover)
		{
			if(i==zRichtigerButton)
			{
				zRichtige++;
			}
			else
			{
				hatButton[i].zeichneRot();
			}
		 hatButton[zRichtigerButton].zeichneGruen();
		 zFragenGestellt++;
		 zWait=50;
		 
		 if(zFragenGestellt==10)
		 {
			 zGameOver=true;
			 if(zRichtige>=5)
			 {zGewonnen=true;}
		 }
		}
	}
}

function restart()
{
	zRichtige=0;
	zFragenGestellt=0;
	zGewonnen=false;
	zGameOver=false;
}

function loop()
{
	
	if(zGameOver==false&&zWait<=0)
	{
		zMainCtx.clearRect(0,0,800,600);
		zMainCtx.fillStyle="black";
		zMainCtx.font="20px Arial"
		zMainCtx.textBaseLine='bottom';
		zMainCtx.fillText(hatFrage[zAktuelleFrage].zFrage,50,150);
		
		for(var i=0;i<4;i++)
		{hatButton[i].draw();}
	
		if(zWait==0)
		{
			stelleFrage();
		}
	}
	zWait--;
	zMainCtx.clearRect(0,0,500,100);
	zMainCtx.fillStyle="black";
	zMainCtx.font="15px Arial"
	zMainCtx.fillText("Richtige: "+zRichtige,50,80);
	
	if(zGameOver&&zWait<=0)
	{
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
		localStorage.setItem("QuizGewonnen","true");
	}
	localStorage.setItem("QuizGewonnen","true");
	close();
}

init();