let score1 = 0;
let score2 = 0;
let draws = 0;

function rollDice() {
  const num1 = Math.floor(Math.random() * 6) + 1;
  const num2 = Math.floor(Math.random() * 6) + 1;

  const d1 = document.getElementById("dice1");
  const d2 = document.getElementById("dice2");
  const result = document.getElementById("result");

  d1.classList.remove("winner");
  d2.classList.remove("winner");
  d1.classList.add("rolling");
  d2.classList.add("rolling");

  setTimeout(() => {
    d1.src = `images/dice${num1}.png`;
    d2.src = `images/dice${num2}.png`;
    d1.classList.remove("rolling");
    d2.classList.remove("rolling");

    if (num1 > num2) {
      score1++;
      result.textContent = "Player 1 Wins! 🎉";
      result.className = "win-p1";
      d1.classList.add("winner");
    } else if (num2 > num1) {
      score2++;
      result.textContent = "Player 2 Wins! 🎉";
      result.className = "win-p2";
      d2.classList.add("winner");
    } else {
      draws++;
      result.textContent = "It's a Draw! 🤝";
      result.className = "draw";
    }

    document.getElementById("score1").textContent = score1;
    document.getElementById("score2").textContent = score2;
    document.getElementById("draws").textContent = draws;
  }, 350);
}

function resetScores() {
  score1 = 0;
  score2 = 0;
  draws = 0;
  document.getElementById("score1").textContent = 0;
  document.getElementById("score2").textContent = 0;
  document.getElementById("draws").textContent = 0;

  const result = document.getElementById("result");
  result.textContent = "Roll the Dice!";
  result.className = "";

  document.getElementById("dice1").classList.remove("winner");
  document.getElementById("dice2").classList.remove("winner");
}
