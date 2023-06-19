map = [
  ["", "", "", "", ""],
  ["", "", "EmptyCavePath", "LeaveCaveRoom", ""],
  ["", "", "EmptyCavePath", "", ""],
  [
    "GiantSpiderRoom",
    "EmptyCavePath",
    "StartingRoom",
    "EmptyCavePath",
    "FindDaggerRoom",
  ],
  ["", "", "EmptyCavePath", "", ""],
];

var world = {};
var startPosition = [0, 0];

function loadTiles() {
  let row = map.length;
  let col = map[0].length;

  let y;
  for (y = 0; y < row; y++) {
    let x;
    for (x = 0; x < col; x++) {
      let tileName = map[y][x];

      let room;
      if (tileName === "StartingRoom") {
        startPosition[0] = x;
        startPosition[1] = y;
        room = new StartingRoom(x, y);
      } else if (tileName === "") {
        room = null;
      } else if (tileName === "EmptyCavePath") {
        room = new EmptyCavePath(x, y);
      } else if (tileName === "LeaveCaveRoom") {
        room = new LeaveCaveRoom(x, y);
      } else if (tileName === "FindDaggerRoom") {
        room = new FindDaggerRoom(x, y);
      } else if (tileName === "GiantSpiderRoom") {
        room = new GiantSpiderRoom(x, y);
        room.enemy = new GiantSpider();
      }
      world[[x, y]] = room;
    }
  }
}

function tileExists(x, y) {
  return world[[x, y]];
}

loadTiles();
