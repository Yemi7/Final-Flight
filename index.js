const player = document.getElementById('player');

class Player {
    constructor() {
        this.positionX = 200;
        this.positionY = 0;
        this.width = 40;
        this.height = 40;

        this.updateUI();
    }
    updateUI() {
        const playerElm = document.getElementById("player")
        playerElm.style.left = this.positionX + "px"
        playerElm.style.bottom = this.positionY + "px"
        playerElm.style.width = this.width + "px"
        playerElm.style.height = this.height + "px"
    }
    moveUp() {

        if (this.positionY < 720 - this.height) {
            this.positionY += 40;
            this.updateUI();
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY -= 40;
            this.updateUI()
        }
    }

}

const player1 = new Player();

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        player1.moveUp();
    }
    if (event.code === 'ArrowDown') {
        player1.moveDown();
    }
})

class Obstacle {
    constructor() {
        this.width = 80;
        this.topObstacleHeight = Math.floor(Math.random()* (520-100) + 80);
        this.bottomObstacleHeight = 720 - this.topObstacleHeight - 200;
        this.positionX = 1000;
        this.topObsPositionY = 720 -this.topObstacleHeight;
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




const obstacleArr = [];

const createObstaclesInterval = setInterval(() => {
    obstacleArr.push(new Obstacle);
}, 2000)



const moveObstaclesInterval = setInterval(() => {
    obstacleArr.forEach((obstacle) => {
        obstacle.moveLeft();
        if (player1.positionX < obstacle.positionX + obstacle.width &&
            player1.positionX + player1.width > obstacle.positionX &&
            player1.positionY < obstacle.topObsPositionY + obstacle.topObstacleHeight &&
            player1.positionY + player1.height > obstacle.topObsPositionY
            
        ) {
            clearInterval(moveObstaclesInterval);
            clearInterval(createObstaclesInterval);
            location.href = 'gameover.html'
        } else if(
            player1.positionX < obstacle.positionX + obstacle.width &&
            player1.positionX + player1.width > obstacle.positionX &&
            player1.positionY < obstacle.bottomObsPositionY + obstacle.bottomObstacleHeight &&
            player1.positionY + player1.height > obstacle.bottomObsPositionY
        ){
            clearInterval(moveObstaclesInterval);
            clearInterval(createObstaclesInterval);
            location.href = 'gameover.html'
        }
    })

}, 40); 
