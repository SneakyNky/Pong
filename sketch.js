//variable Circle
let xCircle = 300;
let yCircle = 200;
let diameter = 18;
let radius = diameter / 2 ;

//velocity Circle
let velocityXCircle = 4;
let velocityYCircle = 4;

//variable Rect
let xRect = 5;
let yRect = 150;
let rectWidth = 10;
let rectHeight = 90;
let colide = false;

//variable Oponent
let velocityYOponent;
let xRectOponent = 585;
let yRectOponent = 150;

//variable Score
let myScore = 0;
let oponentScore = 0;

//variable Sound
let raquetada;
let ponto;
let trilha;

//variable Error
let errorChance = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600,400);
  trilha.loop();
}

function draw() {
  background(0);
  showCircle();
  movimentCircle();
  verifColidion();
  showRect(xRect, yRect);
  movimentRect();
  //verificationRect();
  colideRectBoth(xRect, yRect);
  colideRectBoth(xRectOponent, yRectOponent);
  showRect(xRectOponent , yRectOponent);
  movimentRectOponent();
  includeScore();
  scoreMark();
}

function showCircle(){
  circle(xCircle,yCircle,diameter)
}

function movimentCircle(){
  xCircle += velocityXCircle;
  yCircle += velocityYCircle;
}

function verifColidion(){
 if (xCircle + radius> width ||
 xCircle - radius< 0){
 velocityXCircle *= -1;
 }
 if(yCircle + radius> height ||
   yCircle - radius< 0 ){
   velocityYCircle *= -1;
 }
}

function showRect(x,y){
  rect(x,y, rectWidth, rectHeight)
}



function movimentRect(){
  if (keyIsDown(UP_ARROW)){
    yRect -= 10;
    }
  if (keyIsDown(DOWN_ARROW)){
    yRect += 10;
  }
}

function movimentRectOponent(){
  velocityYOponent = yCircle -yRectOponent - rectHeight / 2 - 30;
  yRectOponent += velocityYOponent + 
    errorChance
  calcErrorChance();
}

function verificationRect(){
  if (xCircle - radius < xRect + rectWidth && 
      yCircle - radius < yRect +rectHeight &&
 yCircle + radius > yRect)
 {
 velocityXCircle *= -1;
 }
}

function colideRectBoth(x, y){
  collide = collideRectCircle(x, y , rectWidth, rectHeight, xCircle, yCircle, radius);
  if (collide){
    velocityXCircle *= -1;
       raquetada.play();
    }
 }

function includeScore(){
  stroke(255)
  textAlign(CENTER)
  textSize(18);
  fill(color(255, 140, 0));
  rect(150 , 10, 40, 20);
  fill(255);
  text(myScore , 170 , 26);
  fill(color(255, 140, 0));
  rect(450, 10,40, 20);
  fill(255)
  text(oponentScore , 470, 26);
}

function scoreMark(){
  if (xCircle > 590) {
   myScore += 1;
  ponto.play();
  }
  if (xCircle < 10) {
   oponentScore += 1;
    ponto.play();
  }
}
function calcErrorChance(){
  if (oponentScore >=
    myScore){
    errorChance += 1
  if (errorChance >= 39){
    errorChance = 40
  }
  } else {
    errorChance -= 1
    if (errorChance <=35){
      errorChance = 35
    }
  }
}

