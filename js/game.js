let storyText = document.getElementById("story-text");

let gameBtns = document.getElementById("game-btns");

let availableActions;

var room;

var busy = false;

function play() {
  room = world[[player.location_x, player.location_y]];

  let text = room.introText();
  if (player.isAlive() && !player.victory) {
    text += "<p>Choose an action</p>";
    availableActions = room.availableActions();

    let innerHTML = "";
    availableActions.forEach((action) => {
      innerHTML += `<button type="button" name="button" onclick="clickGameBtn('${action.name}')">${action.name}</button>`;
    });

    gameBtns.innerHTML = innerHTML;
  }

  room.modifyPlayer(player);

  if (player.victory) {
    alert("You Win!");
    gameBtns.innerHTML = "";
  }

  if (!busy) {
    render(text);
  }
}

function clickGameBtn(val) {
  busy = false;
  if (val === "Move east") {
    player.moveEast();
  } else if (val === "Move west") {
    player.moveWest();
  } else if (val === "Move north") {
    player.moveNorth();
  } else if (val === "Move south") {
    player.moveSouth();
  } else if (val === "View Inventory") {
    player.printInventory();
    busy = true;
  } else if (val === "Attack") {
    player.attack(room.enemy);
    busy = true;
  } else if (val === "Flee") {
    player.flee();
  }

  play();
}

function render(text) {
  storyText.innerHTML = text;
}

function addStoryText(text) {
  storyText.innerHTML += text;
}

play();
