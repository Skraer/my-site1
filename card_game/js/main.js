let canvas = document.getElementById('canvas');
let tablo = document.getElementById('tablo');
let ctx = canvas.getContext('2d');
let ctx2 = tablo.getContext('2d');

let rule = 'Вы можете ходить только вверх, вниз, влево и вправо!';
window.moveLeftInterval = '';
window.moveLeftInterval2 = '';
window.movePlayerInterval = '';
window.vibroInterval = '';
window.vibroInterval2 = '';
window.vibroInterval3 = '';
window.vibroInterval4 = '';

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
let scorpionImg = new Image();
scorpionImg.src = 'img/card_skins/enemy/scorpion.png';
let squidImg = new Image();
squidImg.src = 'img/card_skins/enemy/squid.png';
let skeletonImg = new Image();
skeletonImg.src = 'img/card_skins/enemy/skeleton.png';
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
let daggerImg = new Image();
daggerImg.src = 'img/card_skins/weapon/dagger.png';
let nunchakuImg = new Image();
nunchakuImg.src = 'img/card_skins/weapon/nunchaku.png';
let shurikenImg = new Image();
shurikenImg.src = 'img/card_skins/weapon/shuriken.png';
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
    //chest
let goodChestImg = new Image();
goodChestImg.src = 'img/card_skins/chest/good_chest.png'
let badChestImg = new Image();
badChestImg.src = 'img/card_skins/chest/bad_chest.png'

//картинки конец


//ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ОБЪЕКТОВ НАЧАЛО
// const specialsDefault = {
//     enemy: {
//         poison: {
//             type: 'poison',
//             during: 'nonstop',
//             hpStep: 1,
//             skin: dropGreenImg,
//         },
//     },
//     //burn
//     //poison
// }
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
const vibro = {
    arr: [
        [+2, -2],
        [-2, -1],
        [+2, +1],
        [-1, -2],
        [-2, +2],
        [+2, +2],
        [0, 0]
    ],
    pos: 0
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
    return hp;
}

// function randomEnemyHp(min, max) {

// }
const debuff = {
    poison: false,
    blindness: false,
}
function debuffObj() {
    let obj = {};
    Object.assign(obj, debuff)
    return obj;
}
const chestDefault = {
    goodChest: {
        type: 'chest',
        hp: '',
        name: 'goodChest',
        skin: goodChestImg,
        position: null,
        changeCoord: 1,
    },
    badChest: {
        type: 'chest',
        hp: '',
        name: 'badChest',
        skin: badChestImg,
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
    dagger: {
        type: 'weapon',
        name: 'dagger',
        hp: 1,
        hpMinMax: [1, 15],
        gold: 1,
        special: null,
        area: 'forward',
        skin: daggerImg,
        position: null,
        changeCoord: 1,
    },
    nunchaku: {
        type: 'weapon',
        name: 'nunchaku',
        hp: 1,
        hpMinMax: [1, 8],
        gold: 1,
        special: null,
        area: 'both',
        skin: nunchakuImg,
        position: null,
        changeCoord: 1,
    },
    shuriken: {
        type: 'weapon',
        name: 'shuriken',
        hp: 1,
        hpMinMax: [1, 4],
        gold: 1,
        special: null,
        area: 'cross',
        skin: shurikenImg,
        position: null,
        changeCoord: 1,
    },
}

const enemyDefault = {
    alienbug: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [3, 9],
        gold: 1,
        special: null,
        debuff: debuffObj(),
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
        debuff: debuffObj(),
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
        debuff: debuffObj(),
        difficulty: 1,
        skin: bowmanImg,
        position: null,
        changeCoord: 1,
    },
    scorpion: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [1, 3],
        gold: 1,
        special: 'poison',
        debuff: debuffObj(),
        difficulty: 1,
        skin: scorpionImg,
        position: null,
        changeCoord: 1,
    },
    squid: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [2, 6],
        gold: 1,
        special: 'blindness',
        debuff: debuffObj(),
        difficulty: 1,
        skin: squidImg,
        position: null,
        changeCoord: 1,
    },
    skeleton: {
        type: 'enemy',
        hp: 1,
        hpMinMax: [1, 7],
        gold: 1,
        special: null,
        debuff: debuffObj(),
        difficulty: 1,
        skin: skeletonImg,
        position: null,
        changeCoord: 1,
    },
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

