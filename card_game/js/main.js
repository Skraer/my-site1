let canvas = document.getElementById('canvas');
// let tablo = document.getElementById('tablo');
let ctx = canvas.getContext('2d');
// let ctx2 = tablo.getContext('2d');

let rule = 'Вы можете ходить только вверх, вниз, влево и вправо!';
window.moveLeftInterval = '';
window.moveLeftInterval2 = '';
//картинки начало
    //player
let playerImg = new Image();
playerImg.src = 'img/card_skins/player/player.png';
    //enemy
let alienBugImg = new Image();
alienBugImg.src = 'img/card_skins/enemy/alienbug.png';
let beehiveImg = new Image();
beehiveImg.src = 'img/card_skins/enemy/beehive.png';
let bowmanImg = new Image();
bowmanImg.src = 'img/card_skins/enemy/bowman.png';
    //weapon
let batImg = new Image();
batImg.src = 'img/card_skins/weapon/bat.png';
let boomerangImg = new Image();
boomerangImg.src = 'img/card_skins/weapon/boomerang.png';
let bowImg = new Image();
bowImg.src = 'img/card_skins/weapon/bow.png';
    //heal
let heal1Img = new Image();
heal1Img.src = 'img/card_skins/heal/heal1.png';
let heal2Img = new Image();
heal2Img.src = 'img/card_skins/heal/heal2.png';
let heal3Img = new Image();
heal3Img.src = 'img/card_skins/heal/heal3.png';
    //trap
    //bonus
    //gold
let goldImg = new Image();
goldImg.src = 'img/card_skins/gold/gold.png';
let diamondImg = new Image();
diamondImg.src = 'img/card_skins/gold/diamond.png';

//картинки конец

//ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ОБЪЕКТОВ НАЧАЛО
const specials = {
    //burn
    //poison
    // poison: ,
    poison: function(target) {
        if (target.type == 'player') {
            target.debuff = 'poison';
        }
    },
}
const difficultyLevels = {
    easy: 0,
    normal: 150,
    hard: 300,
    maximum: 600,
}

const cardPos = {
    nw      : [10, 10, 153, 186],
    n       : [173, 10, 153, 186],
    ne      : [336, 10, 153, 186],
    w       : [10, 206, 153, 186],
    center  : [173, 206, 153, 186],
    e       : [336, 206, 153, 186],
    sw      : [10, 402, 153, 186],
    s       : [173, 402, 153, 186],
    se      : [336, 402, 153, 186],
}
const cardPosOutside = {
    //clockwise
    //top
    nnw     : [10, -196, 153, 186],
    nnw     : [173, -196, 153, 186],
    nne     : [336, -196, 153, 186],
    //right
    nee     : [509, 10, 153, 186],
    ee      : [509, 206, 153, 186],
    see     : [509, 402, 153, 186],
    //bottom
    sse     : [336, 608, 153, 186],
    ss      : [173, 608, 153, 186],
    ssw     : [10, 608, 153, 186],
    //left
    sww     : [-163, 402, 153, 186],
    ww      : [-163, 206, 153, 186],
    nww     : [-163, 10, 153, 186],
}
function getImgCoords(pos) {
    switch (pos) {
        case 'nw':
            return [36, 80];
        case 'n':
            return [200, 80];
        case 'ne':
            return [362, 80];
        case 'w':
            return [36, 280];
        case 'center':
            return [200, 280];
        case 'e':
            return [362, 280];
        case 'sw':
            return [36, 480];
        case 's':
            return [200, 480];
        case 'se':
            return [362, 480];
    }
}
function getWeaponImgCoords(pos) {
    if (pos == 'nw') {
        return [12, 94];
    } else if (pos == 'n') {
        return [175, 94];
    } else if (pos == 'ne') {
        return [338, 94];
    } else if (pos == 'w') {
        return [12, 290];
    } else if (pos == 'center') {
        return [175, 290];
    } else if (pos == 'e') {
        return [338, 290];
    } else if (pos == 'sw') {
        return [12, 486];
    } else if (pos == 's') {
        return [175, 486];
    } else if (pos == 'se') {
        return [338, 486];
    }
}
function getHpInfoCoords(pos) {
    switch (pos) {
        case 'nw':
            return [127,39];
        case 'n':
            return [290,39];
        case 'ne':
            return [453,39];
        case 'w':
            return [127, 235];
        case 'center':
            return [290, 235];
        case 'e':
            return [453, 235];
        case 'sw':
            return [127, 431];
        case 's':
            return [290, 431];
        case 'se':
            return [453, 431];
    }
}
function getWeaponDamageInfoCoords(pos) {
    if (pos == 'nw') {
        return [17, 184];
    } else if (pos == 'n') {
        return [180, 184];
    } else if (pos == 'ne') {
        return [343, 184];
    } else if (pos == 'w') {
        return [17, 380];
    } else if (pos == 'center') {
        return [180, 380];
    } else if (pos == 'e') {
        return [343, 380];
    } else if (pos == 'sw') {
        return [17, 576];
    } else if (pos == 's') {
        return [180, 576];
    } else if (pos == 'se') {
        return [343, 576];
    }
}
function getRandomHp(min, max) {
    let hp = Math.floor(Math.random() * max) + min;
    return hp;
}

