let canvas = document.getElementById('canvas');
let tablo = document.getElementById('tablo');
let ctx = canvas.getContext('2d');
let ctx2 = tablo.getContext('2d');

let rule = 'Вы можете ходить только вверх, вниз, влево и вправо!';
window.moveLeftInterval = '';
window.moveLeftInterval2 = '';
window.movePlayerInterval = '';
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
let poisonBottleImg = new Image();
poisonBottleImg.src = 'img/card_skins/weapon/poison_bottle.png';
let crossbowImg = new Image();
crossbowImg.src = 'img/card_skins/weapon/crossbow.png';
    //heal
let heal1Img = new Image();
heal1Img.src = 'img/card_skins/heal/heal1.png';
let heal2Img = new Image();
heal2Img.src = 'img/card_skins/heal/heal2.png';
let heal3Img = new Image();
heal3Img.src = 'img/card_skins/heal/heal3.png';
    //gold
let goldImg = new Image();
goldImg.src = 'img/card_skins/gold/gold.png';
let diamondImg = new Image();
diamondImg.src = 'img/card_skins/gold/diamond.png';
    //special
let dropImg = new Image();
dropImg.src = 'img/card_skins/special/drop.png'
let dropGreenImg = new Image();
dropGreenImg.src = 'img/card_skins/special/drop_green.png'
let dropRedImg = new Image();
dropRedImg.src = 'img/card_skins/special/drop_red.png'
    //trap
    //bonus
//картинки конец


//ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ОБЪЕКТОВ НАЧАЛО
const specialsDefault = {
    enemy: {
        poison: {
            type: 'poison',
            during: 'nonstop',
            hpStep: 1,
            skin: dropGreenImg,
        },
    },
    //burn
    //poison
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
function getDebuffImgCoords(pos) {
    if (pos == 'nw') {
        return [17, 20];
    } else if (pos == 'n') {
        return [180, 20];
    } else if (pos == 'ne') {
        return [343, 20];
    } else if (pos == 'w') {
        return [17, 216];
    } else if (pos == 'center') {
        return [180, 216];
    } else if (pos == 'e') {
        return [343, 216];
    } else if (pos == 'sw') {
        return [17, 412];
    } else if (pos == 's') {
        return [180, 412];
    } else if (pos == 'se') {
        return [343, 412];
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

    let hp = Math.floor(Math.random() * (max - min + 1)) + min;
    // let hp = Math.floor(Math.random() * max) + min;
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
        hpMinMax: [1, 4],
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
        hpMinMax: [1, 4],
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
        hpMinMax: [1, 8],
        gold: 1,
        special: null,
        area: 'any',
        skin: bowImg,
        position: null,
        changeCoord: 1,
    },
    poisonBottle: {
        type: 'weapon',
        name: 'poisonBottle',
        hp: 1,
        hpMinMax: [1, 1],
        gold: 1,
        special: 'poison',
        area: 'any',
        skin: poisonBottleImg,
        position: null,
        changeCoord: 1,
    },
    crossbow: {
        type: 'weapon',
        name: 'crossbow',
        hp: 1,
        hpMinMax: [1, 8],
        gold: 1,
        special: null,
        area: 'forwardTwo',
        skin: crossbowImg,
        position: null,
        changeCoord: 1,
    },
}
let weaponArr = [];
for (let key in weaponDefault) {
    weaponArr.push(weaponDefault[key]);
}
let weaponAreas = ['forward', 'any', 'all', 'both'];

// function getEnemySpecial(spec) {
//     let obj = {};
//     Object.assign(obj, spec);
//     return obj;
// }
const enemyDefault = {
    alienbug: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 9],
        gold: 1,
        special: null,
        debuff: null,
        difficulty: 1,
        skin: alienBugImg,
        position: null,
        changeCoord: 1,
    },
    beehive: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 5],
        gold: 1,
        special: 'poison',
        debuff: null,
        difficulty: 1,
        skin: beehiveImg,
        position: null,
        changeCoord: 1,
    },
    bowman: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 7],
        gold: 1,
        special: null,
        debuff: null,
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
        hpMinMax: [3, 5],
        gold: 1,
        skin: heal1Img,
        position: null,
        changeCoord: 1,
    },
    heal2: {
        type: 'heal',
        hp: 3,
        hpMinMax: [1, 2],
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
        hpMinMax: [1, 4],
        skin: goldImg,
        position: null,
        changeCoord: 1,
    },
    diamond: {
        type: 'gold',
        hp: 1,
        hpMinMax: [5, 10],
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
    weapon      : givePlayerWeapon('bow', 5),
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
        newCard.hp = getRandomHp(newCard.hpMinMax[0], newCard.hpMinMax[1]);
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
function gameOver() {
    ctx.clearRect(0, 0, 499, 598);
    ctx2.clearRect(0, 0, 499, 55);
    console.log('Вы проиграли');
    
    canvas.removeEventListener('click', movePlayer);
    for (let pos in field) {
        field[pos] = null;
    }
    player = {};

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 3;
    ctx.rect(20, 170, 459, 200);
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You died', 250, 220);
    ctx.closePath();

    setTimeout(() => {
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Play again?', 250, 260);
        ctx.closePath();
    }, 1000);

    setTimeout(() => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(100, 100, 100)';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'grey';
        ctx.font = '34px Arial';
        ctx.textAlign = 'center';

        ctx.rect(40, 280, 120, 65);
        ctx.fillText('Yes', 100, 322);

        ctx.rect(339, 280, 120, 65);
        ctx.fillText('No', 399, 322);
        ctx.stroke();
        ctx.closePath();
        canvas.addEventListener('click', agreeNewGame);
    }, 2000);

    function agreeNewGame(event) {
        if (event.offsetX >= 40 && event.offsetX <= 160 && event.offsetY >= 280 && event.offsetY <= 345) {
            ctx.clearRect(0, 0, 499, 598);
            startGame();
            player.weapon = givePlayerWeapon('bow', 5);
            drawFieldOnload();
            drawCardsOnload();
            drawRefreshField();
            canvas.removeEventListener('click', agreeNewGame);
        }
    }


    // ctx.drawImage(field[card].skin, getImgCoords(card)[0], getImgCoords(card)[1], 100, 100);

    // ctx.fillStyle = 'red';
    // ctx.textAlign = 'left';
    // ctx.font = '24px Arial';
    // ctx.fillText(field[card].hp, getHpInfoCoords(card)[0], getHpInfoCoords(card)[1]);

}
function debuffStep() {
    // setTimeout(() => {
        
        for (let pos in field) {
            switch (field[pos].debuff) {
                case 'poison':
                    if (field[pos].hp > 1) {
                        field[pos].hp--;
                        console.log(pos + ' дебафф: яд');
                    } else {
                        field[pos].debuff = null;
                    }
                    break;
            
                default:
                    break;
            }
        }
        
    // }, 10);
}
function takeOneStep() {
    // setTimeout(() => {
        player.stats.difficultyUp();
        // debuffStep();
        // drawRefreshField();
        // debuffPlayerStep();
    // }, 10);
}
function useEnemySpecial(enemy) {
    switch (enemy.special) {
        case 'poison':
            player.debuff = 'poison';
            console.log('Дебафф: яд. -1 hp');
            break;
        default:
            break;
    }
}
function useWeaponSpecial(pos) {
    switch (player.weapon.special) {
        case 'poison':
            field[pos].debuff = 'poison';
            break;
        default:
            break;
    }
}
function checkPlayerWeapon() {
    if (player.weapon != null && player.weapon.hp <= 0 ) {
        player.weapon = null;
        console.log('Оружие сломалось');
        // deletePlayerWeapon();
    } else if (player.weapon == null) {
        return 'without';
    } else {
        return player.weapon.area;
    }
}

