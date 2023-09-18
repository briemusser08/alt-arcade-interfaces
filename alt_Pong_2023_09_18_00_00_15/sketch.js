

//Splash
//buttons
var twoPlayer
var vsBot

//PONG
//ball
var ballX; //x position
var ballY; //y position
var ballWidth = 15; 
var ballHeight = 15;
var ballSpeed = 2; 
var ballDirectionX = -1;// (1 right, -1 left)
var ballDirectionY = 1;// (1 down, -1 up)

//paddles
//player 1
var p1X = 10; // 10 away from left side
var p1Y = 250; // half of height
//player 2 IS CPU
var p2X = 890; //10 from right
var p2Y = 250; //half of height
var cpuSpeed =1.5; //change difficulty levels
//sizes
var playerWidth = 20;
var playerHeight = 100;
//speed
var pSpeed =5; //adjust speed of paddle

//scoreboard
var p1Score = 0;
var p2Score = 0;

//Functions
var stage = 0; //0 = splash, 1 = pong, 2 = player 1 wins, 3= player 2 wins, etc.



function setup() {
  createCanvas(900, 500);
  
  //setting the ball into initial position
  rectMode(CENTER);//the ball is a rectangle
  //finding half of canvas width and height and placing ball there
  ballX = width/2 
  ballY= height/2
  
  textAlign(CENTER);
  
}//close setup

function draw(){
// controls what stage /menu to pull up
  if (stage == 0){
    splash();
  }
  
  if (stage == 1){
    pong();
  }
  
  if (stage == 2){
    p1Wins();
  }
  
  if (stage == 3){
    p2Wins();
  }
  
  if(mouseIsPressed == true){
    stage=1;
  }
}//close draw

function splash(){
  background(0);
  fill(255);
  
  textSize(150);
  text ('CAT PONG', width/2, 200); //(text,x,y)
  
   textSize(30);
  text ('Programmed by Brie Musser', width/2, 250); // (text,x,y)
  textSize(30);
  text ('Click to start', width/2, 450); //start button (text,x,y)
}//close splash

function p1Wins(){
  background(0);
  fill(255);
  
  textSize(80);
  text ('PLAYER 1 WINS', width/2, 200); //(text,x,y)
  
   textSize(30);
  text ('Refresh to try again', width/2, 250); // (text,x,y)
}//close p1Wins

function p2Wins(){
  background(0);
  fill(255);
  
  textSize(80);
  text ('PLAYER 2 WINS', width/2, 200); //(text,x,y)
  
   textSize(30);
  text ('Refresh to try again', width/2, 250); // (text,x,y)
}//close p2Wins

function pong() {
  // call functions
  keyTyped(); // loop keytyped function (allow holding button)
  /* keyPressed(); // loop keypressed function (allow holding button) */
  cpu();// call CPU
  
  //draws
  background (0); //black  
  noFill();
  stroke(225,225,225);// white
  rect (width/2, height/2, width, height);//outer border
  line(450, 0, 450, height);//center line
  
  //set colors 
  fill(255); //white
  noStroke();// no border
  
  //draw ball
  rect(ballX, ballY, ballWidth, ballHeight);
  
  //draw paddles
  rect(p1X, p1Y, playerWidth, playerHeight);//draws player 1 paddle
  rect(p2X, p2Y, playerWidth, playerHeight);//draws player 1 paddle
  
  //physics
  ballX = ballX + (ballDirectionX*ballSpeed); //moves ball horzontally
  ballY = ballY +(ballDirectionY*ballSpeed);
  
  //collisions
    //walls
    //bottom
    if (ballY >= height){ // we have hit bottom wall
      ballDirectionY = ballDirectionY * -1; // change direction of ball
    }
      //top
    if (ballY <= 0){ // we have hit top wall
      ballDirectionY = ballDirectionY * -1; // change direction of ball
    }
  
  //paddles
    //left
      if (ballX >= p1X-10 && ballX <= p1X+10 && ballY >= p1Y-50 && ballY<= p1Y+50){ //has hit player1
        ballDirectionX = ballDirectionX*-1; //change  direction
      }
    //right
      if (ballX >= p2X-10 && ballX <= p2X+10 && ballY >= p2Y-50 && ballY<= p2Y+50){ //has hit player2
           ballDirectionX = ballDirectionX*-1; //change  direction
      }
  

//scoreboard
  textSize(15);
  text(p1Score, 400, 25); // text of score (text, x,y)
  text(p2Score, 500, 25); // text of score (text, x,y)
  //p2 
  if(ballX <= 0){ //p1 missed
    p2Score = p2Score+1; //add point
    //ball goes center
    ballX = width/2;
    ballY = height/2;
  }
  //p1
   if(ballX >= width){ //p1 missed
    p1Score = p1Score+1; //add point
    //ball goes center
    ballX = width/2;
    ballY = height/2;
  }
  
   if (p1Score >= 10){
    stage =2;
  }
  
  if (p2Score >= 10){
    stage =3;
  }

}//close pong


function keyTyped(){ // only works for letters and numbers
  if(key == 'w' && keyIsPressed){
    p1Y=p1Y-pSpeed; // makes it move up at speed 
  }//close w button
  
  if(key == 's' && keyIsPressed){
    p1Y=p1Y+pSpeed; // makes it move down at speed 
  }//close s button
}

function cpu(){
  //controls CPU player
  if (ballX > width/2){//ball cross center line
    if (p2Y <= ballY){
    p2Y = p2Y + cpuSpeed;  //moves down
    }
    if (p2Y >= ballY){
    p2Y = p2Y - cpuSpeed;  //moves up
    }
  }
  else{
    p2Y = p2Y; //only move when ball is on CPU side
  }
}//close cpu

/* function keyPressed(){
if (keyCode== UP_ARROW && keyIsPressed)
  p2Y=p2Y-pSpeed; // makes it move up at speed
  if (keyCode== DOWN_ARROW && keyIsPressed)
  p2Y=p2Y+pSpeed; // makes it move up at speed 
 } */
