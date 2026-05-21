const params = new URLSearchParams(window.location.search);
const level = params.get('level');
const audio = document.getElementById('jumpSound');
function playOverlapping() {
    const clone = audio.cloneNode();
    clone.play();
}

const settings = {
    easy: 400,
    medium: 300,
    hard: 200,

}

const player = document.getElementById('player');
const playerStartingPostition = 720 / 2 - 40;
// Player Properties
class Player {
    constructor() {
        this.positionX = 200;
        this.positionY = playerStartingPostition;
        this.width = 50;
        this.height = 60;
        this.acceleration = 1;
        this.tickMs = 25;
        this.score = 0;

        this.updateUI();
        this.updateScore();
    }
    updateUI() {
        const playerElm = document.getElementById("player")
        playerElm.style.left = this.positionX + "px"
        playerElm.style.bottom = this.positionY + "px"
        playerElm.style.width = this.width + "px"
        playerElm.style.height = this.height + "px"
    }
    jump() {
        playOverlapping(); 
        this.velocity = 15;
        this.jumpTimer = setInterval(() => {
            this.positionY += this.velocity
            this.velocity -= this.acceleration;
            this.updateUI()
            if (this.positionY + this.height >= boardHeight) {
                this.velocity = -this.velocity;
                this.velocity -= this.acceleration;
            }
            if (this.positionY <= 0) {
                gameover();
            }
        }, this.tickMs)
    }
    updateScore() {
        const scoreElm = document.getElementById('score');
        scoreElm.innerHTML = `${this.score}`;
    }

}


// Player Movement
const player1 = new Player();

//Declared in global scope so it can be removed
function keyListner(event) {
    if (event.code === 'Space' && player1.positionY + player1.height <= boardHeight) {
        clearInterval(player1.jumpTimer)
        player1.jump();
    }
}

document.addEventListener('keydown', keyListner);

// Properties of the Board and Obstacle extremes
const obsMinHeight = 90;
const obsMaxHeightLimiter = 150;
const boardHeight = 720;
const boardWidth = 1000;
const obstacleGap = settings[level];//change with level

// Obstacle Properties
class Obstacle {
    constructor() {
        this.width = 80;
        this.topObstacleHeight = Math.floor(Math.random() * (boardHeight - obstacleGap - obsMaxHeightLimiter) + obsMinHeight);
        this.bottomObstacleHeight = boardHeight - this.topObstacleHeight - obstacleGap;
        this.positionX = boardWidth;
        this.topObsPositionY = boardHeight - this.topObstacleHeight;
        this.bottomObsPositionY = 0;
        this.topObstacleElm = null;
        this.bottomObstacleElm = null;
        this.past = false;
        this.createDynamicElement();
        this.updateUIUpp();
        this.updateUIDown();
        this.tickMs = 25;
    }
    createDynamicElement() {
        this.topObstacleElm = document.createElement('div');
        this.topObstacleElm.className = ('obstacleUpp');
        this.bottomObstacleElm = document.createElement('div');
        this.bottomObstacleElm.className = ('obstacleDown');
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.topObstacleElm);
        boardElm.appendChild(this.bottomObstacleElm);

    }
    updateUIUpp() {
        this.topObstacleElm.style.width = `${this.width}px`
        this.topObstacleElm.style.height = `${this.topObstacleHeight}px`
        this.topObstacleElm.style.bottom = `${this.topObsPositionY}px`
        this.topObstacleElm.style.left = `${this.positionX}px`
    }
    updateUIDown() {
        this.bottomObstacleElm.style.width = `${this.width}px`
        this.bottomObstacleElm.style.height = `${this.bottomObstacleHeight}px`
        this.bottomObstacleElm.style.bottom = `${this.bottomObsPositionY}px`
        this.bottomObstacleElm.style.left = `${this.positionX}px`
    }
    moveLeft() {
        this.positionX -= 6.5;
        this.updateUIUpp();
        this.updateUIDown();
    }

}

const obstacle1 = new Obstacle;


// Array of Obstacle Instances
const obstacleArr = [];

// Intervals declared globally so they can be cleared
const intervals = {
    createObstacles: null,
    moveObstacles: null,
    score: null,
    mountains: null,
};


