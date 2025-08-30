var players = []; // store players
var diceSymbols = ["⚀","⚁","⚂","⚃","⚄","⚅"]; // Unicode dice

function makePlayerInputs() {
  var count = document.getElementById("playersCount").value;
  var container = document.getElementById("playerInputs");
  container.innerHTML = "";
  for (var i = 1; i <= count; i++) {
    container.innerHTML +=
      '<input type="text" id="p' + i + '" placeholder="Player ' + i + ' Name" class="form-control w-50 mx-auto mt-2">';
  }
}

function startGame() {
  var count = document.getElementById("playersCount").value;
  players = [];
  for (var i = 1; i <= count; i++) {
    var name = document.getElementById("p" + i).value;
    if (name === "") {
      name = "Player " + i;
    }
    players.push({ name: name, dice: 1 });
  }

  document.getElementById("setupSection").style.display = "none";
  document.getElementById("gameSection").style.display = "block";

  var board = document.getElementById("board");
  board.innerHTML = "";
  for (var j = 0; j < players.length; j++) {
    board.innerHTML +=
      '<div class="col-md-3 player-box text-center" id="player' + j + '">' +
      "<h4>" + players[j].name + "</h4>" +
      '<div class="dice-symbol" id="dice' + j + '">⚀</div>' +
      "</div>";
  }
}

function rollDice() {
  document.getElementById("diceSound").play(); // play sound
  var maxRoll = 0;
  var winners = [];

  players.forEach((player, i) => {
    let roll = Math.floor(Math.random() * 6) + 1;
    player.dice = roll;

    let diceDiv = document.getElementById("dice" + i);
    diceDiv.classList.add("shake");
    diceDiv.textContent = "🎲"; // temporary while shaking

    setTimeout(() => {
      diceDiv.textContent = diceSymbols[roll - 1]; // show rolled value
      diceDiv.classList.remove("shake");

      if (roll > maxRoll) {
        maxRoll = roll;
        winners = [i];
      } else if (roll === maxRoll) {
        winners.push(i);
      }

      // ✅ after last dice update → decide winner
      if (i === players.length - 1) {
        setTimeout(() => {
          players.forEach((_, k) => {
            document.getElementById("player" + k).classList.remove("winner");
          });

          if (winners.length === 1) {
            document.getElementById("result").innerHTML =
              "🏆 " + players[winners[0]].name + " Wins!";
            document.getElementById("player" + winners[0]).classList.add("winner");
          } else {
            document.getElementById("result").innerHTML = "🤝 It's a Draw!";
            winners.forEach(w => {
              document.getElementById("player" + w).classList.add("winner");
            });
          }
        }, 200);
      }
    }, 500);
  });
}

    // 🎲 roll current player's dice
    let roll = Math.floor(Math.random() * 6) + 1;
    players[i].dice = roll;

    let diceDiv = document.getElementById("dice" + i);
    diceDiv.classList.add("shake");
    diceDiv.textContent = "🎲"; // temporary symbol while shaking

    setTimeout(() => {
      diceDiv.textContent = diceSymbols[roll - 1]; // show rolled value
      diceDiv.classList.remove("shake");

      if (roll > maxRoll) {
        maxRoll = roll;
        winners = [i];
      } else if (roll === maxRoll) {
        winners.push(i);
      }

      i++;
      setTimeout(rollNext, 600); // roll next player after delay
    }, 700);
  

  rollNext(); // start first roll


function restartGame() {
  document.getElementById("gameSection").style.display = "none";
  document.getElementById("setupSection").style.display = "block";
  document.getElementById("playerInputs").innerHTML = "";
  document.getElementById("playersCount").value = "";
  document.getElementById("result").innerHTML = "Click Roll to Start!";
}

function backToHome() {
  restartGame();
}
