//bow, balloon groups, background, arrow, arrow group and respective image variables declared here
var bow, arrow, backdrop;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage, bad_balloon, badBalloonImage;
var red_balloonGroup, pink_balloonGroup, green_balloonGroup, blue_balloonGroup, bad_balloonGroup, arrowGroup;
var arrowSound, popSound;
var music;

//score variable
var score = 0;


function preload() {

  //background image, arrow image, balloon images loaded here
  backgroundImage = loadImage("background0.png");

  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  badBalloonImage = loadImage("villainBalloon.png");
  arrowSound = loadSound("Arrow+Swoosh+1.mp3");
  popSound = loadSound("Balloon-pop.mp3");
  music = loadSound("melodyloops-spring-flower.mp3");

  //balloon and arrow groups created here
  blue_balloonGroup = new Group();
  red_balloonGroup = new Group();
  pink_balloonGroup = new Group();
  green_balloonGroup = new Group();
  bad_balloonGroup = new Group();
  arrowGroup = new Group();

}

function setup() {
  createCanvas(400, 400);
  
  music.play();
  
  //creating background
  backdrop = createSprite(0, 0, 600, 600);
  backdrop.addImage(backgroundImage);
  backdrop.scale = 2;

  // creating bow to shoot arrow
  bow = createSprite(380, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;
}

function draw() {
  background("white");
    
  drawSprites();

  // moving ground
  backdrop.velocityX = -3;

  //infinity touch
  if (backdrop.x < 0) {
    backdrop.x = backdrop.width / 2;
  }

  //moving bow
  bow.y = World.mouseY

  // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    arrowSound.play();
  }

  //random number generator for releasing random types of balloons
  var select_balloon = Math.round(random(1, 5));

  //switch statement for generating random types of balloons
  if (World.frameCount % 80 == 0) {
    switch (select_balloon) {
      case 1:
        redBalloon();
        break;
      case 2:
        greenBalloon();
        break;
      case 3:
        blueBalloon();
        break;
      case 4:
        pinkBalloon();
        break;
      case 5:
        badBalloonCreator();
        break;
      default:
        break;
    }
  }

  //destroying the red balloon when arrow touches it
  if (arrowGroup.isTouching(red_balloonGroup)) {
    arrowGroup.destroyEach();
    red_balloonGroup.destroyEach();
    score += 1;
    fill("green");
    textSize(20);
    text("+1", 200, 200);
    popSound.play();
  }

  //destroying the pink balloon when arrow touches it
  if (arrowGroup.isTouching(pink_balloonGroup)) {
    arrowGroup.destroyEach();
    pink_balloonGroup.destroyEach();
    score += 2;
    //This text immediately disappears after a few milliseconds, with respect to the time taken for destroying the arrow and balloon but I want it to be readable so that the player knows how many points are given for each player. Please help me out with what condition will work here. This statement is important as 5 points are deducted for bursting the bad balloon(with a cross) and the player knows it. I have tried to put it before the destroying section but still the problem is not resolving
    fill("black");
    textSize(20);
    text("+2", 200, 200);
    popSound.play();
  }

  //destroying the green balloon when arrow touches it
  if (arrowGroup.isTouching(green_balloonGroup)) {
    arrowGroup.destroyEach();
    green_balloonGroup.destroyEach();
    score += 3;
    fill("black");
    textSize(20);
    text("+3", 200, 200);
    popSound.play();
  }

  //destroying the blue balloon when arrow touches it
  if (arrowGroup.isTouching(blue_balloonGroup)) {
    arrowGroup.destroyEach();
    blue_balloonGroup.destroyEach();
    score += 4;
    //same issue here
    fill("black");
    textSize(20);
    text("+4", 200, 200);
    popSound.play();
  }

  //destroying the villian balloon when arrow touches it
  if (arrowGroup.isTouching(bad_balloonGroup)) {
    arrowGroup.destroyEach();
    bad_balloonGroup.destroyEach();
    score -= 5;
    //same issue here
    fill("black");
    textSize(20);
    text("-5", 200, 200);
    popSound.play();
  }

  //printing the score
  fill("green");
  textSize(20);
  text("Score: " + score, 250, 20);

  //praising the player
  if ((score >= 20 && score <= 30) || (score >= 50 && score <= 60) || (score >= 100 && score <= 110)) {
    fill("deeppink");
    text("Amazing! Score is now " + score + "!", 80, 70);
  }
}

//function for creating red balloon
function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 170)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3 + ((score / 50) * 3);
  red.lifetime = 135;
  red.scale = 0.1
  red.depth = bow.depth;
  red.debug = false;
  red.setCollider("rectangle", 0, 0, 50, 80, 0);
  red_balloonGroup.add(red);
}

//function for creating blue balloon
function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 170)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3 + ((score / 50) * 3);
  blue.lifetime = 135;
  blue.scale = 0.1
  blue_balloonGroup.add(blue);
  blue.debug = false;
  blue.setCollider("rectangle", 0, 0, 50, 80, 0);
}

//function for creating green balloon
function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 170)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3 + ((score / 50) * 3);
  green.lifetime = 135;
  green.scale = 0.1
  green_balloonGroup.add(green);
  green.setCollider("rectangle", 0, 0, 50, 80, 0);
  green.debug = false;
}

//function for creating pink balloon
function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 170)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3 + ((score / 50) * 3);
  pink.lifetime = 135;
  pink.scale = 1;
  pink.debug = false;
  pink.setCollider("rectangle", 0, 0, 20, 80, 0);
  pink_balloonGroup.add(pink);
}

//function for creating bad balloon
function badBalloonCreator() {
  //random variable for y position of the balloon
  var rand = Math.round(random(20, 170));
  //blue balloon created here
  bad_balloon = createSprite(0, 0);
  bad_balloon.velocityY = 0;
  bad_balloon.velocityX = 3 + ((score / 50) * 3);
  bad_balloon.setVelocity(3, 0);
  bad_balloon.y = rand;
  bad_balloon.addImage("badBalloon", badBalloonImage);
  bad_balloon.scale = 0.3;
  bad_balloon.lifetime = 135;
  bad_balloon.debug = false;
  bad_balloon.setCollider("rectangle", 0, 0, 50, 80, 0);

  bad_balloonGroup.add(bad_balloon);
}

//function for creating arrows
function createArrow() {
  arrow = createSprite(380, 100, 5, 10);
  arrow.velocityX = -6;
  arrow.scale = 0.3;
  arrow.lifetime = 70;
  arrow.addImage(arrowImage);
  arrow.y = bow.y;
  arrowGroup.add(arrow);
  arrow.debug = false;
  return arrow;
}