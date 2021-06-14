var PLAY = 1;
var END = 0;
var gameState = 1;

var spaceship,spaceship_crashed;
var life = 3;
var diamond,diamondGroup;
var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;


var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  spaceshipImage = loadImage("new.png")
  
  
  spaceship_crashed = loadAnimation("a.png","b.png","c.png","d.png","e.png","f.png","g.png","g.png","h.png","i.png","a.png","j.png","k.png") 
  
  diamondImage = loadImage("spacedimond.png")
  obstacle1 = loadImage("enemy 2.png");
  obstacle3 = loadImage("enemy3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  
  createCanvas(800, 700);
  spaceship = createSprite(50,180,20,50);
  spaceship.scale = 0.1;
  spaceship.addImage  (spaceshipImage)
  ground=createSprite(300,200,1000,10)
  ground.visible = false
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  diamondGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background ("royalblue")
  textSize(20);
  fill(255);
  text("Score: "+ score, 500,40);
  text("life: "+ life , 500,60);
  drawSprites();
  if (gameState===1){
   
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    spaceship.y = mouseY
    
  
    //spaceship.velocityY = spaceship.velocityY + 0.8
  spawnDiamond();
    spawnObstacles();
    
    if(spaceship.isTouching(diamondGroup)){
      diamondGroup[0].destroy()
      score=score+1
    }
  
   if(obstaclesGroup.isTouching(spaceship)){
      life=life-1
        gameState = END;
    
    } 

    }
  
    
  
  
  if(gameState === END ) {
    gameOver.visible = true;
    restart.visible = true;
    spaceship.addAnimation("boom.jpg", spaceship_crashed);
    
    //set velcity of each game object to 0
    spaceship.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    diamondGroup.setVelocityXEach(0);
    
    //change the trex animation
    spaceship.changeAnimation("boom.jpg",spaceship_crashed);
    spaceship.scale =0.35;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      if(life>0){
        reset()
      }
      
    }
}
}
function spawnDiamond() {
  //write code here to spawn the diamonds
  if (frameCount % 130 === 0) {
    var diamond = createSprite(500,120,40,10);
    diamond.y = Math.round(random(80,820));
    diamond.addImage(diamondImage);
    diamond.scale = 0.1;
    diamond.velocityX = -3;
    
     //assign lifetime to the variable
    diamond.lifetime = 600;
    
    //adjust the depth
    diamond.depth = spaceship.depth;
    spaceship.depth = spaceship.depth + 1;
    
    //add each cloud to the group
    diamondGroup.add(diamond);
  }
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(500,165,10,40); 
    obstacle.y = random(200,800)
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
        obstacle.scale=0.1
              break;
      case 2: obstacle.addImage(obstacle1);
        obstacle.scale=0.05
              break;
      case 3: obstacle.addImage(obstacle3);
        obstacle.scale=0.1
              break;
    }
        
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
   // obstacle.scale = 0.2;
    obstacle.lifetime = 600;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  diamondGroup.destroyEach();
  
  spaceship.changeAnimation("spaceship",spaceshipImage);
  spaceship.scale =0.5;
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  
}