function addCard(type, pos, hp = 1) {
    let newCard = createNewCard(type);
    newCard.hp = hp;
    field[pos] = newCard;
    drawRefreshField();
}
function testShuriken(hp = 1) {
    player.weapon = givePlayerWeapon('shuriken', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 3));
        }
    }
    // addCard('enemy', 'n', 1);
    // addCard('enemy', 's', 2);
    // addCard('enemy', 'e', 3);
    // addCard('enemy', 'w', 4);
}
function testNunchaku(hp = 1) {
    player.weapon = givePlayerWeapon('nunchaku', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 5));
        }
    }
}
function testCrossbow(hp = 1) {
    player.weapon = givePlayerWeapon('crossbow', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function testChest() {
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('chest', pos);
        }
    }
}
function testShotgun(hp = 1) {
    player.weapon = givePlayerWeapon('shotgun', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function testScythe(hp = 1) {
    player.weapon = givePlayerWeapon('scythe', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function testPoleaxe(hp = 1) {
    player.weapon = givePlayerWeapon('poleaxe', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function testTomahawk(hp = 1) {
    player.weapon = givePlayerWeapon('tomahawk', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function testFlamethrower(hp = 1) {
    player.weapon = givePlayerWeapon('flamethrower', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(5, 10));
        }
    }
}
function testShield(hp = 1) {
    player.weapon = givePlayerWeapon('shield', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}
function emptyField() {
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('gold', pos, 1);
        }
    }
}
function testMp5(hp = 1) {
    player.weapon = givePlayerWeapon('mp5', hp);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}