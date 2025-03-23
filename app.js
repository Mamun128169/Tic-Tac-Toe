// Variables
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game");
const messageContainer = document.querySelector(".msg-container");
const winnerPara = document.querySelector(".msg-container p");

let turnO = true; // true - playerO || false - playerX
let count = 0; // Track the number of moves

// Winner Patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Disabled Buttons
const disabledBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enables Buttons
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
};

// Show winner
const showWinner = (player) => {
  messageContainer.classList.remove("hide");
  winnerPara.innerText = `Congratulations! The Winner is: ${player}`;
};

// Reset Game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
};

// New Game
const newGame = () => {
  resetGame();
  messageContainer.classList.add("hide");
};

// Check Winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[a].innerText;
    let pos3Val = boxes[a].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner!", pos1Val);
        disabledBoxes();
        showWinner(pos1Val);
      }
    }
  }
};

// Game Logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#1668E3";
      turnO = !turnO;
    } else {
      box.innerText = "X";
      box.style.color = "#E31616";
      turnO = !turnO;
    }

    checkWinner();
    box.disabled = true;

    count++;
    // Check game tie or not
    if (count === 9) {
      alert(`The Game is Tied. Press "OK" to start!`);
      resetGame();
    }
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);
