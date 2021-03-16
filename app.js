// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080); 
const walkSound = new Audio('woop.wav');
const hurtSound = new Audio('hurt.wav');
const gameOverSound = new Audio('game_over.wav');
const music = new Audio('game_music.wav');
const win_music = new Audio('game_victory.wav');
const coin_sound = new Audio('coin.wav');
x = 0;
y = 0;
hp=3;
gbx = 256;
gby = 256;
const sprite_size = 64;
const room_width = 832;
const room_height = 640;
coin_num = 5
coinx = 384;
coiny = 384;
const speed = 64;
ticker = 0;
const fps = 95;
moves = 1;
moveIntent="none";
// runSpeed = 3;
map = document.querySelector(".map");
character = document.querySelector(".blue-slime");
goblin = document.querySelector(".goblin");
coin = document.querySelector(".coin");
hearts = document.querySelectorAll(".heart");
menu = document.querySelector(".menu");


coin.style.transform = `translate3d( ${coinx}px,${coiny}px,0)`;

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
  //move gobs many times
  for(var i =0; i < 7;i++){  
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


}

function gameLoop(){ 
  music.play()
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
    if(x > (room_width-sprite_size)) x = 832-64;
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

  //win condition check
  if(x == coinx && y == coiny){
    clearInterval(tick);
    coin_sound.play()
    music.pause();
    win_music.play();
    if(confirm("YOU WIN!!! \n\n wanna play again?")){
      location.reload();
    } else {
      //display credits
      location.replace("credits.html");
    }
  }

  //lose condition check
  if(hp == 2){  
    hearts[2].style.display = "none";
  } else if (hp == 1){
    hearts[2].style.display = "none";
    hearts[1].style.display = "none";
  }
  else if(hp<=0){
    hearts[2].style.display = "none";
    hearts[1].style.display = "none";
    hearts[0].style.display = "none";
    music.pause();
    gameOverSound.play();
    clearInterval(tick);
    if(confirm("YOU LOSE... \n\n try again?")){
      location.reload();
    } else {
      //display credits
      location.replace("credits.html");
    }
  }
}

tick = setInterval(function(){gameLoop()},1000/fps);
