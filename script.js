// function add() {
//     var box = document.getElementById('dicebox')
// box.innerHTML
// }
let players = [];

function generateFields() {
  let count = document.getElementById("players").value;
  let container = document.getElementById("playerNames");
  container.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    container.innerHTML += `
      <input type="text" id="name${i}" placeholder="Player ${i} Name" 
      class="form-control w-50 mx-auto mt-2" required>`;
  }
}

function startGame() {
  let count = document.getElementById("players").value;
  players = [];

  for (let i = 1; i <= count; i++) {
    let name = document.getElementById("name" + i).value || "Player " + i;
    players.push({ name: name, dice: 1 });
  }

  // Hide setup, show game
  document.getElementById("setupSection").style.display = "none";
  document.getElementById("gameSection").style.display = "block";

  // Build board
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  players.forEach((p, index) => {
    let div = document.createElement("div");
    div.className = "col-md-2 player-box text-center";
    div.id = "player" + index;
    div.innerHTML = `
      <h4>${p.name}</h4>
      <img src="dice1.png" class="dice-img" id="dice${index}">
    `;
    gameBoard.appendChild(div);
  });
}

function rollAllDice() {
  let sound = document.getElementById("diceSound");
  sound.currentTime = 0;
  sound.play();

  removeHighlights();
  let maxRoll = 0;
  let winners = [];

  players.forEach((p, i) => {
    let roll = Math.floor(Math.random() * 6) + 1;
    p.dice = roll;

    let diceImg = document.getElementById("dice" + i);
    diceImg.classList.add("shake");

    setTimeout(() => {
      diceImg.src = "dice" + roll + ".png";
      diceImg.classList.remove("shake");
    }, 500);

    if (roll > maxRoll) {
      maxRoll = roll;
      winners = [i];
    } else if (roll === maxRoll) {
      winners.push(i);
    }
  });

  setTimeout(() => {
    if (winners.length === 1) {
      document.getElementById("result").innerHTML = `🏆 ${players[winners[0]].name} Wins!`;
      document.getElementById("player" + winners[0]).classList.add("winner");
    } else {
      document.getElementById("result").innerHTML = "🤝 It's a Draw!";
      winners.forEach(i => document.getElementById("player" + i).classList.add("winner"));
    }
  }, 600);
}

function removeHighlights() {
  players.forEach((p, i) => {
    document.getElementById("player" + i).classList.remove("winner");
  });
}

function showSetup() {
  document.getElementById("gameSection").style.display = "none";
  document.getElementById("setupSection").style.display = "block";
  document.getElementById("playerNames").innerHTML = "";
  document.getElementById("players").value = "";
  document.getElementById("result").innerHTML = "Click Roll to Start!";
}
