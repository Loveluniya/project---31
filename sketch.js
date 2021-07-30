const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var base1 , base2, base3;
var stones = [];
var bg_img;
var zombie
var zombie1,zombie2,zombie3,zombie4,sad_zombie;
var breakButton;

function preload(){

bg_img = loadImage("background.png");
zombie1 = loadImage("zombie1.png");
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
zombie4 = loadImage("zombie4.png");
sad_zombie = loadAnimation("sad_zombie.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);



  breakbutton = createImg('axe.png');
  breakbutton.position(width-100,height/2 - 50);
  breakbutton.size(50,50);
  breakbutton.mouseClicked(handleButtonPress);

   
 base1 = new Base(width/20,height/2  -180,width/10,height/6);
 base1.visible = false;
 base2 = new Base(width-80,height/2 -100,width/10,height/6);
 base2.visible = false;
 base3 = new Base(width/2,height-1,width/1,height/6);
 base3.visible = false;

 zombie = createSprite(width/2,height-110);
 zombie.addAnimation("leftToRight",zombie1,zombie2,zombie1);
 zombie.addAnimation("rightToleft",zombie3,zombie4,zombie3);
 zombie.velocityX = 5;
 zombie.scale = 0.1;



 bridge = new Bridge (26,{x: width/2- 625, y: height/2 - 100 });
 jointPoint = new Base(width - 100,height/2 -100,40,20);

 Matter.Composite.add(bridge.body,jointPoint);
 jointLink = new Link (bridge,jointPoint);

 for (var i = 0; i <=8; i++){

  var x = random(width/2 -200, width/2 + 300);
  var y = random(-10 , 100);
  var stone = new Stone(x,y,70,70);
  stones.push(stone);
  
  }
 imageMode(CENTER);
}

function draw() {
  background("grey");
  image(bg_img,width/2,height/2,width+40,height+40);
  Engine.update(engine);

  base3.show();
 bridge.show();

for (var stone of stones){
stone.show();
var pos = stone.body.position;
var distance = dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
if (distance <= 50){
zombie.velocityX = 0;
Matter.Body.setVelocity(stone.body,{x:10,y:-10});
zombie.addAnimation("sad",sad_zombie);
zombie.changeAnimation("sad");
collided = true;
}

}

if (zombie.position.x >= width - 300){

zombie.velocityX = -5;
zombie.changeAnimation("rightToleft");

}

if (zombie.position.x <= 300){

zombie.velocityX = 5;
zombie.changeAnimation("leftToRight");

}

drawSprites();

}

function handleButtonPress (){

  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },1500)

}
