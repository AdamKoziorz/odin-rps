// Rock Paper Scissors
// Javascript Implementation (part 2)
// Adam Koziorz

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";
const WIN_CONDITION = 5;
USER_WIN_COUNT = 0;         // Bad style to have mutable global variables, but good enough for
COM_WIN_COUNT = 0;          // the purpose of this program (this is DOM manipulation practice)

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
  if (USER_WIN_COUNT === WIN_CONDITION) {
    printMsg("You won the game :)");
    disableButtons();
  } else if (COM_WIN_COUNT === WIN_CONDITION) {
    printMsg("You lost the game :(");
    disableButtons();
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
    USER_WIN_COUNT++;
    printMsg("You win! " + playerSelection + " beats " + computerSelection + "!");
  } else {
    COM_WIN_COUNT++;
    printMsg("You lose! " + computerSelection + " beats " + playerSelection + "!");
  }
  printScore();
  checkWin();
}


// Prints the result to the screen (as opposed to the console before)
function printMsg(message) {
  const res = document.createElement('h3');
  res.textContent = message;
  resultdiv.appendChild(res);
}


// Prints the score of the game
function printScore() {
  const res = document.createElement('p');
  res.textContent = `The score is now ${USER_WIN_COUNT}-${COM_WIN_COUNT} (U-C)`;
  resultdiv.appendChild(res);
}


// These listeners serve as our "entry point" to the rest of the program
addButtonListeners();
