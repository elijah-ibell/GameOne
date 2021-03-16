// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080); 
walkSound = new Audio('woop.wav');
x = 0;
y = 0;
speed = 64;
ticker = 0;
fps = 95;
moves = 1;
moveIntent="none";
// runSpeed = 3;
map = document.querySelector(".map");
character = document.querySelector(".blue-slime");
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

function gameLoop(){
  // console.log(`x:${x} y:${y}`);
  
  
  
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
