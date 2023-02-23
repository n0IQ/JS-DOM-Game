'use strict';

// DOM Elements

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = 1;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

//Switch Player
const switchPlayer = () => {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer ^= 1; // switch player

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold the Score
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Reset Game
btnNew.addEventListener('click', init);