//Mountain Scroll
const mountain = {
    element: document.getElementById('mountains'),
    x: 0,
    scrollRate: 0.5,
    imageWidth: 1100,
    interval: null,
    tickMs: 25,
}
const clouds = {
    element: document.getElementById('clouds'),
    x: 0,
    scrollRate: 1.5,
    imageWidth: 1000,
    interval: null,
    tickMs: 25,
}
const bottomClouds = {
    element: document.getElementById('clouds-bottom'),
    x: 0,
    scrollRate: 1,
    imageWidth: 800,
    interval: null,
    tickMs: 25,
}


function scrollElm(boolean, object) {
    if (boolean === false) {
        clearInterval(object.interval)
    } else {
        object.interval = setInterval(() => {
            object.x -= object.scrollRate;
            if (object.x <= -object.imageWidth) {
                object.x = 0;
            }
            object.element.style.backgroundPosition = `${object.x}px 100%`
        }, object.tickMs)
    }
}


// Create Obstacle Interval
function createObstacles(boolean) {
    if (boolean === false) {
        clearInterval(intervals.createObstacles)
    } else {
        intervals.createObstacles = setInterval(() => {
            obstacleArr.push(new Obstacle);
        }, 2000)
    }


}

// Move Obstacle Interval
function moveObstacles(boolean) {
    if (boolean === false) {
        clearInterval(intervals.moveObstacles)
    } else {
        intervals.moveObstacles = setInterval(() => {

            obstacleArr.forEach((obstacle) => {
                obstacle.moveLeft();
                if (player1.positionX < obstacle.positionX + obstacle.width &&
                    player1.positionX + player1.width > obstacle.positionX &&
                    player1.positionY < obstacle.topObsPositionY + obstacle.topObstacleHeight &&
                    player1.positionY + player1.height > obstacle.topObsPositionY

                ) {
                    gameover();
                } else if (
                    player1.positionX < obstacle.positionX + obstacle.width &&
                    player1.positionX + player1.width > obstacle.positionX &&
                    player1.positionY < obstacle.bottomObsPositionY + obstacle.bottomObstacleHeight &&
                    player1.positionY + player1.height > obstacle.bottomObsPositionY
                ) {
                    gameover();
                }
            })

        }, obstacle1.tickMs);

    }
}


function score(boolean) {
    if (boolean === false) {
        clearInterval(intervals.score)
    } else {
        intervals.score = setInterval(() => {
            obstacleArr.forEach((obstacle) => {

                if (player1.positionX + player1.width > obstacle.positionX + obstacle.width && obstacle.past === false) {
                    player1.score++;
                    player1.updateScore();
                    obstacle.past = true;
                }
            })
        },)
    }

}

let gameStarted = false;



function startEventListener(event) {

    if (event.code === 'Space' && gameStarted === false) {
        gameStarted = true;
        createObstacles(true);
        moveObstacles(true);
        score(true);
        scrollElm(true, mountain);
        scrollElm(true, clouds);
        scrollElm(true, bottomClouds);
        const startScreen = document.getElementById('start')
        startScreen.classList.add('hide');
    }

}

function startGame() {
    const startScreen = document.getElementById('start');
    const endScreen = document.getElementById('endscreen');
    endScreen.classList.add('hide');
    const restartButton = document.getElementById('restart');
    document.removeEventListener('keydown', startEventListener);
    document.addEventListener('keydown', startEventListener);
}

function gameover() {
    moveObstacles(false);
    createObstacles(false);
    score(false);
    scrollElm(false, mountain);
    scrollElm(false, clouds);
    scrollElm(false, bottomClouds);
    clearInterval(player1.jumpTimer);
    const endScreen = document.getElementById('endscreen');
    const restartButton = document.getElementById('restart');
    const changeDifficulty = document.getElementById('change-difficulty');
    endScreen.classList.remove('hide');

    document.removeEventListener('keydown', keyListner);
    changeDifficulty.onclick = (() => {
        location.href = './index.html'
    })
    restartButton.onclick = (() => {
        const startScreen = document.getElementById('start');
        startScreen.classList.remove('hide');
        player1.score = 0;
        player1.updateScore();
        player1.positionY = playerStartingPostition;
        player1.updateUI();
        document.addEventListener('keydown', keyListner)
        gameStarted = false;
        obstacleArr.forEach((obstacle) => {
            obstacle.topObstacleElm.remove();
            obstacle.bottomObstacleElm.remove();
        })
        obstacleArr.splice(0, obstacleArr.length);
        startGame()
    })
}

startGame()
