
var monkey , monkey_running,monkeyI
var bananaF ,bananaImage, obstacle, obstacleImage,bananasGroup;
var FoodGroup, obstaclesGroup
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop = loadAnimation("sprite_6.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400); 
  
  monkey = createSprite (50,350,20,20);
 
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);

  monkey.scale = 0.15;
  
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    monkey.debug = false;
  
  survivalTime = 0;
  
  ground = createSprite(300,380,900,20);
  ground.velocityX = -4;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  survivalTime = 0;
}


function draw() {
  
  background(255);
 
    Math.round(getFrameRate()/60);
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time :"+ survivalTime,100,50);
  
  if (gameState === PLAY) {
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
    
                  
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    banana();
    
    spawnObstacles();
    
   
    
    if (ground.x = -1){
      ground.x = ground.width/2;
    }
    if(monkey.isTouching(bananasGroup)){
       bananasGroup.destroyEach();
     }
     if(monkey.isTouching(obstaclesGroup)){
       gameState = END;
     }
     survivalTime = survivalTime + 1;
  }
  
  if (gameState === END) {
    text("press R to restart",200,200);
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     ground.velocityX = 0;     
    monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);
    monkey.changeAnimation("stop",monkey_stop);
  }   
  if (keyDown("r") && gameState === END) {
      reset();
  }
 
  
  monkey.collide(ground);

  
 drawSprites();
}

function banana() {
  
  if (frameCount % 80 === 0) {
    bananaF = createSprite(600,365,10,40); 
    bananaF.y = Math.round(random(120,200));
    bananaF.addImage(bananaImage);
    bananaF.velocityX = -3;
    bananaF.lifetime = 200;
    bananaF.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaF.scale = 0.1;
    
    bananasGroup.add(bananaF);
}
}

function spawnObstacles() {
  if (frameCount % 90 === 0){
   var obstacle = createSprite(600,345,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(6);
       
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle); 
  }
  
}

function reset() {
  survivalTime = 0;
  monkey.changeAnimation("running",monkey_running);

  obstaclesGroup.destroyEach(); 
   
  bananasGroup.destroyEach();
    
  gameState = PLAY;

}
