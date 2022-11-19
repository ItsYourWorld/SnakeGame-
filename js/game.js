const canvas = document.getElementById("game");

const ctx = canvas.getContext('2d')

const ground = new Image();

ground.src = "img/ground.png";

const foodImg = new Image();

foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let food = {

    x: Math.floor((Math.random() * 17 + 1)) * box,

    y: Math.floor((Math.random() * 15 + 3)) * box,

}

let snake = [];

snake[0] = {

    x: 9 * box,

    y: 10 * box

}

let dir;

document.addEventListener('touchstart', handleTouchStart, false);        

document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        

var yDown = null;

function getTouches(evt) {

  return evt.touches ||             // browser API

         evt.originalEvent.touches; // jQuery

}                                                     

                                                                         

function handleTouchStart(evt) {

    const firstTouch = getTouches(evt)[0];                                      

    xDown = firstTouch.clientX;                                      

    yDown = firstTouch.clientY;                                      

};                                                

                                                                         

function handleTouchMove(evt) {

    if ( ! xDown || ! yDown ) {

        return;

    }

    var xUp = evt.touches[0].clientX;                                    

    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;

    var yDiff = yDown - yUp;

                                                                         

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/

        if ( xDiff > 0 ) {

            /* right swipe */

            if (dir != "left") {

                dir = "right"

            } 

        } else {

            /* left swipe */

            if (dir != "right") {

                dir = "left"

            } 

        }                       

    } else {

        if ( yDiff > 0 ) {

            /* up swipe */

            if (dir != "down") {

                dir = "up"

            }  

        } else { 

            /* down swipe */

            if (dir != "up") {

                dir = "down"

            } 

        }                                                                 

    }

    /* reset values */

    xDown = null;

    yDown = null;                                             

};

function eatTail(head, arr) {

    for(let i = 0; i < arr.length; i++) {

        if(head.x == arr[i].x && head.y == arr[i].y)

        clearInterval(game);

    }

}

function drawGame() {

    ctx.drawImage(ground, 0, 0);

    

    ctx.drawImage(foodImg, food.x, food.y);

    

    for(let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i == 0 ? "green" : "lime";

        ctx.fillRect(snake[i].x, snake[i].y, box, box);

    }

    

    ctx.fillStyle = "white";

    ctx.font = "50px Arial";

    ctx.fillText(score, box * 2.5, box * 1.75);

    

    let snakeX = snake[0].x;

    let snakeY = snake[0].y;

    

    if(snakeX == food.x && snakeY == food.y) {

        score++;

        food = {

            x: Math.floor((Math.random() * 17 + 1)) * box,

            y: Math.floor((Math.random() * 15 + 3)) * box,

        };

    } else {

        snake.pop();

    }

    

    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)

    clearInterval(game);

    

    if(dir == "right") snakeX -= box;

    if(dir == "left") snakeX += box;

    if(dir == "up") snakeY -= box;

    if(dir == "down") snakeY += box;

    

    let newHead = {

        x: snakeX,

        y: snakeY

    };

    

    eatTail(newHead, snake);

    

    snake.unshift(newHead);

}

let game = setInterval(drawGame, 137);
