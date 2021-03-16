// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080); 
walkSound = new Audio('woop.wav');
hurtSound = new Audio('hurt.wav');
x = 0;
y = 0;
hp=3;
gbx = 256;
gby = 256;
speed = 64;
ticker = 0;
fps = 95;
moves = 1;
moveIntent="none";
// runSpeed = 3;
map = document.querySelector(".map");
character = document.querySelector(".blue-slime");
goblin = document.querySelector(".goblin");

goblin.style.transform = `translate3d( ${gbx}px,${gby}px,0)`;


window.addEventListener("keydown", e => {
  switch(e.key){
    case "ArrowLeft": moveIntent = "left";break;
    case "ArrowUp": moveIntent = "up";break;
    case "ArrowRight": moveIntent = "right";break;
    case "ArrowDown": moveIntent = "down";break;
    case "a": moveIntent = "left";break;
    case "w": moveIntent = "up";break;
    case "d": moveIntent = "right";break;
    case "s": moveIntent = "down";break;
}
});
window.addEventListener("keyup", e => {
  switch(e.key){
    case "ArrowLeft": moveIntent = "none";break;
    case "ArrowUp": moveIntent = "none";break;
    case "ArrowRight": moveIntent = "none";break;
    case "ArrowDown": moveIntent = "none";break;
    case "a": moveIntent = "none";break;
    case "w": moveIntent = "none";break;
    case "d": moveIntent = "none";break;
    case "s": moveIntent = "none";break;
}
});

function moveEverything(){
  rand = Math.random();
  if(Math.random() < .1) {
    //do nothing 
  }else if(rand < .25){
    gbx-=speed;
  } else if (rand >= .25 && rand < .5) {
    gbx+=speed;

  } else if (rand >= .5 && rand < .75){
    gby-=speed;

  } else if (rand >= .75 && rand < 1) {
    gby+=speed;

  }
  if(gbx < 0) gbx = 0;
  if(gby < 0) gby = 0;
  if(gbx > (832-64)) gbx = 832-64;
  if(gby > (640-64)) gby = 640-64;
  goblin.style.transform = `translate3d( ${gbx}px,${gby}px,0)`;
  if(gbx == x && gby == y){
    hurtSound.play()
    hp-=1;
    console.log(hp);
  }

}

function gameLoop(){ 
  if(moves>0){
    if(moveIntent!="none"){
      switch(moveIntent){
        case "left":  walkSound.pause();  x-=speed;moves-=1;break;
        case "up":    walkSound.pause();  y-=speed;moves-=1;break;
        case "right": walkSound.pause();  x+=speed;moves-=1;break;
        case "down":  walkSound.pause();  y+=speed;moves-=1;break;
     }
  
    if(x < 0) x = 0;
    if(y < 0) y = 0;
    if(x > (832-64)) x = 832-64;
    if(y > (640-64)) y = 640-64;
    
    walkSound.play()
    moveEverything();
    character.style.transform = `translate3d( ${x}px,${y}px,0)`;
  
  
     moveIntent = "none";
    }
  } else {
    ticker++
    if(ticker%65 == 0){ 
      moves = 1;
    }
    if(ticker > 100000){
      ticker = 0;
    }
  }
}
setInterval(function(){gameLoop()},1000/fps);
