const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop_up__message');
const refreshBtn = document.querySelector('.pop-up__refresh');

// Start from 10 seconds
let sec = 10;
let score = 9;

gameBtn.addEventListener('click', () => {
  const num = setInterval(() => {
    gameTimer.innerHTML = `00:${sec}`;
    sec--;
Ca
    // If you click a carrot
    // carrot.addEventListener('click', () => gameScore.innerHTML = `${--score}`);
    
    // If you click a bug
    // bug.addEventListener('click', () => {
        // clearInterval(num);
        // popUp.classList.remove(pop-up--hidden);
        // popUpMessage.textContent = `You loose!`});

    // If you dnt click all carrots in the given time
    // if (score && sec < 0) {
        // clearInterval(num);
        // popUp.classList.remove(pop-up--hidden);
        // popUpMessage.textContent = `You loose!`;
    // }

    // If you all carrots in the given time
    // if (sec && !score) {
        // clearInterval(num);
        // popUp.classList.remove(pop-up--hiddin);
        // popUpMessage.textContent = `You win!`;
    // }

    if (sec < 0) {
      clearInterval(num);
      gameTimer.innerHTML = '00:00';
    }
  }, 1000);
});
