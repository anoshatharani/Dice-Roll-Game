var players = []; // store players
// Unicode dice symbols
var diceSymbols = ["⚀","⚁","⚂","⚃","⚄","⚅"];

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

  for (var i = 0; i < players.length; i++) {
    var roll = Math.floor(Math.random() * 6) + 1;
    players[i].dice = roll;

    var diceDiv = document.getElementById("dice" + i);
    diceDiv.classList.add("shake");

    (function(index, value) {
      setTimeout(function() {
        diceDiv.textContent = diceSymbols[value - 1];
        diceDiv.classList.remove("shake");
      }, 500);
    })(i, roll);

    if (roll > maxRoll) {
      maxRoll = roll;
      winners = [i];
    } else if (roll === maxRoll) {
      winners.push(i);
    }
  }

  setTimeout(function() {
    for (var k = 0; k < players.length; k++) {
      document.getElementById("player" + k).classList.remove("winner");
    }

    if (winners.length === 1) {
      document.getElementById("result").innerHTML = "🏆 " + players[winners[0]].name + " Wins!";
      document.getElementById("player" + winners[0]).classList.add("winner");
    } else {
      document.getElementById("result").innerHTML = "🤝 It's a Draw!";
      for (var w = 0; w < winners.length; w++) {
        document.getElementById("player" + winners[w]).classList.add("winner");
      }
    }
  }, 600);
}

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
