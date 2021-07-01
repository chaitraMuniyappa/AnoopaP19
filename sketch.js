var star1,star1Img,star2Img, star3Img,space,spaceImg;
var spaceship, spaceshipImg;
var asteriod, asteriodImg1,asteriodImg2,asteriodImg3,asteriodImg4;
var gameover,gameoverImg;
var gameState = "play";
var starsCollected = 0;
var starsGroup,asteroidGroup;

function preload() {
  spaceImg =loadImage ("images/space_bg1.jpg");
  star1Img =loadImage ("images/star2.png");
  star2Img = loadImage("images/star3.png");
  star3Img = loadImage("images/star4.png")
  spaceshipImg =loadImage("images/space_ship1.png");
  spaceshipImg1 =loadImage("images/spac_crash.png");
  asteriodImg1 = loadImage("images/ast1.png"); 
  asteriodImg2 = loadImage("images/ast2.png"); 
  asteriodImg3 = loadImage("images/ast3.png"); 
  asteriodImg4 = loadImage("images/ast4.png"); 
  gameoverImg = loadImage("images/images-removebg-preview.png");
}

function setup() {
  createCanvas(600,600);
  space = createSprite(400,400);
  space.addImage(spaceImg);
  space.scale = 1.5;
  space.velocityY = 3;
  
  spaceship = createSprite(100,400,20,20);
  spaceship.scale = 0.3;
  spaceship.addImage(spaceshipImg);
  spaceship.debug = true;
 
  gameover = createSprite(300,300);
  gameover.scale = 0.5;
  gameover.addImage(spaceshipImg1);
  gameover.visible=false;

  starsGroup = new Group();
  asteroidGroup= new Group();
}

function draw() {
  background("#0D4F8B");
  var edges = createEdgeSprites();
  spaceship.x = World.mouseX;
  spaceship.bounceOff(edges);

   if(gameState === "play"){
     if (space.y > 400){
      space.y = 200;
     }
     spawnStars();
     spawnAsteroids();
     if(asteroidGroup.isTouching(spaceship)){
          gameState = "end";
          asteroidGroup.destroyEach();
      }
     if(starsGroup.isTouching(spaceship)){
         starsCollected = starsCollected+1;
         starsGroup.destroyEach();
     }
}
  
if(gameState === "end"){
  fill("yellow");
  stroke(50);
  textSize(30);
  text("Your Spaceship Has Been Crashed ",70,100);
  space.destroy();
  spaceship.destroy();
  starsGroup.destroyEach();
  asteroidGroup.destroyEach();
  gameover.visible=true;
}

  drawSprites();
  textSize(20);
  fill("yellow");
  text("Stars Collected : "+starsCollected,380,20);
}
function spawnStars(){
  if(frameCount%200 === 0){
    var rand = Math.round(random(1,3));
    star1 = createSprite(300,-50,20,20);
    star1.scale = 0.2;
    star1.velocityY = 2;
    star1.x = Math.round(random(50,350)); 
    star1.lifetime = 650;
    starsGroup.add(star1);
    if(rand === 1){
      star1.addImage(star1Img);
    }else if(rand ===2){
      star1.addImage(star2Img);
    }else{
      star1.addImage(star3Img);
    }
  }
}
function spawnAsteroids(){
  if(frameCount% 150 ===0){
    var asteroid = createSprite(10,-29,50,50);
    asteroid.scale = 0.2;
    asteroid.velocityY = 2;
    asteroid.x = Math.round(random(50,350)); 
    asteroid.lifetime = 650;
    asteroidGroup.add(asteroid);
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: asteroid.addImage(asteriodImg1);
             break;
      case 2: asteroid.addImage(asteriodImg2);
              break;
      case 3: asteroid.addImage(asteriodImg3);
              break;
      case 4: asteroid.addImage(asteriodImg4);
              break;
      default:break;
    }
  }
}
