

let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d');
let canvasX = 0;
let canvasY = 0;


ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

let rightPressed = false;
let leftPressed = false;
let jump = false;
let fall = true;
let down = true;
let count = 0;
let hit = false;

let level = 1;
let levelMax = 4

const images = {};
images.player = new Image();
images.player.src = 'bootaPixel.png'

let playerWidth = 192;
let playerHeight = 192;
let playerFrameX = 0;
let playerFrameY = 0;
let playerX = 0;
let playerY = canvas.height -(playerHeight) -10;
let playerFrameNum = images.player.width/playerWidth;
let playerHealth = 100;
let playerMana = 500;

let enemyHeight = 100;
let enemyWidth = 100;
let enemyX = (canvas.width - enemyWidth)-10;
let enemyY = canvas.height-enemyHeight;
let enemyCounter =  0;
let enemySpeed = 1;
let enemyHealth = 200;

let access1 = true, access2 = true, access3 = true, access4 = true

let startStatus = false;
let interval;
let regenMana;

let move1 = false;

document.addEventListener('keydown',keyDownHandler,false)
document.addEventListener('keyup',keyUpHandler,false)

window.addEventListener('resize',function(){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  playerY = canvas.height -(playerHeight);
  playerX = 0 ;
  enemyY = canvas.height -(enemyHeight);
  enemyX = canvas.width - enemyWidth;
});

function keyDownHandler(e){
  if(startStatus){
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = true;
  }
  if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed = true;
  }
  if(e.key == 'w' || e.key == 'ArrowUp'){
    if(down){
    jump = true;
    down = false;

    }
  }
}
  if((e.key == 'Enter' || e.which == 13) && startStatus == false){
    if(!startStatus){
    startStatus = true;
  }
  }
  else if(e.key == 'Enter' || e.which == 13){
    if(startStatus){
    startStatus = false;
    rightPressed = false;
    leftPressed = false;
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('PAUSED', canvas.width/2, canvas.height/2)
  }
  }

  if(e.key ==' '){
    move1 = true;
  }
}

function keyUpHandler(e){
  if(startStatus){
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = false;
  }
  if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed = false;
  }
}
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawEnemy(){
  ctx.beginPath()
  let enemy1 = new Image();
  enemy1.src = 'knife.png';
  ctx.drawImage(enemy1,enemyX,enemyY,enemyWidth,enemyHeight);
  ctx.fill();
  ctx.closePath();
}

function drawHealth(){
  document.querySelector('#health').innerHTML = `Health:${playerHealth}`;
}

function drawMana(){
  if(playerMana <=0){
    playerMana = 0;
    document.querySelector('#mana').innerHTML = `Mana:${playerMana}`;
  }
  document.querySelector('#mana').innerHTML = `Mana:${playerMana}`;
}

let attackX = playerX + playerWidth;
let attackY = playerY;
let attackWidth = 100;
let attackHeight = 100;
let attackDamage;



function attackFireBall(x,y){
  ctx.beginPath()
  let attackOne = new Image();
  attackOne.src = 'knife.png';
  ctx.drawImage(attackOne,x,y,attackWidth,attackHeight);
  ctx.fill();
  ctx.closePath();

}

function attackMovement(){
  attackX += 15;
  if(attackX >= canvas.width){
    move1 = false;
    attackX = playerX+ playerWidth;;
    playerMana -= 50;
    drawMana()
  }
}


function collisionDetection(){

  if(enemyX < playerX + playerWidth &&
  enemyX + enemyWidth > playerX &&
  enemyY < playerY + playerHeight &&
  enemyY + enemyHeight > playerY){
    playerHealth -= 10;
    enemyX = (canvas.width - enemyWidth)-10;
    drawHealth();
    hit = true;
    if(playerHealth <=0){
    document.location.reload();
    clearInterval(interval);
  }
  }
}

function playerMovement(){

  if(rightPressed){
    playerX +=15;
    playerFrameY = 2;
    if(playerFrameX < 8)
    playerFrameX++;
    else{
      playerFrameX = 0;
    }
  }
   if(leftPressed){
    playerFrameY = 3;
    playerX -=15;
    if(playerFrameX < 8)
    playerFrameX++;
    else{
      playerFrameX = 0;
    }
  }
  if(!leftPressed && !rightPressed){
    playerFrameY = 0;
    if(playerFrameX < 8)
    playerFrameX++;
    else{
      count ++;
      if(count == 70){
      playerFrameX = 0;
      count = 0;
    }
    }
  }

  if(jump){
    if(playerY > 0){
      playerY -= 30;
    }
    if(playerY <= canvas.height/3){
      jump = false;
      fall = true;
    }
  }
  else if(fall){
    if(playerY < canvas.height){
      playerY += 15;
    }
    if(playerY+playerHeight >= canvas.height){
      playerY = canvas.height-playerHeight;
      fall = false;
      down = true;
    }
  }


}

function nextLevel(){
  if(playerX+(playerWidth/2) >= canvas.width){
    playerX= -playerWidth/2;
    level ++
    enemyX = (canvas.width - enemyWidth)-10;
  }
  if(level >= levelMax){
    level = levelMax;
  }
}
function prevLevel(){
  if(playerX+(playerWidth/2) < 0){
    playerX= -playerWidth/2 + canvas.width;
    level --;
  }
}

function levelOne(){
//  canvas.style.backgroundImage = "url('test.png')";
  canvas.style.backgroundImage = "url('mountain.png')";
  if(access1){

    access1 = false;
    access2 = true;
  }
}

function levelTwo(){
  canvas.style.backgroundImage = "url('boota.png')";
  canvas.style.backgroundColor = 'blue';
  if(access2){

    access2 = false;
    access1 = true;
    access3 = true;
  }
}

function levelThree(){
  canvas.style.backgroundColor = 'green';
  if(access3){

    access3 = false;
    access2 = true;
    access4 = true;
  }
}

function levelFour(){
  canvas.style.backgroundColor = 'purple';
  if(access4){

    access4 = false;
    access3 = true;
  }
}
let tempX;
let tempY;

function attackCheck(){
  if(!move1){
  tempX = playerX;
  tempY = playerY;
  attackX = tempX + playerWidth;
  attackY = tempY;
 }
  if(move1 == true){
  attackFireBall(attackX,attackY);
  attackMovement();
 }
}

function draw(){
 ctx.clearRect(canvasX,canvasY,canvas.width,canvas.height)
 drawSprite(images.player, playerWidth*playerFrameX,playerHeight*playerFrameY
 ,playerWidth,playerHeight,playerX,playerY,playerWidth,playerHeight);
 drawEnemy();
 playerMovement();
 attackCheck()
 collisionDetection();
 nextLevel();
 if(enemyX < 0){
   enemyX = (canvas.width - enemyWidth)-10;
 }

 if(level == 1){
   levelOne();
 }
 if(level == 2){
   levelTwo()
   prevLevel();
 }
 if(level == 3){
   levelThree()
   prevLevel();
 }
 if(level == 4){
   levelFour()
   prevLevel();
 }
}

function checkStart(){
  if(startStatus == true){
    draw()
  }

}

function begin(){

  interval = setInterval(checkStart,1000/60)
}

begin();
drawHealth();
drawMana();
