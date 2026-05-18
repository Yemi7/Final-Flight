console.log('hello world')
const player = document.getElementById('player');

class Player {
    constructor() {
        this.positionX = 200;
        this.positionY = 0;
        this.width = 40;
        this.height = 40;

        this.updateUI();
    }
    updateUI() {//values referenced and changed in this method
        const playerElm = document.getElementById("player")
        playerElm.style.left = this.positionX + "px"//or `${this.position}px`
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
        this.height = 500;
        this.positionX = 1000;
        this.positionY = Math.floor(Math.random() * (700 - this.height));

        this.obstacleElm = null;
        this.createDynamicElement();
        this.updateUI();
    }
    createDynamicElement() {
        this.obstacleElm = document.createElement('div');
        this.obstacleElm.className = ('obstacle');
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.obstacleElm);

    }
    updateUI() {
        this.obstacleElm.style.width = `${this.width}px`
        this.obstacleElm.style.height = `${this.height}px`
        this.obstacleElm.style.bottom = `${this.positionY}px`
        this.obstacleElm.style.left = `${this.positionX}px`
    }
    moveLeft() {
        this.positionX -= 10;
        this.updateUI()
    }

}


const obstacleArr = [];

const createObstaclesInterval = setInterval(() => {
    obstacleArr.push(new Obstacle);
}, 2500)



const moveObstaclesInterval = setInterval(() => {
    obstacleArr.forEach((obstacle) => {
        obstacle.moveLeft();

        if (player1.positionX < obstacle.positionX + obstacle.width &&
            player1.positionX + player1.width > obstacle.positionX &&
            player1.positionY < obstacle.positionY + obstacle.height &&
            player1.positionY + player1.height > obstacle.positionY
        ) {
            console.log('Gameover')
            clearInterval(moveObstaclesInterval);
            clearInterval(createObstaclesInterval);

        }
    })

}, 50); 
