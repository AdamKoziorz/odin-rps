// Rock Paper Scissors
// Javascript Implementation
// Adam Koziorz

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";
const WIN_CONDITION = 5;


// Returns the computer's choice (randomized)
function getComputerChoice() {
  return [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];
}


// Return the user's choice after asking the user
function getPlayerChoice() {
  let userInput = prompt("Rock, Paper, or Scissors?");
  userInput = userInput ? userInput.trim().toLowerCase() : "";
  
  switch (userInput) {
    case "rock":
      return ROCK;
    case "paper":
      return PAPER;
    case "scissors":
      return SCISSORS;
    default:
      console.log("Invalid option. Defaulting to Rock...");
      return ROCK;
  }
}


// Returns a value indicating the result of the selections
// 0 - Draw, 1 - Win, 2 - Lose
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 0;
  } else if ((playerSelection === ROCK && computerSelection === SCISSORS) ||
             (playerSelection === PAPER && computerSelection === ROCK) ||
             (playerSelection === SCISSORS && computerSelection === PAPER)) {
    return 1;
  } else {
    return 2;
  }
}


// Initializes a game of Rock, Paper, Scissors
// We track the wins the player and computers both have, and call
// playRound() until one reaches five wins (thus ending the game
// with that person winning)
function game() {
  let playerCount = 0;
  let computerCount = 0;

  while (playerCount !== WIN_CONDITION && computerCount !== WIN_CONDITION) {
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    const retval = playRound(playerSelection, computerSelection);

    if (retval === 1) {
      playerCount++;
      console.log("You win! " + playerSelection + " beats " + computerSelection + "!");
    } else if (retval === 2) {
      computerCount++;
      console.log("You lose! " + computerSelection + " beats " + playerSelection + "!");
    } else {
      console.log("Draw!");
    }
  }

  if (playerCount === WIN_CONDITION) {
    console.log("You won the game :)");
  } else {
    console.log("You lost the game :(");
  }
}

game();
