var randomNumber1 = Math.floor(Math.random() * 6) + 1;

var imageadd1 = "/images/dice" + randomNumber1 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", imageadd1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var imageadd2 = "/images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", imageadd2);

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").textContent = "Player 1 wins!";
  document.querySelector("h1").style.color = "red";
} else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").textContent = "Player 2 wins!";
  document.querySelector("h1").style.color = "Blue";
} else {
  document.querySelector("h1").textContent = "It's a draw!";
  document.querySelector("h1").style.color = "White";
}
