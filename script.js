"use strict";
window.console.log = () => {};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width = window.innerWidth;
const ch = canvas.height = window.innerHeight;

let obstacleInterval;
let gameInterval;
let direction = 0;
let speed = 1;
let playerX = cw/2;
let obstacles = [];
let game = false;
let keys = true;
let totalDistance = 0;
const bangImage = document.getElementById('bang');
const playerImage = document.getElementById('player');
let highestScore = localStorage.getItem('highest_score')!=null ? parseInt(localStorage.getItem('highest_score')) : 0;
const GameTitle = `Ski Game`
// Draw an obstacle
const drawObstacle = (ctx,type,x,y,h,w)=>{
  
  if (type === 'tree'){
    
    ctx.fillStyle='#04AA6D';
    const tree = new Path2D();
      tree.moveTo(x+w/2, y);
      tree.lineTo(x, y+h*0.9);
      tree.lineTo(x+w*0.33, y+h*0.85);
      tree.lineTo(x+w*0.33, y+h);
      tree.lineTo(x+w*0.66, y+h);
      tree.lineTo(x+w*0.66, y+h*0.85);
      tree.lineTo(x+w, y+h*0.9);
      tree.closePath();
    ctx.fill(tree);
    
  } else if (type === 'mound'){
    
    ctx.strokeStyle='#9b7653';
    ctx.lineWidth=1;
    const mound = new Path2D();
      mound.moveTo(x, y);
      mound.quadraticCurveTo(x+w/2,y-h,x+w, y);
    ctx.stroke(mound);
    
 } else {
   console.error('Drawing error');
 }
}

// Create a new obstacle
const createObstacle = ()=>{
  const obstacleTypes = ['tree','mound'];
  const type = obstacleTypes[Math.round(Math.random())];
  
  if (type === 'tree'){
    const treeHeight = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    obstacles.push({
      type: 'tree',
      x: Math.round(cw*Math.random()),
      y: ch,
      height: treeHeight,
      width: treeHeight/2
    });
  } else if (type === 'mound'){
    const moundWidth = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    obstacles.push({
      type: 'mound',
      x: Math.round(cw*Math.random()),
      y: ch,
      height: moundWidth/2,
      width: moundWidth
    });
  } else {
     console.error('Obstacle Creation error');
   }
    
  if(obstacles.length>0 && obstacles[0].y < 0 -obstacles[0].height){
     obstacles.shift();
  }
  
}