function chooseAttackEnemyArea(pos, from, area = 'forwards') {
    debuffStep();
    let damage = 0;
    function attackWithoutWeapon(pos, from) {
        if (player.hp > field[pos].hp) {
            useEnemySpecial(field[pos]);
            player.hp -= field[pos].hp;
            field[pos].hp = 0;
            field[pos] = player;
            field[from] = null;
        } else {
            field[pos].hp -= player.hp;
            player.hp = 0;
        }
        takeOneStep();
    }
    switch (area) {
        case 'without':
            attackWithoutWeapon(pos, from);
            // takeOneStep();
            break;
        case 'forward':
            if (player.weapon != null) {
                useWeaponSpecial(pos);
                if (player.weapon.hp > field[pos].hp) {
                    player.weapon.hp -= field[pos].hp;
                    field[pos].hp = 0;
                    takeOneStep();
                    // drawRefreshField();
                } else {
                    field[pos].hp -= player.weapon.hp;
                    player.weapon.hp = 0;
                    takeOneStep();
                    // drawRefreshField();
                }
            }
            // takeOneStep();
            break;
        case 'any':
            if (player.weapon != null) {
                useWeaponSpecial(pos);
                if (player.weapon.hp > field[pos].hp) {
                    player.weapon.hp -= field[pos].hp;
                    field[pos].hp = 0;
                    takeOneStep();
                    // drawRefreshField();
                } else {
                    field[pos].hp -= player.weapon.hp;
                    player.weapon.hp = 0;
                    takeOneStep();
                    // drawRefreshField();
                }
            }
            // takeOneStep();
            // drawRefreshField();
            break;
        case 'forwardTwo':
            if (player.weapon != null) {
                useWeaponSpecial(pos);
                switch (from) {
                    case 'nw':
                        if (pos == 'n') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['ne'].type == 'enemy') {
                                    field['ne'].hp -= damage;
                                }
                                if (field['ne'].hp <= 0) {
                                    killEnemy('ne');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['ne'].type == 'enemy') {
                                    field['ne'].hp -= player.weapon.hp;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 'w') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['sw'].type == 'enemy') {
                                    field['sw'].hp -= damage;
                                }
                                if (field['sw'].hp <= 0) {
                                    killEnemy('sw');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= player.weapon.hp;
                                if (field['sw'].type == 'enemy') {
                                    field['sw'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        }
                        break;
                        
                    case 'ne':
                        if (pos == 'n') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['nw'].type == 'enemy') {
                                    field['nw'].hp -= damage;
                                }
                                if (field['nw'].hp <= 0) {
                                    killEnemy('nw');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['nw'].type == 'enemy') {
                                    field['nw'].hp -= player.weapon.hp;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 'e') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['se'].type == 'enemy') {
                                    field['se'].hp -= damage;
                                }
                                if (field['se'].hp <= 0) {
                                    killEnemy('se');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['se'].type == 'enemy') {
                                    field['se'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        }
                        break;

                    case 'sw':
                        if (pos == 'w') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['nw'].type == 'enemy') {
                                    field['nw'].hp -= damage;
                                }
                                if (field['nw'].hp <= 0) {
                                    killEnemy('nw');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['nw'].type == 'enemy') {
                                    field['nw'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 's') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['se'].type == 'enemy') {
                                    field['se'].hp -= damage;
                                }
                                if (field['se'].hp <= 0) {
                                    killEnemy('se');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['se'].type == 'enemy') {
                                    field['se'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        }
                        break;

                    case 'se':
                        if (pos == 'e') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['ne'].type == 'enemy') {
                                    field['ne'].hp -= damage;
                                }
                                if (field['ne'].hp <= 0) {
                                    killEnemy('ne');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['ne'].type == 'enemy') {
                                    field['ne'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 's') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['sw'].type == 'enemy') {
                                    field['sw'].hp -= damage;
                                }
                                if (field['sw'].hp <= 0) {
                                    killEnemy('sw');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['sw'].type == 'enemy') {
                                    field['sw'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        }
                        break;

                    case 'n':
                        if (pos == 'center') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['s'].type == 'enemy') {
                                    field['s'].hp -= damage;
                                }
                                if (field['s'].hp <= 0) {
                                    killEnemy('s');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['s'].type == 'enemy') {
                                    field['s'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 'nw' || pos == 'ne') {
                            chooseAttackEnemyArea(pos, from, 'forward');
                            // takeOneStep();
                        }
                        break;
                    case 'w':
                        if (pos == 'center') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['e'].type == 'enemy') {
                                    field['e'].hp -= damage;
                                }
                                if (field['e'].hp <= 0) {
                                    killEnemy('e');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['e'].type == 'enemy') {
                                    field['e'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 'nw' || pos == 'sw') {
                            chooseAttackEnemyArea(pos, from, 'forward');
                            // takeOneStep();
                        }
                        break;
                    case 'e':
                        if (pos == 'center') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['w'].type == 'enemy') {
                                    field['w'].hp -= damage;
                                }
                                if (field['w'].hp <= 0) {
                                    killEnemy('w');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['w'].type == 'enemy') {
                                    field['w'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                            takeOneStep();
                        } else if (pos == 'ne' || pos == 'se') {
                            chooseAttackEnemyArea(pos, from, 'forward');
                            // takeOneStep();
                        }
                        break;
                    case 's':
                        if (pos == 'center') {
                            if (player.weapon.hp > field[pos].hp) {
                                damage = field[pos].hp;
                                if (field['n'].type == 'enemy') {
                                    field['n'].hp -= damage;
                                }
                                if (field['n'].hp <= 0) {
                                    killEnemy('n');
                                }
                                player.weapon.hp -= damage;
                                field[pos].hp = 0;
                            } else {
                                damage = player.weapon.hp;
                                field[pos].hp -= damage;
                                if (field['n'].type == 'enemy') {
                                    field['n'].hp -= damage;
                                }
                                player.weapon.hp = 0;
                            }
                        } else if (pos == 'sw' || pos == 'se') {
                            chooseAttackEnemyArea(pos, from, 'forward');
                        }
                        break;
                
                    case 'center': 
                        chooseAttackEnemyArea(pos, from, 'forward');
                        break;
                    default:
                        break;
                }
            }
            break;
        default:
            break;
    }
    // takeOneStep();
}
function killEnemy(pos) {
    let gold = field[pos].gold;
    field[pos] = null;
    field[pos] = createNewCard('gold');
    field[pos].hp = gold;
}
function pressWeaponCard(pos, from) {
    debuffStep();
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
    debuffStep();
    player.hp += field[pos].hp;
    if (player.hp > playerDefault.hp) {
        player.hp = playerDefault.hp;
    }
    player.debuff = null;
    console.log(`Вы восстановили ${field[pos].hp} здоровья`);
    field[pos] = player;
    field[from] = null;
    // player.stats.difficultyUp();
    // field[from] = createNewCard('random');
    // drawRefreshField();
    takeOneStep();
}
function takeGold(pos, from) {
    debuffStep();
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
    if (field[pos].type != 'enemy' || player.weapon == null) {
        switch (posFrom) {
            case 'nw':
                if (pos == 'n') {
                    field[posFrom] = field['w'];
                    field['w'] = field['sw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right');
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'nw', 'w');
                    window.moveLeftInterval2 = setInterval(drawMoveCardTop, 10, 'w', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 'w') {
                    field[posFrom] = field['n'];
                    field['n'] = field['ne'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'nw', 'n');
                    window.moveLeftInterval2 = setInterval(drawMoveCardLeft, 10, 'n', 'ne');
                    field['ne'] = createNewCard('random');
                }
                break;
            case 'n':
                if (pos == 'ne' || pos == 'center') {
                    field[posFrom] = field['nw'];
                    pos == 'ne' ? window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right') : 
                        window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'n', 'nw');
                    field['nw'] = createNewCard('random');
                } else if (pos == 'nw') {
                    field[posFrom] = field['ne'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left');
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'n', 'ne');
                    field['ne'] = createNewCard('random');
                }
                break;
            case 'ne':
                if (pos == 'n') {
                    field[posFrom] = field['e'];
                    field['e'] = field['se'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left');
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'ne', 'e');
                    window.moveLeftInterval2 = setInterval(drawMoveCardTop, 10, 'e', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 'e') {
                    field[posFrom] = field['n'];
                    field['n'] = field['nw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'ne', 'n');
                    window.moveLeftInterval2 = setInterval(drawMoveCardRight, 10, 'n', 'nw');
                    field['nw'] = createNewCard('random');
                }
                break;
            case 'w':
                if (pos == 'nw' || pos == 'center') {
                    field[posFrom] = field['sw'];
                    pos == 'nw' ? window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top') : 
                        window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right');
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'w', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 'sw') {
                    field[posFrom] = field['nw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'w', 'nw');
                    field['nw'] = createNewCard('random');
                }
                break;
            case 'center':
                if (pos == 'n') {
                    field[posFrom] = field['s'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top');
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'center', 's');
                    field['s'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['n'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'center', 'n');
                    field['n'] = createNewCard('random');
                } else if (pos == 'w') {
                    field[posFrom] = field['e'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left');
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'center', 'e');
                    field['e'] = createNewCard('random');
                } else if (pos == 'e') {
                    field[posFrom] = field['w'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right');
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'center', 'w');
                    field['w'] = createNewCard('random');
                }
                break;
            case 'e':
                if (pos == 'center' || pos == 'se') {
                    field[posFrom] = field['ne'];
                    pos == 'center' ? window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left') : 
                        window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'bottom');
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'e', 'ne');
                    field['ne'] = createNewCard('random');
                } else if (pos == 'ne') {
                    field[posFrom] = field['se'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top');
                    window.moveLeftInterval = setInterval(drawMoveCardTop, 10, 'e', 'se');
                    field['se'] = createNewCard('random');
                }
                break;
            case 'sw':
                if (pos == 'w') {
                    field[posFrom] = field['s'];
                    field['s'] = field['se'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top');
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 'sw', 's');
                    window.moveLeftInterval2 = setInterval(drawMoveCardLeft, 10, 's', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['w'];
                    field['w'] = field['nw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right');
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'sw', 'w');
                    window.moveLeftInterval2 = setInterval(drawMoveCardBottom, 10, 'w', 'nw');
                    field['nw'] = createNewCard('random');
                }
                break;
            case 's':
                if (pos == 'center' || pos == 'sw') {
                    field[posFrom] = field['se'];
                    pos == 'center' ? window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top') : 
                        window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left');
                    window.moveLeftInterval = setInterval(drawMoveCardLeft, 10, 's', 'se');
                    field['se'] = createNewCard('random');
                } else if (pos == 'se') {
                    field[posFrom] = field['sw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'right');
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 's', 'sw');
                    field['sw'] = createNewCard('random');
                }
                break;
            case 'se':
                if (pos == 'e') {
                    field[posFrom] = field['s'];
                    field['s'] = field['sw'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'top');
                    window.moveLeftInterval = setInterval(drawMoveCardRight, 10, 'se', 's');
                    window.moveLeftInterval2 = setInterval(drawMoveCardRight, 10, 's', 'sw');
                    field['sw'] = createNewCard('random');
                } else if (pos == 's') {
                    field[posFrom] = field['e'];
                    field['e'] = field['ne'];
                    window.movePlayerInterval = setInterval(drawPlayerMove, 10, pos, posFrom, 'left');
                    window.moveLeftInterval = setInterval(drawMoveCardBottom, 10, 'se', 'e');
                    window.moveLeftInterval2 = setInterval(drawMoveCardBottom, 10, 'e', 'ne');
                    field['ne'] = createNewCard('random');
                }
                break;
        
            default:
                break;
        }
    } else {
        drawRefreshField();
    }
    if (field[pos].type == 'enemy') {
        if (field[pos].hp <= 0) {
            killEnemy(pos);
        }
        checkPlayerWeapon();
        drawRefreshField();
    }
    // setTimeout(() => {
        // drawRefreshField();
    // }, 10);
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
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
    // takeOneStep();
}
    //ДВИЖЕНИЯ ИГРОКА ИЗ ПОЗИЦИИ КОНЕЦ


function movePlayer(e) {
    clearAllIntervals();
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
    // takeOneStep();
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
    drawRefreshTablo();
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
    // setTimeout(() => {
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
                if (field[card].debuff == 'poison') {
                    // console.log('Отрисовка дебаффа');
                    ctx.drawImage(dropGreenImg, getDebuffImgCoords(card)[0], getDebuffImgCoords(card)[1], 20, 20);
                }
            } else {
                ctx.beginPath();
                ctx.clearRect(cardPos[card][0]-2, cardPos[card][1]-2, cardPos[card][2]+4, cardPos[card][3]+4);
                ctx.closePath();
            }
            // field[card].position = cardPos[card];
            // console.log(field[card].position);
        }
        drawRefreshTablo();
        if (player.hp <= 0 ) {
            clearInterval(movePlayerInterval);
            clearInterval(moveLeftInterval);
            clearInterval(moveLeftInterval2);
            gameOver();
        }
    // }, 20);
}
function drawRefreshTablo() {
    ctx2.beginPath();
    ctx2.clearRect(0, 0, 499, 55);

    ctx2.drawImage(goldImg, 20, 10, 40, 40);
    ctx2.fillStyle = 'rgb(255, 215, 0)';
    ctx2.font = '24px Arial';
    ctx2.fillText(player.gold, 70, 40);
    ctx2.closePath();
}

