class Enemy {
  constructor(name, hp, damage) {
    this.name = name;
    this.hp = hp;
    this.damage = damage;
  }

  isAlive() {
    return this.hp > 0;
  }
}

class GiantSpider extends Enemy {
  constructor(name, hp, damage) {
    super("Giant Spider", 10, 2);
  }
}
