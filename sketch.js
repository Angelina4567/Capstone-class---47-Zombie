var bg , bgimg;
var player, shooterimg, shootingimg;
var zombie, zombieimg;
var zombiegroup;
var bullet, bulletgrp;
var heart1, heart2, heart3;
var heart1img, heart2img, heart3img;

function preload(){
bgimg = loadImage("assets/bg.jpeg")
shooterimg = loadImage("assets/shooter_2.png")
shootingimg = loadImage("assets/shooter_3.png")
zombieimg = loadImage("assets/zombie.png")
heart1img = loadImage("assets/heart_1.png")
heart2img = loadImage("assets/heart_2.png")
heart3img = loadImage("assets/heart_3.png")
}

function setup(){
createCanvas(windowWidth, windowHeight)
bg = createSprite(displayWidth/2, displayHeight/2, 20, 20)
bg.addImage ("bg",bgimg)
player = createSprite(200,400,20,20)
player.scale = 0.3
player.addImage(shooterimg)
player.debug = true
player.setCollider("rectangle", 0,0,300,300)
zombiegroup = new Group()
bulletgrp = new Group()

//creating sprite to define lives remaining
heart1 = createSprite(1000,50,20,20)
heart1.addImage("heart1", heart1img)
heart1.scale = 0.4
heart1.visible = false

heart2 = createSprite(1000,50,20,20)
heart2.addImage("heart2", heart2img)
heart2.scale = 0.4
heart2.visible = false

heart3 = createSprite(1000,50,20,20)
heart3.addImage("heart3", heart3img)
heart3.scale = 0.4
heart3.visible = true

}

function draw(){
background("black")

if(keyDown("UP_ARROW")&& player.y>60){
player.y -= 10
}

if(keyDown("DOWN_ARROW")&& player.y<500){
  player.y += 10
}

if(keyDown("RIGHT_ARROW")){
  player.x += 10
}

if(keyDown("LEFT_ARROW")){
  player.x -= 10
}

if(keyWentDown("SPACE")){
player.addImage(shootingimg)
//creating bullet
bullet = createSprite(player.x+40,player.y-30,20,10)
bullet.velocityX = 20
bulletgrp.add(bullet)
}

if(keyWentUp("SPACE")){
  player.addImage(shooterimg)

}

// calling function
enemy()

//checking collision in between player and zombie
if(zombiegroup.isTouching(player)){
  for(var i = 0; i<zombiegroup.length; i++){
    if(zombiegroup[i].isTouching(player)){
      zombiegroup[i].destroy()
    }
  }
}

//checking collision in between zombies and the bullets
if(bulletgrp.isTouching(zombiegroup)){
  for(var i = 0; i<zombiegroup.length; i++){
    if(zombiegroup[i].isTouching(bulletgrp)){
      zombiegroup[i].destroy()
      bulletgrp.destroyEach()
    }
  }
}

drawSprites()


}
//12%2 = 0
//12/2 = 6
function enemy(){
  if(frameCount%50==0){

  zombie = createSprite(1000,300,10,10)
  zombie.x = random(100,1100)
  zombie.y = random(100,600)
  zombie.lifetime = 400
  zombie.addImage(zombieimg)
  zombie.scale = 0.1
  zombie.velocityX -= 3
  zombie.debug = true
  zombie.setCollider("rectangle", 0,0,400,400)
  zombiegroup.add(zombie)
  }

}