function drawMoveCardLeft(pos, from) {
    let x = field[pos].changeCoord;
    // console.log(x);
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        if (field[pos].type != 'player') {
            ctx.beginPath();
    
            ctx.clearRect(cardPos[from][0]-x, cardPos[from][1]-2, cardPos[from][2]+7, cardPos[from][3]+4);
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
    
        } else {
            ctx.beginPath();

            ctx.clearRect(cardPos[from][0]-x, cardPos[from][1]-2, cardPos[from][2]+7, cardPos[from][3]+4);

            ctx.strokeStyle = 'rgb(197, 129, 0)';
            ctx.lineWidth = 3;
            ctx.rect(cardPos[from][0]-x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            ctx.stroke();

            ctx.drawImage(field[pos].skin, getImgCoords(from)[0]-x, getImgCoords(from)[1], 100, 100);

            if (field[pos].weapon != null) {
                ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0]-x, getWeaponImgCoords(from)[1], 50, 50);
                ctx.fillStyle = 'green';
                ctx.font = '24px Arial';
                ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0]-x, getWeaponDamageInfoCoords(from)[1]);
            }
    
            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]-x, getHpInfoCoords(from)[1]);

            ctx.closePath();
        }
        if (field[pos].debuff == 'poison') {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0]-x, getDebuffImgCoords(from)[1], 20, 20);
        }
        field[pos].changeCoord += 5;
    } else {
        clearAllIntervals();
    }
}
function drawMoveCardRight(pos, from) {
    let x = field[pos].changeCoord;
    // console.log(qwe);
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        if (field[pos].type != 'player') {
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
        } else {
            ctx.beginPath();

            ctx.clearRect(cardPos[from][0]+(x-7), cardPos[from][1]-2, cardPos[from][2]+4, cardPos[from][3]+4);

            ctx.strokeStyle = 'rgb(197, 129, 0)';
            ctx.lineWidth = 3;
            ctx.rect(cardPos[from][0]+x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            ctx.stroke();

            ctx.drawImage(field[pos].skin, getImgCoords(from)[0]+x, getImgCoords(from)[1], 100, 100);

            if (field[pos].weapon != null) {
                ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0]+x, getWeaponImgCoords(from)[1], 50, 50);
                ctx.fillStyle = 'green';
                ctx.font = '24px Arial';
                ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0]+x, getWeaponDamageInfoCoords(from)[1]);
            }
    
            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]+x, getHpInfoCoords(from)[1]);

            ctx.closePath();
        }
        if (field[pos].debuff == 'poison') {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0]+x, getDebuffImgCoords(from)[1], 20, 20);
        }
        field[pos].changeCoord += 5;
    } else {
        clearAllIntervals();
    }
}
function drawMoveCardTop(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        if (field[pos].type != 'player') {
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
        } else {
            ctx.beginPath();

            ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]-x, cardPos[from][2]+4, cardPos[from][3]+8);

            ctx.strokeStyle = 'rgb(197, 129, 0)';
            ctx.lineWidth = 3;
            ctx.rect(cardPos[from][0], cardPos[from][1]-x, cardPos[from][2], cardPos[from][3]);
            ctx.stroke();

            ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]-x, 100, 100);

            if (field[pos].weapon != null) {
                ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0], getWeaponImgCoords(from)[1]-x, 50, 50);
                ctx.fillStyle = 'green';
                ctx.font = '24px Arial';
                ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0], getWeaponDamageInfoCoords(from)[1]-x);
            }
    
            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]-x);

            ctx.closePath();
        }
        if (field[pos].debuff == 'poison') {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0], getDebuffImgCoords(from)[1]-x, 20, 20);
        }
        field[pos].changeCoord += 6;
    } else {
        clearAllIntervals();
    }
}
function drawMoveCardBottom(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        if (field[pos].type != 'player') {
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
        } else {
            ctx.beginPath();

            ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]+(x-8), cardPos[from][2]+4, cardPos[from][3]+8);

            ctx.strokeStyle = 'rgb(197, 129, 0)';
            ctx.lineWidth = 3;
            ctx.rect(cardPos[from][0], cardPos[from][1]+x, cardPos[from][2], cardPos[from][3]);
            ctx.stroke();

            ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]+x, 100, 100);

            if (field[pos].weapon != null) {
                ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0], getWeaponImgCoords(from)[1]+x, 50, 50);
                ctx.fillStyle = 'green';
                ctx.font = '24px Arial';
                ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0], getWeaponDamageInfoCoords(from)[1]+x);
            }
    
            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]+x);

            ctx.closePath();
        }
        if (field[pos].debuff == 'poison') {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0], getDebuffImgCoords(from)[1]+x, 20, 20);
        }
        field[pos].changeCoord += 6;
    } else {
        clearAllIntervals();
    }
}
function drawPlayerMove(pos, from, direct) {
    switch (direct) {
        case 'left':
            drawMoveCardLeft(pos, from);
            break;
        case 'right':
            drawMoveCardRight(pos, from);
            break;
        case 'top':
            drawMoveCardTop(pos, from);
            break;
        case 'bottom':
            drawMoveCardBottom(pos, from);
            break;
        default:
            break;
    }
}

function clearAllIntervals() {
    clearInterval(moveLeftInterval);
    clearInterval(moveLeftInterval2);
    clearInterval(movePlayerInterval);
    drawRefreshField();
    for (let key in field) {
        field[key].changeCoord = 1;
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