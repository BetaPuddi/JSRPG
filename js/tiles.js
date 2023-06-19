class MapTile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  introText() {
    if (this.constructor === MapTile) {
      throw new TypeError(
        'Abstract class "MapTile" cannot be instantiated directly.'
      );
    }
  }

  modifyPlayer(player) {
    if (this.constructor === MapTile) {
      throw new TypeError(
        'Abstract class "MapTile" cannot be instantiated directly.'
      );
    }
  }

  adjacentMoves() {
    let moves = [];

    if (tileExists(this.x + 1, this.y)) {
      moves.push(new MoveEast());
    }
    if (tileExists(this.x - 1, this.y)) {
      moves.push(new MoveWest());
    }
    if (tileExists(this.x, this.y - 1)) {
      moves.push(new MoveNorth());
    }
    if (tileExists(this.x, this.y + 1)) {
      moves.push(new MoveSouth());
    }
    return moves;
  }

  availableActions() {
    let moves = this.adjacentMoves();
    moves.push(new ViewInventory());

    return moves;
  }
}

class EmptyCavePath extends MapTile {
  constructor(x, y) {
    super(x, y);
  }

  introText() {
    return "Another unremarkable part of the cave. You must keep moving";
  }

  modifyPlayer(player) {
    // this room does nothing to the player
  }
}

class LootRoom extends MapTile {
  constructor(x, y, item) {
    super(x, y);
    this.item = item;
  }

  addLoot(player) {
    player.inventory.push(this.item);
    this.item.pickedUp = true;
  }

  modifyPlayer(player) {
    if (!this.item.pickedUp) {
      this.addLoot(player);
    }
  }
}

class EnemyRoom extends MapTile {
  constructor(x, y, enemy) {
    super(x, y);
    this.enemy = enemy;
  }

  modifyPlayer(player) {
    if (this.enemy.isAlive()) {
      player.hp = player.hp - this.enemy.damage;
      let msg = `Enemy does ${this.enemy.damage} damage. You have ${player.hp} HP remaining.`;
      addStoryText(msg);
    }
  }

  availableActions() {
    if (this.enemy.isAlive()) {
      return [new Flee(), new Attack(this.enemy)];
    } else {
      return this.adjacentMoves();
    }
  }
}
