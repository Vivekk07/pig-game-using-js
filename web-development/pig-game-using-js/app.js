/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  //random number
  var dice = Math.floor(Math.random() * 6) + 1;
  //display on dice img
  var diceImg = document.querySelector(".dice");
  diceImg.style.display = "block";
  diceImg.src = "dice-" + dice + ".png";
  //switch if 1
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //switch to another player
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  //store roundScore in score array for respective player
  scores[activePlayer] += roundScore;
  //display on frontend
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  //check winner
  if (scores[activePlayer] >= 20) {
    document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  //toggle active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //set roundScore to zero
  roundScore = 0;
  //set frontend values to zero
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //change active side in css
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //remove dice img
  document.querySelector(".dice").style.display = "none";
}
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
