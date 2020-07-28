

var earth,tRex,ground,invisGround,g,dino,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloudImage ,obstacleGroup,cloudGroup,gameState,play,end,overSprite,startSprite,overImg,startImg,score


function preload(){
dino = loadAnimation("trex0.png","trex1.png","trex2.png");
  
  dinoDead = loadAnimation("trex_collided.png");
  
earth = loadImage("grnd.png");
  
obstacle1 = loadImage("obstacle1.png");
  
obstacle2 = loadImage ("obstacle2.png");
  
obstacle3 = loadImage("obstacle3.png");
  
obstacle4 = loadImage("obstacle4.png");
  
obstacle5 = loadImage("obstical5.png")
  
obstacle6 = loadImage("obstical6.png");
  
cloudImage = loadImage("Cloud.png");
  
overImg = loadImage("gameover.png");
  
startImg = loadImage("resetBt.png");
} 

function setup(){
createCanvas(600,200);
  
  score = 0;
  
  play = 1;
  
  over = 0;
  
  gameState = play;
  
  tRex = createSprite(90,170);
  tRex.addAnimation("tRex",dino);
  tRex.addAnimation("dinoDead",dinoDead);
  tRex.scale = 0.5;
  
  ground =createSprite(300,190);
  ground.addImage("grnd.png",earth);
  ground.velocityX=-2
  
  overSprite = createSprite(300,15);
  overSprite.addImage("gameover.png",overImg);
  overSprite.visible = false;
  
  startSprite = createSprite(300,100);
  startSprite.addImage("resetBt.img",startImg);
  startSprite.visible = false;
  
  
  invisGround = createSprite(300,195,600,10);
  invisGround.visible = false;
  
  cloudGroup = new Group();
  
  g = 1;
  
  cactusGroup = new Group();
}
function draw(){
  
  background (rgb(0,0,0));
  text("score = "+score,450,50);
text(mouseX+","+mouseY,mouseX,mouseY);
  if(gameState == play){
    score+=Math.round(getFrameRate()/60);
  if(keyDown("space")&&tRex.isTouching(ground)){
   tRex.velocityY = -10; 
  }
     tRex.velocityY +=g;
  
  ground.velocityX=-3;
  if(ground.x<0){
  ground.x=ground.width/2;
  }

  if(cactusGroup.isTouching(tRex)){
    gameState = over;
    tRex.changeAnimation("dinoDead",dinoDead);
  }
  
  clouds();
  
  cacti();
  }
  else if (gameState==over){
  startSprite.visible = true;
  ground.velocityX=0;
  /*birdGroup.setVelocityEach(0,0);
  birdGroup.setLifetimeEach(-1);
  birdGroup.setAnimationEach("bird-dead");*/
    
  cactusGroup.setVelocityEach(0,0);
    
  cloudGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityEach(0,0);
    
  cactusGroup.setLifetimeEach(-1);
 tRex.velocityY=0;
 
    overSprite.visible = true;


 

 
 if(mousePressedOver(startSprite)){
   gameState= play ;
  // birdGroup.destroyEach();
   cactusGroup.destroyEach();
   cloudGroup.destroyEach();
   startSprite.visible = false;
   tRex.changeAnimation("tRex",dino);
   overSprite.visible = false;
score=0;

   
 }
 
}

  drawSprites();
  
  tRex.collide(invisGround);
}

function clouds (){
  
  if(frameCount % 90 == 0){
    
  var cloud = createSprite(600,190,10,10);
  cloud.addImage("cloud",cloudImage);
  cloud.velocityX = -3;
  cloud.y = Math.round (random(0,50));
  tRex.depth = cloud.depth + 1 ;
  cloud.lifetime=-300;
  cloudGroup.add(cloud);
  }
 }


function cacti (){
    if(frameCount % 120 == 0){
      var cactiDecider = Math.round (random(1,6));
      
      var cactus = createSprite(600,170,10,10);
      cactus.velocityX=-3;
      cactus.lifetime=300;  
      cactus.scale=0.5;
      switch(cactiDecider){
        case 1:cactus.addImage("obstacle1",obstacle1);
          break;
        case 2:cactus.addImage("obstacle2",obstacle2);
          break;
        case 3:cactus.addImage("obstacle3",obstacle3);
          break; 
        case 4:cactus.addImage("obstacle4",obstacle4);
          break;
        case 5:cactus.addImage("obstacle5",obstacle5);
          break;
        case 6:cactus.addImage("obstacle6",obstacle6);
          break;
          
          default:break;
      }
      
      cactusGroup.add(cactus);
 /*     if((tRex.x+500>cactusGroup.x)&&tRex.y>=369){
  tRex.velocityY=-24;
}*/

  }
  
}