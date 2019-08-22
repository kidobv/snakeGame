
const gs = 20; // grid size
const tc = 30;
var px = 15;
var py = 15; // player position within the tiles	
var ax = 20;
var ay = 20; //apple initial position
var xVector = 0;
var yVector = 0;
var trail = [];
var tail = 5;
var score = 0;
var canv =null;
var context =null;

window.onload = function () {
     canv = document.querySelector("#gameCanvas");    
     context = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 10)
}

function game() {
    px += xVector;
    py += yVector;

    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, canv.width, canv.height);

    context.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        //bite his tail
        if (trail[i].x === px && trail[i].y === py) {
            tail = 5;
            score = 0;
            document.getElementById("score").innerText = `score: ${score}`;
        }
    }
    trail.push({
        x: px,
        y: py
    });
    while (trail.length > tail) {
        trail.shift();

        if (ax === px && ay === py) {
            tail++;
            //prevents the new apple position to be inside the snake body
            while ((ax === px && ay === py) || (trail.indexOf({ x: ax, y: ay }) === 1)) { //checking for the content of the trail object to be the same X and Y as the apple
                ax = Math.floor(Math.random() * tc)
                ay = Math.floor(Math.random() * tc)
            }
            score++;
            document.getElementById("score").innerText = `score: ${score}`;
        }
    }

    context.fillStyle = "red";
    context.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37: //left arrow
            xVector = -1;
            yVector = 0;
            break;
        case 38: //Up arrow
            xVector = 0;
            yVector = -1;
            break;
        case 39: //right arrow
            xVector = 1;
            yVector = 0;
            break;
        case 40: //down arrow
            xVector = 0;
            yVector = 1;
            break;
        default:
            break;
    }
}

function buttonClick(id) {
    switch (id) {
        case 'left':
            xVector = -1;
            yVector = 0;
            break;
        case 'up':
            xVector = 0;
            yVector = -1;
            break;
        case 'right':
            xVector = 1;
            yVector = 0;
            break;
        case 'down':
            xVector = 0;
            yVector = 1;
            break;
        default:
            break;
    }
}