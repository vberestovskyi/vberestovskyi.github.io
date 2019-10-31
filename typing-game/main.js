window.addEventListener('load', init);

// Global
const levels = {
  easy: 10,
  medium: 7,
  hard: 4,
  insane: 2
};

let time = 20;
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

//Words
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //Get a word
  showWord(words);
  //Start matching an input and a word
  wordInput.addEventListener('input', startMatch)
  //Call a countdown
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkstatus, 100);
}

//Pick and show a random word
function showWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randomIndex];
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

//Reset after a successful attempt
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
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
function checkstatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game over :-(';
    score = -1;
  }
}