// function randomEnemyHp(min, max) {

// }

const chestDefault = {
    goodChest: {
        type: 'chest',
        hp: '',
        name: 'good chest',
        skin: null,
        position: null,
        changeCoord: 1,
    },
    badChest: {
        type: 'chest',
        hp: '',
        name: 'bad chest',
        skin: null,
        position: null,
        changeCoord: 1,
    },
}
const weaponDefault = {
    bat: {
        type: 'weapon',
        name: 'bat',
        hp: 1,
        hpMinMax: [1, 7],
        gold: 1,
        special: null,
        area: 'forward',
        skin: batImg,
        position: null,
        changeCoord: 1,
    },
    boomerang: {
        type: 'weapon',
        name: 'boomerang',
        hp: 1,
        hpMinMax: [1, 6],
        gold: 1,
        special: null,
        area: 'forward',
        skin: boomerangImg,
        position: null,
        changeCoord: 1,
    },
    bow: {
        type: 'weapon',
        name: 'bow',
        hp: 1,
        hpMinMax: [1, 9],
        gold: 1,
        special: null,
        area: 'any',
        skin: bowImg,
        position: null,
        changeCoord: 1,
    },
}
let weaponArr = [];
for (let key in weaponDefault) {
    weaponArr.push(weaponDefault[key]);
}
let weaponAreas = ['forward', 'any', 'all', 'both'];


const enemyDefault = {
    alienbug: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 10],
        gold: 1,
        special: null,
        difficulty: 1,
        skin: alienBugImg,
        position: null,
        changeCoord: 1,
    },
    beehive: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 10],
        gold: 1,
        special: null,
        difficulty: 1,
        skin: beehiveImg,
        position: null,
        changeCoord: 1,
    },
    bowman: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 10],
        gold: 1,
        special: null,
        difficulty: 1,
        skin: bowmanImg,
        position: null,
        changeCoord: 1,
    },
}
let enemyArr = [];
for (let key in enemyDefault) {
    enemyArr.push(enemyDefault[key]);
}

const healDefault = {
    heal1: {
        type: 'heal',
        hp: 2,
        hpMinMax: [1, 7],
        gold: 1,
        skin: heal1Img,
        position: null,
        changeCoord: 1,
    },
    heal2: {
        type: 'heal',
        hp: 3,
        hpMinMax: [1, 7],
        gold: 1,
        skin: heal2Img,
        position: null,
        changeCoord: 1,
    }
}
let healArr = [];
for (let key in healDefault) {
    healArr.push(healDefault[key]);
}

const goldDeafault = {
    gold: {
        type: 'gold',
        hp: 1,
        hpMinMax: [1, 5],
        skin: goldImg,
        position: null,
        changeCoord: 1,
    },
    diamond: {
        type: 'gold',
        hp: 1,
        hpMinMax: [1, 5],
        skin: diamondImg,
        position: null,
        changeCoord: 1,
    }
}
let goldArr = [];
for (let key in goldDeafault) {
    goldArr.push(goldDeafault[key]);
}

