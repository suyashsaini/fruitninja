var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit1,fruit2,fruit3,fruit4,monster,monster2;
var swordImage,monsterImage,gameoverImage;
var fruitGroup,enemyGroup;
var gameover;
var score=0;
var gameovers,swordhit,checkpoint;
var position;


function preload() {
  
  //load images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage1 = loadImage("alien1.png");
  monsterImage2 = loadImage("alien2.png");
  swordImage = loadImage("sword.png");
  gameoverImage = loadImage("gameover.png")
  gameovers = loadSound("Game-over.wav")
  swordhit = loadSound("Sword-swipe-1.wav")
  checkpoint = loadSound("Combo.wav")
  
}


function setup() {
  
  createCanvas(400,400);
  
  sword = createSprite(40,200,20,20);  
  sword.scale=0.7;
  sword.addImage(swordImage);
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}


function draw() {
  background("pink");
  
  if(gameState === PLAY){
 
  Enemys();
  fruits();
     
  sword.y=World.mouseY;
  sword.x=World.mouseX;   
     
   if(fruitGroup.isTouching(sword)) {
    fruitGroup.destroyEach();
     swordhit.play();
    score=score+2;
   }
     
     else if(enemyGroup.isTouching(sword)) {
      
      gameState = END;
    
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.velocityX=0;
      enemyGroup.velocityX=0;
      sword.addImage(gameoverImage);
      sword.scale=0.9;
      sword.x=300;
      sword.y=300;
       gameovers.play();
       
       
    }
    
  }
  
  drawSprites();
  
  text("Score : " + score,500,50);
  
}


function fruits() {
  
  if(World.frameCount%80===0){ 
    position = Math.round(random(1,2));
   fruit=createSprite(600,200,20,20);
   fruit.scale=0.2;
    r=Math.round(random(1,4)); 

     if(r == 1) {
      fruit.addImage(fruit1);
     } 
     else if (r == 2){
      fruit.addImage(fruit2)
     } 
     else if (r == 3){
      fruit.addImage(fruit3)
     } 
     else if (r == 4){
      fruit.addImage(fruit4)
     }
     if(position == 1){
     fruit.y=Math.round(random(50,340));
     fruit.velocityX=-(7+1*score/4);
     fruit.setlifetime=100;
     }
    else
    {
     if(position == 2){
      fruit.x = 0;
       fruit.velocityX=(7+1*score/4);
     }
    }
     fruitGroup.add(fruit);
  }
}
  

function Enemys() {
  
   if(World.frameCount%200 === 0) { 
     
     monster=createSprite(600,200,20,20);
     monster.addImage("moving", monsterImage1);
     monster.y=Math.round(random(25,275)); 
     monster.velocityX=-(8+2*score/10);
     monster.setlifetime=50;

     enemyGroup.add(monster);  

   }
  
   if(World.frameCount%200 === 0) {
     
     monster2=createSprite(400,200,20,20);
     monster2.addImage("moving2", monsterImage2);
     monster2.y=Math.round(random(325,575));
     monster2.velocityX=-8;
     monster2.setlifetime=50;

     enemyGroup.add(monster2);
     
   }
   
}