// Draw Canvas, set pixels in a rectangular 
const draw = () => { 
  ctx.clearRect(0, 0, cw, ch);
  totalDistance++;
  
  ctx.fillStyle='#495ff6';
  // initial welcome board
  if (totalDistance<10){
    ctx.textAlign="center"; 
    ctx.fillStyle='#e6e6e6';
    ctx.fillRect(0, 0, cw, 200);
    ctx.fillStyle='#111213';
    ctx.font = "40px Helvetica";
    ctx.fillText(GameTitle,cw/2,60);
    ctx.font = "20px Helvetica";
    ctx.fillText(`Press any key to start`,cw/2,100);
    ctx.font = "16px Helvetica";
    ctx.fillText(`Use LEFT ARROW KEY and  RIGHT ARROW KEY to steer`,cw/2,124);
    ctx.fillStyle='#495ff6';
  }

  // Scoreboard - top left
  ctx.textAlign="start"; 
  ctx.font = "14px Helvetica";
  ctx.fillText(`Score: ${Math.floor((totalDistance-1)/4)} feet`,10,25);
  
  ctx.fillText(`Highest Score: ${highestScore} feet`,10,50);
  // Draw player - either use image or Path2D for player - image doesn't have moveTo/lineTo function
  // const player = ctx.drawImage(playerImage,playerX,200,30,30);
  const player = new Path2D();
        player.moveTo(playerX-8-direction*2, ch/4);
        player.lineTo(playerX-1-direction*2, ch/4);
        player.lineTo(playerX-1+direction*2, ch/4+16);
        player.lineTo(playerX-4+direction*2, ch/4+16);
        player.closePath();
        player.moveTo(playerX-4-direction*2, ch/4);
        player.lineTo(playerX-1-direction*2, ch/4);
        player.lineTo(playerX-1+direction*2, ch/4+16);
        player.lineTo(playerX-4+direction*2, ch/4+16);
        player.closePath();
        player.moveTo(playerX+4-direction*2, ch/4);
        player.lineTo(playerX+1-direction*2, ch/4);
        player.lineTo(playerX+1+direction*2, ch/4+16);
        player.lineTo(playerX+4+direction*2, ch/4+16);
        player.closePath();
        player.moveTo(playerX+8-direction*2, ch/4);
        player.lineTo(playerX+1-direction*2, ch/4);
        player.lineTo(playerX+1+direction*2, ch/4+16);
        player.lineTo(playerX+4+direction*2, ch/4+16);
        player.closePath();
  ctx.fill(player);
  
  // Update obstacle postions
  obstacles = obstacles.map(function(obstacle){
    return {
      type: obstacle.type,
      x: obstacle.x,
      y: obstacle.y-speed,
      height: obstacle.height,
      width: obstacle.width
    }     
  });
  
  // Update player position and make sure it stays in the window
  if (playerX < 0){
    playerX += Math.abs(direction/2);
  } else if (playerX>cw) {
    playerX -= Math.abs(direction/2);
  } else {
    playerX += direction/2;
  }

  obstacles.forEach(function(obstacle) {
    // Draw Obstacles
    drawObstacle(ctx,
                  obstacle.type,
                  obstacle.x,
                  obstacle.y,
                  obstacle.height,
                  obstacle.width);
    
    // Detect Crash
    if (obstacle.y+obstacle.height > ch/4 - 16
        && obstacle.y < ch/4
        && obstacle.x-obstacle.width/2 < playerX 
        && obstacle.x+obstacle.width/2 > playerX 
        && obstacle.type == 'tree'){
      console.log('crash!');
      stopGame();
      game = false;
      // Show crash/bang image
      ctx.drawImage(bangImage,obstacle.x-40,obstacle.y-20,100,100);
      // Show message on crash
      ctx.fillStyle='#e6e6e6';
      ctx.fillRect(0, 0, 300, 200);
      ctx.font = "16px Helvetica";
      ctx.fillStyle='#495ff6';
      ctx.fillText(`Score: ${Math.floor((totalDistance-1)/4)} feet`,10,25);
      ctx.fillText(`Highest Score: ${highestScore} feet`,10,50);
      ctx.fillStyle='#FF0000';
      ctx.font = "20px Helvetica";
      ctx.fillText(`CRASHED!!!`,10,90);
      ctx.fillStyle='#111213';
      ctx.fillText(`Traveled ${Math.floor((totalDistance-1)/4)} feet.`,10,130);
      ctx.fillText(`Press space to restart.`,10,160);
    }
  });
  
}
// Controller - Keyboard LEFT & RIGHT key
const handleKey = (e)=>{
  const key = e.key;  
  const keycode = e.keyCode;  

  if (keys){
    if(key === "ArrowLeft" && direction > -2){
      direction--;
    } else if (key === "ArrowRight" && direction < 2){
      direction++;
    }
    // else if (key === "ArrowDown"){
    //   speed++;
    // }else if (key === "UpDown"){
    //   speed--;
    // };
    
    // Detect game start
    if(key === "ArrowLeft" || "ArrowRight" ||"ArrowUp" || "ArrowDown"){
      startGame();
      game = true;
    } 
  }
  
  // Detect game over and restart on space press - keycode 32 is for space
  if (keycode===32 && game === false){
      window.location.reload(true);
  }
  
}

// starts the game
const startGame = ()=>{
  if (!game){
    console.log('game on!');
    // It creates the obstacles - in setInterval the number - the lower, the more obstacles
    obstacleInterval = setInterval(createObstacle,50);
    // Draws the canvas
    gameInterval = setInterval(draw,1);
  } 
}

// ends the game
const stopGame = ()=>{
  if(game){
    // Clearing all intervals and getting ready for new game
    clearInterval(obstacleInterval);
    clearInterval(gameInterval);
    keys = false;
    if(highestScore < Math.floor((totalDistance-1)/4)){
      highestScore = Math.floor((totalDistance-1)/4);
      localStorage.removeItem('highest_score');
      localStorage.setItem('highest_score', highestScore);
    }
  }
}
// Listen for key
document.addEventListener('keydown',  handleKey);

draw();