let cardsArr = [weaponArr, enemyArr, healArr, goldArr];

function givePlayerWeapon(weapon, hp = 1) {
    let newWeapon = {};
    Object.assign(newWeapon, weaponDefault[weapon]);
    newWeapon.hp = [hp];
    return newWeapon;
}
const playerDefault = {
    type        : 'player',
    hp          : 10,
    maxhp       : 10,
    weapon      : givePlayerWeapon('bow', 10),
    special     : null,
    skin        : playerImg,
    position    : 'center',
    changeCoord : 1,
    gold        : 0,
    debuff      : null,
    stats       : {
        gameDifficulty: 1,
        difficultyUp: function() {
            this.gameDifficulty++;
            console.log(this.gameDifficulty);
            
        },
    },
}

//ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ОБЪЕКТОВ КОНЕЦ


//МЕХАНИКА ИГРЫ НАЧАЛО
let player = {};
let field = {
    nw: null,
    n: null,
    ne: null,
    w: null,
    center: null,
    e: null,
    sw: null,
    s: null,
    se: null
};
function createNewPlayer() {
    Object.assign(player, playerDefault);
}
function createNewField() {
    field.center = player;
    for (let key in field) {
        if (field[key] == null) {
            // let newCard = {};
            // let newCardType = cardsArr[Math.floor(Math.random() * cardsArr.length)];
            // console.log(newCardType);
            
            // Object.assign(newCard, newCardType[Math.floor(Math.random() * newCardType.length)]);
            // field[key] = newCard;
            field[key] = createNewCard('random');

        }
    }
}
function createNewCard(type) {
    let newCard = {};
    switch (type) {
        case 'random':
            let randomType = cardsArr[Math.floor(Math.random() * cardsArr.length)];
            Object.assign(newCard, randomType[Math.floor(Math.random() * randomType.length)]);
            break;
        case 'weapon':
            Object.assign(newCard, cardsArr[0][Math.floor(Math.random() * cardsArr[0].length)]);
            break;
        case 'enemy':
            Object.assign(newCard, cardsArr[1][Math.floor(Math.random() * cardsArr[1].length)]);
            console.log(newCard);
            break;
        case 'heal':
            Object.assign(newCard, cardsArr[2][Math.floor(Math.random() * cardsArr[2].length)]);
            break;
        case 'gold':
            Object.assign(newCard, cardsArr[3][Math.floor(Math.random() * cardsArr[3].length)]);
            break;
    }
    if (newCard.type == 'weapon' || newCard.type == 'enemy' || newCard.type == 'heal' || newCard.type == 'gold') {
        newCard.hp = getRandomHp(newCard.hpMinMax[0], newCard.hpMinMax[1])
    }
    if (newCard.type == 'enemy') {
        newCard.gold = newCard.hp;
    }
    return newCard;
}
function startGame() {
    createNewPlayer();
    createNewField();
    canvas.addEventListener('click', movePlayer);
    // canvas.addEventListener('click', drawRefreshField);
}
function debuffPlayerStep() {
    if (player.debuff == 'poison') {
        player.hp--;
    }
}
function takeOneStep() {
    player.stats.difficultyUp();
    // drawRefreshField();
    debuffPlayerStep();
}
// function deletePlayerWeapon() {
//     player.weapon = null;
// }
function useEnemySpecial(target) {

}
function checkPlayerWeapon() {
    if (player.weapon != null && player.weapon.hp <= 0 ) {
        player.weapon = null;
        console.log('Оружие сломалось');
        // deletePlayerWeapon();
    } else if (player.weapon == null) {
        return 'forward';
    }
}

