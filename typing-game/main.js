window.addEventListener('load', init);

// Global
const levels = {
  easy: 60,
  medium: 10,
  hard: 5,
  insane: 2
};

let time = levels.easy;
let score = 0;
let isPlaying;
let currentLevel = levels.easy;



// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const difficulty = document.querySelector('#difficulty');
const restart = document.querySelector('#restart');

//Words
let wordsData = function () {
  fetch(`https://wordsapiv1.p.mashape.com/words/?random=true`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "62a953bef2mshd5aacbc5c475450p177267jsn352eb2f97ede",
    }
  })
    .then(response => {
      return response.json();
    })
    .then((data) => {
      currentWord.innerHTML = data.word.split(' ')[0];
    })
    .catch(err => {
      console.log(err);
    });
}


// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //Get a word
  wordsData();
  //Start matching an input and a word
  wordInput.addEventListener('input', startMatch)
  //Call a countdown
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 100);
  //Check difficulty level
  difficulty.addEventListener('click', changeDifficulty);
  //Listening to restart game
  restart.addEventListener('click', restartGame);
}

//Countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
    message.innerHTML = 'Game over :-(';
  }
  timeDisplay.innerHTML = time;
}

//Matching user input and a target word
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    wordsData();
    wordInput.value = '';
    score++;
  };
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }

}

//Match a user input and a target word 
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!'
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

//Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    wordInput.setAttribute('disabled', 'disabled');
    message.innerHTML = 'Game over :-(';
    score = -1;
  }
}

//Change difficulty
function changeDifficulty(event) {
  currentLevel = levels[event.target.innerText];
  seconds.innerHTML = currentLevel;
  restartGame();
}

//Restart Game
function restartGame() {
  //get a new word 
  wordsData();
  //reset time
  time = currentLevel + 1;
  //reset score
  score = 0;
  scoreDisplay.innerHTML = 0;
  //change message
  message.innerHTML = '';
  wordInput.removeAttribute('disabled');
  wordInput.value = '';
} 