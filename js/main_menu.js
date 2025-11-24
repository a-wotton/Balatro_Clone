const menuScore = document.querySelector('#menu-high-score');

function handleHighScore() {
    if(localStorage.getItem('goHighScore')) {
        menuScore.textContent = localStorage.getItem('goHighScore');
    }
}

window.addEventListener('load', handleHighScore);