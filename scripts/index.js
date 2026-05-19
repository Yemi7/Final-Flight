const player = document.getElementById('player');
const playerStartingPostition = 720 / 2 - 40;
// Player Properties
class Player {
    constructor() {
        this.positionX = 200;
        this.positionY = playerStartingPostition;
        this.width = 40;
        this.height = 40;
        this.acceleration = 2;
        this.tickMs = 40;

        this.updateUI();
    }
    updateUI() {
        const playerElm = document.getElementById("player")
        playerElm.style.left = this.positionX + "px"
        playerElm.style.bottom = this.positionY + "px"
        playerElm.style.width = this.width + "px"
        playerElm.style.height = this.height + "px"
    }
    jump() {
        this.velocity = 20;
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
                console.log('checking position ' + this.positionY)
            }
        }, this.tickMs)
    }

}


// Player Movement
const player1 = new Player();

function keyListner(event) {
    if (event.code === 'Space' && player1.positionY + player1.height <= boardHeight) {
        clearInterval(player1.jumpTimer)
        player1.jump();

    }
}

document.addEventListener('keydown', keyListner)



// Properties of the Board and Obstacle extremes
const obsMinHeight = 80;
const obstacleGap = 200;
const boardHeight = 720;
const boardWidth = 1000;

// Obstacle Properties
class Obstacle {
    constructor() {
        this.width = 80;
        this.topObstacleHeight = Math.floor(Math.random() * ((boardHeight - obstacleGap - obsMinHeight) + obsMinHeight));
        this.bottomObstacleHeight = boardHeight - this.topObstacleHeight - obstacleGap;
        this.positionX = boardWidth;
        this.topObsPositionY = boardHeight - this.topObstacleHeight;
        this.bottomObsPositionY = 0;
        this.topObstacleElm = null;
        this.bottomObstacleElm = null;
        this.createDynamicElement();
        this.updateUIUpp();
        this.updateUIDown();
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
        this.positionX -= 10;
        this.updateUIUpp();
        this.updateUIDown();
    }

}


// Obstacle Generation and Scrolling
const obstacleArr = [];

function createObstacles(boolean) {
    const createObstaclesInterval = setInterval(() => {
        obstacleArr.push(new Obstacle);
    }, 2000)
    if (boolean === false) {
        clearInterval(createObstaclesInterval)
    }
}

function moveObstacles(boolean) {
    const moveObstaclesInterval = setInterval(() => {
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

    }, 40);
    if (boolean === false) {
        clearInterval(moveObstaclesInterval)
    }

}



function startGame() {
    let gameStarted = false;
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && gameStarted === false) {
            gameStarted = true;
            createObstacles(true);
            moveObstacles(true);
            
        }
    })
}

function gameover() {
    moveObstacles(false);
    createObstacles(false);
    clearInterval(player1.jumpTimer);
    document.removeEventListener('keydown', keyListner);
    location.href = 'gameover.html'
}

startGame()