// let weaponAreas = ['forward', 'any', 'all', 'both'];
let weaponArr = [];
for (let key in weaponDefault) {
    weaponArr.push(weaponDefault[key]);
}
let enemyArr = [];
for (let key in enemyDefault) {
    enemyArr.push(enemyDefault[key]);
}
let healArr = [];
for (let key in healDefault) {
    healArr.push(healDefault[key]);
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
    debuff      : debuffObj(),
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
    player.debuff = debuffObj();
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
        newCard.debuff = debuffObj();
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
            // drawFieldOnload();
            // drawCardsOnload();
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
    for (let pos in field) {
        if (field[pos].debuff != undefined) {
            if (field[pos].debuff.poison == true) {
                if (field[pos].hp > 1) {
                    field[pos].hp--;
                } else {
                    field[pos].debuff.poison = false;
                }
            }

            if (field[pos].debuff.blindness > 0) {
                // setTimeout(() => {
                //     drawGradient();
                // }, 400);
                console.log(player.debuff.blindness);
                
                field[pos].debuff.blindness--;
            } else {
                field[pos].debuff.blindness = false;
            }
        }
    }
}
function takeOneStep() {
    player.stats.difficultyUp();
    // debuffStep();
    // drawRefreshField();
    // debuffPlayerStep();
}
function useEnemySpecial(enemy) {
    switch (enemy.special) {
        case 'poison':
            player.debuff.poison = true;
            // console.log(player.debuff);
            break;
        case 'blindness':
            player.debuff.blindness = 3;
            // console.log(player.debuff);
            break;
        default:
            break;
    }
}
function useWeaponSpecial(pos) {
    switch (player.weapon.special) {
        case 'poison':
            field[pos].debuff.poison = true;
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
    function attackForward(pos) {
        if (player.weapon.hp >= field[pos].hp) {
            damage = field[pos].hp;
            player.weapon.hp -= damage;
            field[pos].hp = 0;
            takeOneStep();
        } else {
            damage = player.weapon.hp;
            field[pos].hp -= damage;
            player.weapon.hp = 0;
            takeOneStep();
            vibroInterval = setInterval(drawVibration, 20, pos);
            // drawRefreshField();
        }
    }
    function attackAny(pos) {
        if (player.weapon.hp >= field[pos].hp) {
            damage = field[pos].hp;
            player.weapon.hp -= damage;
            field[pos].hp = 0;
            takeOneStep();
        } else {
            damage = player.weapon.hp;
            field[pos].hp -= damage;
            player.weapon.hp = 0;
            takeOneStep();
            vibroInterval = setInterval(drawVibration, 20, pos);
            // drawRefreshField();
        }
    }
    function attackForwardTwo(pos, pos2) {
        if (player.weapon.hp >= field[pos].hp) {
            damage = field[pos].hp;
            if (field[pos2].type == 'enemy') {
                field[pos2].hp -= damage;
            }
            player.weapon.hp -= damage;
            field[pos].hp = 0;
        } else {
            vibroInterval = setInterval(drawVibration, 20, pos);
            damage = player.weapon.hp;
            field[pos].hp -= damage;
            if (field[pos2].type == 'enemy') {
                field[pos2].hp -= player.weapon.hp;
            }
            player.weapon.hp = 0;
        }
        if (field[pos2].type == 'enemy') {
            if (field[pos2].hp <= 0) {
                killEnemy(pos2);
            } else {
                vibroInterval2 = setInterval(drawVibration, 20, pos2);
            }
        }
        takeOneStep();
    }
    function attackCross(pos, pos2, pos3, pos4, pos5) {
        let etalon = [pos2, pos3, pos4, pos5];
        let set = new Set([pos, pos2, pos3, pos4, pos5]);
        let arr = [];

        if (etalon.includes(pos)) {
            for (let value of set) {
                arr.push(value);
            }
            console.log(arr);
            pos = arr[0];
            pos2 = arr[1];
            pos3 = arr[2];
            pos4 = arr[3];
    
            if (player.weapon.hp >= field[pos].hp) {
                damage = field[pos].hp;
                if (pos != null && field[pos].type == 'enemy') {
                    field[pos].hp -= damage;
                }
                if (pos2 != null && field[pos2].type == 'enemy') {
                    field[pos2].hp -= damage;
                }
                if (pos3 != null && field[pos3].type == 'enemy') {
                    field[pos3].hp -= damage;
                }
                if (pos4 != null && field[pos4].type == 'enemy') {
                    field[pos4].hp -= damage;
                }
                player.weapon.hp -= damage;
            } else {
                damage = player.weapon.hp;
                field[pos].hp -= damage;
                vibroInterval = setInterval(drawVibration, 20, pos);
                if (pos2 != null && field[pos2].type == 'enemy') {
                    field[pos2].hp -= player.weapon.hp;
                }
                if (pos3 != null && field[pos3].type == 'enemy') {
                    field[pos3].hp -= player.weapon.hp;
                }
                if (pos4 != null && field[pos4].type == 'enemy') {
                    field[pos4].hp -= player.weapon.hp;
                }
                player.weapon.hp = 0;
            }
            if (pos2 != null && field[pos2].type == 'enemy') {
                if (field[pos2].hp <= 0) {
                    killEnemy(pos2);
                } else {
                    vibroInterval2 = setInterval(drawVibration, 20, pos2);
                }
            }
            if (pos3 != null && field[pos3].type == 'enemy') {
                if (field[pos3].hp <= 0) {
                    killEnemy(pos3);
                } else {
                    vibroInterval3 = setInterval(drawVibration, 20, pos3);
                }
            }
            if (pos4 != null && field[pos4].type == 'enemy') {
                if (field[pos4].hp <= 0) {
                    killEnemy(pos4);
                } else {
                    vibroInterval4 = setInterval(drawVibration, 20, pos4);
                }
            }
            takeOneStep();
        }
    }
    function attackBoth(from, pos) {
        let arr = [];
        let startWeaponHP = player.weapon.hp;

        switch (from) {
            case 'nw':
                if (pos == 'n') {
                    arr.push('w');
                } else if (pos == 'w') {
                    arr.push('n');
                }
                break;
            case 'n':
                if (pos == 'center') {
                    arr.push('nw');
                    arr.push('ne');
                } else if (pos == 'nw' || pos == 'ne') {
                    arr.push('center');
                }
                break;
            case 'ne':
                if (pos == 'n') {
                    arr.push('e');
                } else if (pos == 'e') {
                    arr.push('n');
                }
                break;
            case 'w':
                if (pos == 'center') {
                    arr.push('nw');
                    arr.push('sw');
                } else if (pos == 'nw' || pos == 'sw') {
                    arr.push('center');
                }
                break;
            case 'center':
                if (pos == 's' || pos == 'n') {
                    arr.push('w');
                    arr.push('e');
                } else if (pos == 'e' || pos == 'w') {
                    arr.push('s');
                    arr.push('n');
                }
                break;
            case 'e':
                if (pos == 'center') {
                    arr.push('ne');
                    arr.push('se');
                } else if (pos == 'se' || pos == 'ne') {
                    arr.push('center');
                }
                break;
            case 'sw':
                if (pos == 's') {
                    arr.push('w');
                } else if (pos == 'w') {
                    arr.push('s');
                }
                break;
            case 's':
                if (pos == 'center') {
                    arr.push('sw');
                    arr.push('se');
                } else if (pos == 'sw' || pos == 'se') {
                    arr.push('center');
                }
                break;
            case 'se':
                if (pos == 'e') {
                    arr.push('s');
                } else if (pos == 's') {
                    arr.push('e');
                }
                break;
            default:
                break;
        }

        pos = arr[0];
        pos2 = arr[1];

        if (arr.length > 1) {
            if (field[pos].type == 'enemy' && field[pos2].type == 'enemy') {
                if (field[pos].hp >= field[pos2].hp && player.weapon.hp >= field[pos].hp) {
                    damage = field[pos].hp;
                } else if (field[pos].hp < field[pos2].hp && player.weapon.hp >= field[pos2].hp) {
                    damage = field[pos2].hp;
                } else {
                    damage = player.weapon.hp;
                }
            } else if (field[pos].type != 'enemy' && field[pos2].type == 'enemy') {
                if (player.weapon.hp >= field[pos2].hp) {
                    damage = field[pos2].hp;
                } else {
                    damage = player.weapon.hp;
                }
            } else if (field[pos].type == 'enemy' && field[pos2].type != 'enemy') {
                if (player.weapon.hp >= field[pos].hp) {
                    damage = field[pos].hp;
                } else {
                    damage = player.weapon.hp;
                }
            }
        } else if (arr.length == 1) {
            if (field[pos].type == 'enemy') {
                if (player.weapon.hp >= field[pos].hp) {
                    damage = field[pos].hp;
                } else {
                    damage = player.weapon.hp;
                }
            }
        }

        if (pos != null && field[pos].type == 'enemy') {
            field[pos].hp -= damage;
        }
        if (pos2 != null && field[pos2].type == 'enemy') {
            field[pos2].hp -= damage;
        }
        player.weapon.hp -= damage;

        if (pos != null && field[pos].type == 'enemy') {
            if (field[pos].hp <= 0) {
                killEnemy(pos);
            } else {
                vibroInterval = setInterval(drawVibration, 20, pos);
            }
        }
        if (pos2 != null && field[pos2].type == 'enemy') {
            if (field[pos2].hp <= 0) {
                killEnemy(pos2);
            } else {
                vibroInterval2 = setInterval(drawVibration, 20, pos2);
            }
        }

        if (player.weapon.hp < startWeaponHP) {
            takeOneStep();
        }
    }

    switch (area) {
        case 'without':
            attackWithoutWeapon(pos, from);
            break;
        case 'forward':
            useWeaponSpecial(pos);
            attackForward(pos);
            break;
        case 'any':
            useWeaponSpecial(pos);
            attackAny(pos);
            break;
        case 'forwardTwo':
            useWeaponSpecial(pos);
            switch (from) {
                case 'nw':
                    if (pos == 'n') {
                        attackForwardTwo(pos, 'ne');
                    } else if (pos == 'w') {
                        attackForwardTwo(pos, 'sw');
                    }
                    break;
                case 'ne':
                    if (pos == 'n') {
                        attackForwardTwo(pos, 'nw');
                    } else if (pos == 'e') {
                        attackForwardTwo(pos, 'se');
                    }
                    break;
                case 'sw':
                    if (pos == 'w') {
                        attackForwardTwo(pos, 'nw');
                    } else if (pos == 's') {
                        attackForwardTwo(pos, 'se');
                    }
                    break;
                case 'se':
                    if (pos == 'e') {
                        attackForwardTwo(pos, 'ne');
                    } else if (pos == 's') {
                        attackForwardTwo(pos, 'sw');
                    }
                    break;

                case 'n':
                    if (pos == 'center') {
                        attackForwardTwo(pos, 's');
                    } else if (pos == 'nw' || pos == 'ne') {
                        chooseAttackEnemyArea(pos, from, 'forward');
                    }
                    break;
                case 'w':
                    if (pos == 'center') {
                        attackForwardTwo(pos, 'e');
                    } else if (pos == 'nw' || pos == 'sw') {
                        chooseAttackEnemyArea(pos, from, 'forward');
                    }
                    break;
                case 'e':
                    if (pos == 'center') {
                        attackForwardTwo(pos, 'w');
                    } else if (pos == 'ne' || pos == 'se') {
                        chooseAttackEnemyArea(pos, from, 'forward');
                    }
                    break;
                case 's':
                    if (pos == 'center') {
                        attackForwardTwo(pos, 'n');
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
            break;
        case 'cross':
            switch (from) {
                case 'nw':
                    attackCross(pos, 'w', 'n');
                    break;
                case 'n':
                    attackCross(pos, 'nw', 'center', 'ne');
                    break;
                case 'ne':
                    attackCross(pos, 'n', 'e');
                    break;
                case 'w':
                    attackCross(pos, 'nw', 'center', 'sw');
                    break;
                case 'center':
                    attackCross(pos, 'w', 'n', 's', 'e');
                    break;
                case 'e':
                    attackCross(pos, 'ne', 'se', 'center');
                    break;
                case 'sw':
                    attackCross(pos, 'w', 's');
                    break;
                case 's':
                    attackCross(pos, 'sw', 'center', 'se');
                    break;
                case 'se':
                    attackCross(pos, 's', 'e');
                    break;
                default:
                    break;
            }
            break;
        case 'both':
            attackBoth(from, pos);
            break;
        default:
            break;
    }
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
    player.debuff.poison = false;
    // player.debuff = debuffObj();
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
    field[pos] = player;
    field[from] = null;
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
window.addEventListener('load', drawRefreshField);
// window.addEventListener('load', drawCardsOnload);

//МЕХАНИКА ИГРЫ КОНЕЦ


//ОТРИСОВКА НАЧАЛО
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
function drawPlayer(pos) {
    ctx.beginPath();
        
    ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);

    ctx.strokeStyle = 'rgb(197, 129, 0)';

    ctx.lineWidth = 3;
    ctx.rect(cardPos[pos][0], cardPos[pos][1], cardPos[pos][2], cardPos[pos][3]);
    ctx.stroke();

    ctx.drawImage(field[pos].skin, getImgCoords(pos)[0], getImgCoords(pos)[1], 100, 100);

    if (field[pos].weapon != null) {
        ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(pos)[0], getWeaponImgCoords(pos)[1], 50, 50);
        ctx.fillStyle = 'green';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(pos)[0], getWeaponDamageInfoCoords(pos)[1]);
    }

    ctx.fillStyle = 'red';
    ctx.font = '24px Arial';
    ctx.fillText(field[pos].hp, getHpInfoCoords(pos)[0], getHpInfoCoords(pos)[1]);
    ctx.closePath();



}
function drawOther(pos) {
    ctx.beginPath();
        
    ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);

    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 3;
    ctx.rect(cardPos[pos][0], cardPos[pos][1], cardPos[pos][2], cardPos[pos][3]);
    ctx.stroke();

    ctx.drawImage(field[pos].skin, getImgCoords(pos)[0], getImgCoords(pos)[1], 100, 100);

    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = '24px Arial';
    ctx.fillText(field[pos].hp, getHpInfoCoords(pos)[0], getHpInfoCoords(pos)[1]);

    ctx.closePath();
}
function drawRefreshField() {
    // setTimeout(() => {
        ctx.clearRect(0, 0, 499, 598);
    
        for (let pos in field) {
            if (field[pos] != null) {
                if (field[pos].type == 'player') {
                    drawPlayer(pos);
                } else {
                    drawOther(pos);

                }
                // if (field[pos].type != 'player') {
                //     drawOther(pos);
                // } else {
                //     drawPlayer(pos);
                // }
            } else {
                ctx.beginPath();
                ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
                ctx.closePath();
            }
            // field[pos].position = cardPos[pos];
            // console.log(field[pos].position);
        }
        for (let pos in field) {
            if (checkDebuff(pos, 'blindness') > 0) {
                drawGradient(pos);
            }
            if (checkDebuff(pos, 'poison') == true) {
                // console.log('Отрисовка дебаффа');
                ctx.drawImage(dropGreenImg, getDebuffImgCoords(pos)[0], getDebuffImgCoords(pos)[1], 20, 20);
            }
        }
        drawRefreshTablo();
        if (player.hp <= 0 ) {
            clearAllIntervals();
            // clearInterval(movePlayerInterval);
            // clearInterval(moveLeftInterval);
            // clearInterval(moveLeftInterval2);
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
function drawVibration(pos) {
    // let changesArr = [
    //     [+2, -2],
    //     [-2, -1],
    //     [+2, +1],
    //     [-1, -2],
    //     [-2, +2],
    //     [+2, +2],
    //     [0, 0]
    // ];
    let x = vibro.arr[vibro.pos][0];
    let y = vibro.arr[vibro.pos][1];
    ctx.beginPath();
        
    ctx.clearRect(cardPos[pos][0]-2+x, cardPos[pos][1]-2+y, cardPos[pos][2]+4, cardPos[pos][3]+4);

    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 3;
    ctx.rect(cardPos[pos][0]+x, cardPos[pos][1]+y, cardPos[pos][2], cardPos[pos][3]);
    ctx.stroke();

    ctx.drawImage(field[pos].skin, getImgCoords(pos)[0]+x, getImgCoords(pos)[1]+y, 100, 100);

    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = '24px Arial';
    ctx.fillText(field[pos].hp, getHpInfoCoords(pos)[0]+x, getHpInfoCoords(pos)[1]+y);

    ctx.closePath();
    vibro.pos++;
    if (vibro.pos >= 7) {
        vibro.pos = 0;
        clearAllIntervals();
    }
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
        if (checkDebuff(pos, 'poison') == true) {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0]-x, getDebuffImgCoords(from)[1], 20, 20);
        }
        if (checkDebuff(pos, 'blindness') > 0) {
            // drawGradient(pos);
            ctx.beginPath();
            gradient = ctx.createRadialGradient(cardPos[from][0]+76-x, cardPos[from][1]+93, 140, cardPos[from][0]+76-x, cardPos[from][1]+93, 20);
            gradient.addColorStop(0, "rgb(50, 50, 50)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(-5, -5, 505, 604);
            // ctx.strokeRect(50, 30, 150, 150);
            ctx.closePath();
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
        if (checkDebuff(pos, 'poison') == true) {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0]+x, getDebuffImgCoords(from)[1], 20, 20);
        }
        if (checkDebuff(pos, 'blindness') > 0) {
            // drawGradient(pos);
            ctx.beginPath();
            gradient = ctx.createRadialGradient(cardPos[from][0]+76+x, cardPos[from][1]+93, 140, cardPos[from][0]+76+x, cardPos[from][1]+93, 20);
            gradient.addColorStop(0, "rgb(50, 50, 50)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(-5, -5, 505, 604);
            // ctx.strokeRect(50, 30, 150, 150);
            ctx.closePath();
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
        if (checkDebuff(pos, 'poison') == true) {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0], getDebuffImgCoords(from)[1]-x, 20, 20);
        }
        if (checkDebuff(pos, 'blindness') > 0) {
            // drawGradient(pos);
            ctx.beginPath();
            gradient = ctx.createRadialGradient(cardPos[from][0]+76, cardPos[from][1]+93-x, 140, cardPos[from][0]+76, cardPos[from][1]+93-x, 20);
            gradient.addColorStop(0, "rgb(50, 50, 50)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(-5, -5, 505, 604);
            // ctx.strokeRect(50, 30, 150, 150);
            ctx.closePath();
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
        if (checkDebuff(pos, 'poison') == true) {
            // console.log('Отрисовка дебаффа');
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0], getDebuffImgCoords(from)[1]+x, 20, 20);
        }
        if (checkDebuff(pos, 'blindness') > 0) {
            // drawGradient(pos);
            ctx.beginPath();
            gradient = ctx.createRadialGradient(cardPos[from][0]+76, cardPos[from][1]+93+x, 140, cardPos[from][0]+76+x, cardPos[from][1]+93, 20);
            gradient.addColorStop(0, "rgb(50, 50, 50)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(-5, -5, 505, 604);
            // ctx.strokeRect(50, 30, 150, 150);
            ctx.closePath();
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
    clearInterval(vibroInterval);
    clearInterval(vibroInterval2);
    clearInterval(vibroInterval3);
    clearInterval(vibroInterval4);
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
function testShuriken() {
    player.weapon = givePlayerWeapon('shuriken', 2);
    addCard('enemy', 'n', 1);
    addCard('enemy', 's', 2);
    addCard('enemy', 'e', 3);
    addCard('enemy', 'w', 4);
}
function testNunchaku() {
    player.weapon = givePlayerWeapon('nunchaku', 5);
    addCard('enemy', 'n', 1);
    // addCard('enemy', 's', 2);
    // addCard('enemy', 'e', 3);
    // addCard('enemy', 'w', 4);
}
function drawGradient(pos) {
    // let center;
    // for (let pos in field) {
    //     if (field[pos].type == 'player') {
    //     }
    // }
    // center = [cardPos[pos][0]+76, cardPos[pos][1]+93];
    ctx.beginPath();
    gradient = ctx.createRadialGradient(cardPos[pos][0]+76, cardPos[pos][1]+93, 140, cardPos[pos][0]+76, cardPos[pos][1]+93, 20);
    gradient.addColorStop(0, "rgb(50, 50, 50)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(-5, -5, 505, 604);
    // ctx.strokeRect(50, 30, 150, 150);
    ctx.closePath();
}

function checkDebuff(pos, name) {
    if (field[pos].debuff != undefined) {
        return field[pos].debuff[name];
    } else {
        return;
    }
}