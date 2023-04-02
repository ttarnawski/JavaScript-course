'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// 1. Rzut kostką
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceScore = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${diceScore}.png`;

    if (diceScore !== 1) {
      currentScore += diceScore;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// 2. Oddanie tury
btnHold.addEventListener('click', function () {
  if (playing) {
    // Zmiana wyniku
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Wygrana
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
      dice.classList.add('hidden');
    } else {
      // Zmiana gracza
      switchPlayer();
    }
  }
});

// 3. Nowa gra
btnNew.addEventListener('click', init);
