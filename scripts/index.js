/* const startButton = document.getElementById('start')

startButton.onclick = (()=>{
    location.href = 'game.html'
}) */

document.getElementById('easy').onclick = () => {
    window.location.href = './game.html?level=easy';
}

document.getElementById('medium').onclick = () => {
    window.location.href = './game.html?level=medium';
}

document.getElementById('hard').onclick = () => {
    window.location.href = './game.html?level=hard';
}