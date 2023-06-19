class Item {
    constructor(name, description, value){
        this.name = name
        this.description = description
        this.value = value
        this.pickedUp = false
    }
}

class Gold extends Item {
    constructor(name, description, amt){
        super("Gold", "Gold currency used for trade.", amt)
        this.amt = amt
    }
}

class Weapon extends Item {
    constructor(name, description, value, damage){
        super(name, description, value)
        this.damage = damage
    }
}

class Rock extends Weapon {
    constructor(name, description, value, damage){
        super("Rock", "A decent rock for smashing things.", 0, 5)
    }
}

class Dagger extends Weapon {
    constructor(name, description, value, damage){
        super("Dagger", "A sharp dagger.", 3, 8)
    }
}