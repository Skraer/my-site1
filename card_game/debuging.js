function addCard(type, pos, hp = 1) {
    let newCard = createNewCard(type);
    newCard.hp = hp;
    field[pos] = newCard;
    drawRefreshField();
}
function testShuriken() {
    player.weapon = givePlayerWeapon('shuriken', 2);
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
function testNunchaku() {
    player.weapon = givePlayerWeapon('nunchaku', 5);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 5));
        }
    }
}
function testCrossbow() {
    player.weapon = givePlayerWeapon('crossbow', 4);
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
function testShotgun() {
    player.weapon = givePlayerWeapon('shotgun', 5);
    for (let pos in field) {
        if (field[pos].type != 'player') {
            addCard('enemy', pos, getRandomHp(1, 6));
        }
    }
}


