function loadArray() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

const gameField = document.querySelector('.game__field');
function displayItems(items) {
  gameField.innerHTML = items.map((item) => createString(item)).join('');
}

function createString(item) {
  return `
    <img src="${item.image}" type="${item.type}" />
  `;
}

loadArray().then((items) => onClickBtn(items));

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop_up__message');
const refreshBtn = document.querySelector('.pop-up__refresh');

// Start from 10 seconds


function onClickBtn(items) {
  gameBtn.addEventListener('click', () => {
    // Placed Randomly
    displayItems(items);
    timerWork();

    function timerWork() {
      let sec = 10;
      let score = 9;
      gameScore.innerHTML = `${score}`;

      const num = setInterval(() => {
        gameTimer.innerHTML = `00:${sec}`;
        sec--;

        gameField.addEventListener('click', (e) => {
          const value = e.target.attributes.type.value;

          // If you click a carrot
          if (score && value === 'carrot') {
            score--;
            gameScore.innerHTML = `${score}`;
            e.target.remove();
          }
          // If you click a bug (game over)
          if (value === 'bug') {
            clearInterval(num);
            popUp.classList.remove('pop-up--hidden');
            popUpMessage.textContent = 'You loose! 😢';
          }
        });
        // Time out
        if (score && sec < 0) {
          clearInterval(num);
          gameTimer.innerHTML = '00:00';
          popUp.classList.remove('pop-up--hidden');
          popUpMessage.textContent = 'Time Over ⏰';
        }
        // If you click all carrots in the given time
        if (!score && sec) {
          clearInterval(num);
          popUp.classList.remove('pop-up-hidden');
          popUpMessage.textContent = 'You Win!! 🎉';
        }

        refreshBtn.addEventListener('click', () => {
          popUp.classList.add('pop-up--hidden');
          loadArray()
            .then((items) => displayItems(items))
            .then(timerWork());
        });
      }, 1000);
    }
  });
}