function chooseAttackEnemyArea(pos, from, area = 'forward') {
    switch (area) {
        case 'forward':
            if (player.weapon != null) {
                if (player.weapon.hp > field[pos].hp) {
                    player.weapon.hp -= field[pos].hp;
                    field[pos].hp = 0;
                } else {
                    field[pos].hp -= player.weapon.hp;
                    player.weapon.hp = 0;

                }
            } else if (player.weapon == null) {
                if (player.hp > field[pos].hp) {
                    player.hp -= field[pos].hp;
                    field[pos].hp = 0;
                    field[pos] = player;
                    field[from] = null;
                } else {
                    field[pos].hp -= player.hp;
                    player.hp = 0;
                }
            }
            break;
        case 'any':
            if (player.weapon != null) {
                if (player.weapon.hp > field[pos].hp) {
                    player.weapon.hp -= field[pos].hp;
                    field[pos].hp = 0;
                } else {
                    field[pos].hp -= player.weapon.hp;
                    player.weapon.hp = 0;
                }
            } else if (player.weapon == null) {
                chooseAttackEnemyArea(pos, from, 'forward');
                break;
            }
            break;
        default:
            break;
    }
    if (field[pos].special != null) {
        useEnemySpecial();
    }
    // player.stats.difficultyUp();
    // drawRefreshField();
    takeOneStep();
}
// function attackEnemy(pos, from) {
//     if (player.weapon != null) {
//         if (player.weapon.hp > field[pos].hp) {
//             player.weapon.hp -= field[pos].hp;
//             field[pos].hp = 0;
//         } else {
//             field[pos].hp -= player.weapon.hp;
//             player.weapon.hp = 0;
//         }
//     } else if (player.weapon == null) {
//         if (player.hp > field[pos].hp) {
//             player.hp -= field[pos].hp;
//             field[pos].hp = 0;
//             field[pos] = player;
//             field[from] = null;
//         } else {
//             field[pos].hp -= player.hp;
//             player.hp = 0;
//         }
//     }
//     drawRefreshField();
// }
function killEnemy(pos) {
    let gold = field[pos].gold;
    field[pos] = null;
    field[pos] = createNewCard('gold');
    field[pos].hp = gold;
}
function pressWeaponCard(pos, from) {
    player.weapon = null;
    // deletePlayerWeapon();
    player.weapon = givePlayerWeapon(field[pos].name, field[pos].hp);
    console.log(`Вы подобрали оружие: ${field[pos].name}`);

    field[pos] = player;
    field[from] = null;
    // player.stats.difficultyUp();

    // field[from] = createNewCard('random');
    // drawRefreshField();
    takeOneStep();
}
function pressHealCard(pos, from) {
    player.hp += field[pos].hp;
    if (player.hp > playerDefault.hp) {
        player.hp = playerDefault.hp;
    }
    console.log(`Вы восстановили ${field[pos].hp} здоровья`);
    field[pos] = player;
    field[from] = null;
    // player.stats.difficultyUp();
    // field[from] = createNewCard('random');
    // drawRefreshField();
    takeOneStep();
}
function takeGold(pos, from) {
    player.gold += field[pos].hp;
    console.log('Золото: ' + player.gold);

    field[pos] = player;

    field[from] = null;
    // player.stats.difficultyUp();

    // field[from] = createNewCard('random');
    // drawRefreshField();
    takeOneStep();
}
function cardShift(posFrom, pos) {
    // beforeDrawingMove();

    if (field[pos].type != 'enemy' || player.weapon == null) {
        switch (posFrom) {
            case 'nw':
                if (pos == 'n') {
                    field[posFrom] = field['w'];
                    field['w'] = field['sw'];
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'nw', 'w');
                    window.moveLeftInterval2 = setInterval(drawMoveCardTop, 10, 'w', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 'w') {
                    field[posFrom] = field['n'];
                    field['n'] = field['ne'];
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'nw', 'n');
                    field['ne'] = createNewCard('random');
                }
                break;
            case 'n':
                if (pos == 'ne' || pos == 'center') {
                    field[posFrom] = field['nw'];
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'n', 'nw');
                    field['nw'] = createNewCard('random');
                } else if (pos == 'nw') {
                    field[posFrom] = field['ne'];
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'n', 'ne');
                    field['ne'] = createNewCard('random');
                }
                break;
            case 'ne':
                if (pos == 'n') {
                    field[posFrom] = field['e'];
                    field['e'] = field['se'];
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'ne', 'e');
                    window.moveLeftInterval2 = setInterval(drawMoveCardTop, 10, 'e', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 'e') {
                    field[posFrom] = field['n'];
                    field['n'] = field['nw'];
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'ne', 'n');
                    window.moveLeftInterval2 = setInterval(drawMoveCardRight, 10, 'n', 'nw');

                    field['nw'] = createNewCard('random');
                }
                break;
            case 'w':
                if (pos == 'nw' || pos == 'center') {
                    field[posFrom] = field['sw'];
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'w', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 'sw') {
                    field[posFrom] = field['nw'];
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'w', 'nw');
                    field['nw'] = createNewCard('random');
                }
                break;
            case 'center':
                if (pos == 'n') {
                    field[posFrom] = field['s'];
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'center', 's');
                    field['s'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['n'];
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'center', 'n');
                    field['n'] = createNewCard('random');
                } else if (pos == 'w') {
                    field[posFrom] = field['e'];
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'center', 'e');
                    field['e'] = createNewCard('random');
                } else if (pos == 'e') {
                    field[posFrom] = field['w'];
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'center', 'w');
                    field['w'] = createNewCard('random');
                }
                break;
            case 'e':
                if (pos == 'center' || pos == 'se') {
                    field[posFrom] = field['ne'];
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'e', 'ne');
                    field['ne'] = createNewCard('random');
                } else if (pos == 'ne') {
                    field[posFrom] = field['se'];
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'e', 'se');
                    field['se'] = createNewCard('random');
                }
                break;
            case 'sw':
                if (pos == 'w') {
                    field[posFrom] = field['s'];
                    field['s'] = field['se'];
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'sw', 's');
                    window.moveLeftInterval2 = setInterval(drawMoveCardLeft, 10, 's', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['w'];
                    field['w'] = field['nw'];
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'sw', 'w');
                    window.moveLeftInterval2 = setInterval(drawMoveCardBottom, 10, 'w', 'nw');
                    field['nw'] = createNewCard('random');
                }
                break;
            case 's':
                if (pos == 'center' || pos == 'sw') {
                    field[posFrom] = field['se'];
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 's', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 'se') {
                    field[posFrom] = field['sw'];
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 's', 'sw');
                    field['sw'] = createNewCard('random');
                }
                break;
            case 'se':
                if (pos == 'e') {
                    field[posFrom] = field['s'];
                    field['s'] = field['sw'];
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'se', 's');
                    window.moveLeftInterval2 = setInterval(drawMoveCardRight, 10, 's', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['e'];
                    field['e'] = field['ne'];
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'se', 'e');
                    window.moveLeftInterval2 = setInterval(drawMoveCardBottom, 10, 'e', 'ne');
                    field['ne'] = createNewCard('random');
                }
                break;
        
            default:
                break;
        }
    }
    if (field[pos].type == 'enemy' && field[pos].hp <= 0) {
        killEnemy(pos);
    }
    checkPlayerWeapon();
    drawRefreshField();
}

    //ДВИЖЕНИЯ ИГРОКА ИЗ ПОЗИЦИИ НАЧАЛО
