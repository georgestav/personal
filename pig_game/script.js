'use strict';
const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');
const p0Score = document.querySelector('#score--0');
const p1Score = document.querySelector('#score--1');

let currentScore = 0; //temporary holder used by both players
let activePlayer = 0;
let playing = true;
const scores = [0, 0];

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p0.classList.toggle('player--active');
  p1.classList.toggle('player--active');
}

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    //2. generate number
    let diceRoll = Math.floor(Math.random() * 6 + 1);
    //update the dice image
    document.querySelector('.dice').setAttribute('src', `dice-${diceRoll}.png`);
    if (diceRoll !== 1) {
      //add to the temporary counter the current score + the new diceroll
      currentScore += diceRoll;
      //3. display that number
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; //not working for player 2
    } else {
      // if the dice is 1 then switch player
      switchPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    //5. if its greater than one add the dice roll to the score
    //5.a. if user selects to hold the score then log the score and switch player back to 1
    //6. display the score and if score is greater or equal to 100 declare winner
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }

    p0Score.textContent = scores[0];
    p1Score.textContent = scores[1];
    switchPlayer();
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  //reset game
  //7. if user resets
  //7a. set scores to 0
  //7b. set player to 1
  //7c. go to step 1
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  p0.classList.add('player--active');
  p1.classList.remove('player--active');
  p0.classList.remove('player--winner');
  p1.classList.remove('player--winner');
  p0Score.textContent = scores[0];
  p1Score.textContent = scores[1];
});
