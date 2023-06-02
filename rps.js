// Rock Paper Scissors
// Javascript Implementation (part 2)
// Adam Koziorz

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";
const WIN_CONDITION = 5;
userWinCount = 0;         // Bad style to have mutable global variables, but good enough for
comWinCount = 0;          // the purpose of this program (this is DOM manipulation practice)
started = false;
ended = false;

// Create references to what we want to manipulate in the DOM
const buttons = document.querySelectorAll('button');
const resultdiv = document.querySelector('.results');


// Adds listeners to the button to allow for gameplay
function addButtonListeners() {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      playRound(button.id);
    });
  });
}
 

// Disables all of the buttons - used once the game ends
// (buttons are enabled by default)
function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}


// Returns the computer's choice (randomized)
function getComputerChoice() {
  return [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];
}


// Checks to see if the win conditions have been met
// If it has been met, we print the winner to the user and disable the buttons to indicate
// that the game has ended. Our logic is set up so that the user has to refresh the page to
// play another game, and it could be modified to remove this requirement
function checkWin() {
  if (userWinCount === WIN_CONDITION || comWinCount === WIN_CONDITION) {
    disableButtons();
    ended = true;
    if (userWinCount === WIN_CONDITION) {
      printMsg("You won the game :)");
    } else if (comWinCount === WIN_CONDITION) {
      printMsg("You lost the game :(");
    }
  }
}


// Returns a value indicating the result of the selections
// 0 - Draw, 1 - Win, 2 - Lose
function playRound(playerSelection) {
  const computerSelection = getComputerChoice();

  if (playerSelection === computerSelection) {
    printMsg("Draw!");
  } else if ((playerSelection === ROCK && computerSelection === SCISSORS) ||
             (playerSelection === PAPER && computerSelection === ROCK) ||
             (playerSelection === SCISSORS && computerSelection === PAPER)) {
    userWinCount++;
    printMsg("You win! " + playerSelection + " beats " + computerSelection + "!");
  } else {
    comWinCount++;
    printMsg("You lose! " + computerSelection + " beats " + playerSelection + "!");
  }
  printScore();
  checkWin();

  if (!started) {
    started = true;
  }
}


// Prints the result to the screen (as opposed to the console before)
function printMsg(message) {
  if (!started || ended) {
    const res = document.createElement('h3');
    res.classList.add("result");
    res.textContent = message;
    resultdiv.appendChild(res);
  } else {
    const res = document.querySelector('.result');
    res.textContent = message;
  }
}


// Prints the score of the game
function printScore() {
  if (!started) {
    const res = document.createElement('p');
    res.classList.add("score");
    res.textContent = `The score is now ${userWinCount}-${comWinCount} (U-C)`;
    resultdiv.appendChild(res);
  } else {
    const res = document.querySelector('.score');
    res.textContent = `The score is now ${userWinCount}-${comWinCount} (U-C)`;
  }
}


// These listeners serve as our "entry point" to the rest of the program
addButtonListeners();