function moveFromNW(e) {
    let posFrom = 'nw';
    let arr = ['n', 'w'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                // checkPlayerWeapon();
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromN(e) {
    let posFrom = 'n';
    let arr = ['nw', 'ne', 'center'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromNE(e) {
    let posFrom = 'ne';
    let arr = ['n', 'e'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromW(e) {
    let posFrom = 'w';
    let arr = ['nw', 'sw', 'center'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromCenter(e) {
    let posFrom = 'center';
    let arr = ['n', 's', 'w', 'e'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromE(e) {
    let posFrom = 'e';
    let arr = ['ne', 'se', 'center'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromSW(e) {
    let posFrom = 'sw';
    let arr = ['s', 'w'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromS(e) {
    let posFrom = 's';
    let arr = ['sw', 'se', 'center'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
function moveFromSE(e) {
    let posFrom = 'se';
    let arr = ['s', 'e'];
    let pos = checkClickPosition(e.offsetX, e.offsetY);
    if (arr.includes(pos)) {
        switch (field[pos].type) {
            case 'weapon':
                pressWeaponCard(pos, posFrom);
                break;
            case 'enemy':
                chooseAttackEnemyArea(pos, posFrom, checkPlayerWeapon());
                break;
            case 'heal':
                pressHealCard(pos, posFrom);
                break;
            case 'gold':
                takeGold(pos, posFrom);
                break;
            default:
                alert('Ошибка в определении типа нажатой карточки');
                console.log(field[pos].type);
                break;
        }
    } else if (!arr.includes(pos) && field[pos].type == 'enemy' && player.weapon != null) {
        if (player.weapon.area != 'forward') {
            chooseAttackEnemyArea(pos, posFrom, player.weapon.area);
        }
    }
}
    //ДВИЖЕНИЯ ИГРОКА ИЗ ПОЗИЦИИ КОНЕЦ


function movePlayer(e) {
    let posFrom,
        target;
    for (let pos in field) {
        if (field[pos] != null && field[pos].type == 'player') {
            posFrom = pos;
            target = checkClickPosition(e.offsetX, e.offsetY);
            switch (pos) {
                case 'nw':
                    moveFromNW(e);
                    posFrom = 'nw';
                    cardShift(posFrom, target);
                    break;
                case 'n':
                    moveFromN(e);
                    posFrom = 'n';
                    cardShift(posFrom, target);
                    break;
                case 'ne':
                    moveFromNE(e);
                    posFrom = 'ne';
                    cardShift(posFrom, target);
                    break;
                case 'w':
                    moveFromW(e);
                    posFrom = 'w';
                    cardShift(posFrom, target);
                    break;
                case 'center':
                    moveFromCenter(e);
                    posFrom = 'center';
                    cardShift(posFrom, target);
                    break;
                case 'e':
                    moveFromE(e);
                    posFrom = 'e';
                    cardShift(posFrom, target);
                    break;
                case 'sw':
                    moveFromSW(e);
                    posFrom = 'sw';
                    cardShift(posFrom, target);
                    break;
                case 's':
                    moveFromS(e);
                    posFrom = 's';
                    cardShift(posFrom, target);
                    break;
                case 'se':
                    moveFromSE(e);
                    posFrom = 'se';
                    cardShift(posFrom, target);
                    break;
                default:
                    alert('Где-то жирная ошибка. Позиция игрока определена вне поля');
                    console.log(pos);
                    break;
            }
        } else {
            continue;
        }
    }
}
window.addEventListener('load', startGame);
window.addEventListener('load', drawFieldOnload);
window.addEventListener('load', drawCardsOnload);

//МЕХАНИКА ИГРЫ КОНЕЦ


//ОТРИСОВКА НАЧАЛО
// let cardPosLength = 0;
function drawFieldOnload() {
    for (let key in cardPos) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.rect(cardPos[key][0], cardPos[key][1], cardPos[key][2], cardPos[key][3]);
        ctx.stroke();
        ctx.closePath();
        // cardPosLength++;
    }
    ctx.beginPath();
    ctx.clearRect(cardPos['center'][0]-2, cardPos['center'][1]-2, cardPos['center'][2]+4, cardPos['center'][3]+4);

    ctx.strokeStyle = 'rgb(197, 129, 0)';
    ctx.lineWidth = 3;
    ctx.rect(cardPos['center'][0], cardPos['center'][1], cardPos['center'][2], cardPos['center'][3]);
    ctx.stroke();
    ctx.closePath();
}

function drawCardsOnload() {
    for (let prop in field) {
        if (field[prop].type == 'player') {
            ctx.beginPath();
            ctx.drawImage(field[prop].skin, getImgCoords(prop)[0], getImgCoords(prop)[1], 100, 100);

            if (field[prop].weapon != null) {
                ctx.drawImage(field[prop].weapon.skin, getWeaponImgCoords(prop)[0], getWeaponImgCoords(prop)[1], 50, 50);
                ctx.fillStyle = 'green';
                ctx.font = '24px Arial';
                ctx.fillText(field[prop].weapon.hp, getWeaponDamageInfoCoords(prop)[0], getWeaponDamageInfoCoords(prop)[1]);
            }

            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[prop].hp, getHpInfoCoords(prop)[0], getHpInfoCoords(prop)[1]);
            
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.drawImage(field[prop].skin, getImgCoords(prop)[0], getImgCoords(prop)[1], 100, 100);

            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[prop].hp, getHpInfoCoords(prop)[0], getHpInfoCoords(prop)[1]);
            ctx.closePath();
        }

    }


    // ctx.drawImage(player.skin, 200, 280, 100, 100);
    // ctx.drawImage(player.weapon.skin, 175, 290, 50, 50);

    // ctx.beginPath();
    // ctx.fillStyle = 'red';
    // ctx.font = '24px Arial';
    // ctx.fillText(player.hp, 290, 235);
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.fillStyle = 'green';
    // ctx.font = '24px Arial';
    // ctx.fillText(player.weapon.damage, 180, 380);
    // ctx.closePath();
}
function checkClickPosition(x, y) {
    if (x >= 10 && x <= 163 && y >= 10 && y <= 196) {
        return 'nw';
    } else if (x >= 173 && x <= 326 && y >= 10 && y <= 196) {
        return 'n';
    } else if (x >= 336 && x <= 489 && y >= 10 && y <= 196) {
        return 'ne';
    } else if (x >= 10 && x <= 163 && y >= 206 && y <= 392) {
        return 'w';
    } else if (x >= 173 && x <= 326 && y >= 206 && y <= 392) {
        return 'center';
    } else if (x >= 336 && x <= 489 && y >= 206 && y <= 392) {
        return 'e';
    } else if (x >= 10 && x <= 163 && y >= 402 && y <= 588) {
        return 'sw';
    } else if (x >= 173 && x <= 326 && y >= 402 && y <= 588) {
        return 's';
    } else if (x >= 336 && x <= 489 && y >= 402 && y <= 588) {
        return 'se';
    }
}
function drawRefreshField() {
    ctx.clearRect(0, 0, 499, 598);

    for (let card in field) {
        if (field[card] != null) {
            if (field[card].type != 'player') {
                ctx.beginPath();
    
                ctx.clearRect(cardPos[card][0]-2, cardPos[card][1]-2, cardPos[card][2]+4, cardPos[card][3]+4);
        
                ctx.strokeStyle = 'rgb(100, 100, 100)';
                ctx.lineWidth = 3;
                ctx.rect(cardPos[card][0], cardPos[card][1], cardPos[card][2], cardPos[card][3]);
                ctx.stroke();
        
                ctx.drawImage(field[card].skin, getImgCoords(card)[0], getImgCoords(card)[1], 100, 100);
        
                ctx.fillStyle = 'red';
                ctx.textAlign = 'left';
                ctx.font = '24px Arial';
                ctx.fillText(field[card].hp, getHpInfoCoords(card)[0], getHpInfoCoords(card)[1]);
        
                ctx.closePath();
            } else {
                ctx.beginPath();
    
                ctx.clearRect(cardPos[card][0]-2, cardPos[card][1]-2, cardPos[card][2]+4, cardPos[card][3]+4);
        
                ctx.strokeStyle = 'rgb(197, 129, 0)';

                ctx.lineWidth = 3;
                ctx.rect(cardPos[card][0], cardPos[card][1], cardPos[card][2], cardPos[card][3]);
                ctx.stroke();
    
                ctx.drawImage(field[card].skin, getImgCoords(card)[0], getImgCoords(card)[1], 100, 100);
    
                if (field[card].weapon != null) {
                    ctx.drawImage(field[card].weapon.skin, getWeaponImgCoords(card)[0], getWeaponImgCoords(card)[1], 50, 50);
                    ctx.fillStyle = 'green';
                    ctx.font = '24px Arial';
                    ctx.fillText(field[card].weapon.hp, getWeaponDamageInfoCoords(card)[0], getWeaponDamageInfoCoords(card)[1]);
                }
        
                ctx.fillStyle = 'red';
                ctx.font = '24px Arial';
                ctx.fillText(field[card].hp, getHpInfoCoords(card)[0], getHpInfoCoords(card)[1]);
    
                ctx.closePath();
            } 
        } else {
            ctx.beginPath();
            ctx.clearRect(cardPos[card][0]-2, cardPos[card][1]-2, cardPos[card][2]+4, cardPos[card][3]+4);
            ctx.closePath();
        }
        // field[card].position = cardPos[card];
        // console.log(field[card].position);
    }
}
// function beforeDrawingMove() {
//     for (let key in field) {
//         console.log(field[key].changeCoord);
//         field[key].changeCoord = 1;
//     }
//     // clearInterval(moveLeftInterval);
//     // clearInterval(moveLeftInterval2);
//     drawRefreshField();
// }
function drawMoveCardLeft(pos, from) {
    let x = field[pos].changeCoord;
    // console.log(x);
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        ctx.beginPath();

        ctx.clearRect(cardPos[from][0]-x, cardPos[from][1]-2, cardPos[from][2]+7, cardPos[from][3]+4);;
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.rect(cardPos[from][0]-x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
        ctx.stroke();
    
        ctx.drawImage(field[pos].skin, getImgCoords(from)[0]-x, getImgCoords(from)[1], 100, 100);
    
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]-x, getHpInfoCoords(from)[1]);
    
        ctx.closePath();

        field[pos].changeCoord += 5;
    } else {
        clearInterval(moveLeftInterval);
        clearInterval(moveLeftInterval2);
        drawRefreshField();
        for (let key in field) {
            field[key].changeCoord = 1;
        }
    }
}
function drawMoveCardRight(pos, from) {
    let x = field[pos].changeCoord;
    // console.log(qwe);
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        ctx.beginPath();

        ctx.clearRect(cardPos[from][0]+(x-7), cardPos[from][1]-2, cardPos[from][2]+4, cardPos[from][3]+4);;
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.rect(cardPos[from][0]+x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
        ctx.stroke();
    
        ctx.drawImage(field[pos].skin, getImgCoords(from)[0]+x, getImgCoords(from)[1], 100, 100);
    
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]+x, getHpInfoCoords(from)[1]);
    
        ctx.closePath();

        field[pos].changeCoord += 5;
    } else {
        clearInterval(moveLeftInterval);
        clearInterval(moveLeftInterval2);
        drawRefreshField();
        for (let key in field) {
            field[key].changeCoord = 1;
        }
    }
}
function drawMoveCardTop(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        ctx.beginPath();

        ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]-x, cardPos[from][2]+4, cardPos[from][3]+8);;
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.rect(cardPos[from][0], cardPos[from][1]-x, cardPos[from][2], cardPos[from][3]);
        ctx.stroke();
    
        ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]-x, 100, 100);
    
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]-x);
    
        ctx.closePath();

        field[pos].changeCoord += 6;
    } else {
        clearInterval(moveLeftInterval);
        clearInterval(moveLeftInterval2);
        drawRefreshField();
        for (let key in field) {
            field[key].changeCoord = 1;
        }
    }
}
function drawMoveCardBottom(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        ctx.beginPath();

        ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]+(x-8), cardPos[from][2]+4, cardPos[from][3]+8);;
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.rect(cardPos[from][0], cardPos[from][1]+x, cardPos[from][2], cardPos[from][3]);
        ctx.stroke();
    
        ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]+x, 100, 100);
    
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]+x);
    
        ctx.closePath();

        field[pos].changeCoord += 6;
    } else {
        clearInterval(moveLeftInterval);
        clearInterval(moveLeftInterval2);
        drawRefreshField();
        for (let key in field) {
            field[key].changeCoord = 1;
        }
    }
}
//ОТРИСОВКА КОНЕЦ



//DEBUG
function addCard(type, pos, hp = 1) {
    let newCard = createNewCard(type);
    newCard.hp = hp;
    field[pos] = newCard;
    drawRefreshField();
}