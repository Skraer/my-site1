let canvas = document.getElementById('canvas');
let tablo = document.getElementById('tablo');
let ctx = canvas.getContext('2d');
let ctx2 = tablo.getContext('2d');
const vibro1 = {
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
const vibro2 = {
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
const vibro3 = {
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
const vibro4 = {
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
const vibro6 = {
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
const vibro5 = {
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
function launchVibroInterval(num, pos) {
    if (num == 0) {
        vibroInterval = setInterval(drawVibration, 20, pos, vibro1);
    } else if (num == 1) {
        vibroInterval2 = setInterval(drawVibration, 20, pos, vibro2);
    } else if (num == 2) {
        vibroInterval3 = setInterval(drawVibration, 20, pos, vibro3);
    } else if (num == 3) {
        vibroInterval4 = setInterval(drawVibration, 20, pos, vibro4);
    } else if (num == 4) {
        vibroInterval5 = setInterval(drawVibration, 20, pos, vibro5);
    } else if (num == 5) {
        vibroInterval6 = setInterval(drawVibration, 20, pos, vibro6);
    }/*  else if (num == 'player') {
        vibroInterval2 = setInterval(drawVibration, 20, from, playerVibro);
    } */
}
const playerVibro = {
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
let rule = 'Вы можете ходить только вверх, вниз, влево и вправо!';
window.moveLeftInterval = '';
window.moveLeftInterval2 = '';
window.movePlayerInterval = '';
window.playerVibroInterval = '';
window.vibroInterval = '';
window.vibroInterval2 = '';
window.vibroInterval3 = '';
window.vibroInterval4 = '';
window.vibroInterval5 = '';
window.vibroInterval6 = '';

//картинки начало
    //player
let playerImg = new Image();
playerImg.src = 'img/card_skins/player/player.png';


//ENEMIES
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
let icegolemImg = new Image();
icegolemImg.src = 'img/card_skins/enemy/icegolem.png';
let robotgolemImg = new Image();
robotgolemImg.src = 'img/card_skins/enemy/robotgolem.png';
let pikemanImg = new Image();
pikemanImg.src = 'img/card_skins/enemy/pikeman.png';
let trollImg = new Image();
trollImg.src = 'img/card_skins/enemy/troll.png';
let jellyfishImg = new Image();
jellyfishImg.src = 'img/card_skins/enemy/jellyfish.png';
let minotaurImg = new Image();
minotaurImg.src = 'img/card_skins/enemy/minotaur.png';



//BOSS
let tankImg = new Image();
tankImg.src = 'img/card_skins/enemy/tank.png';
let hydra3Img = new Image();
hydra3Img.src = 'img/card_skins/enemy/hydra3.png';
let hydra2Img = new Image();
hydra2Img.src = 'img/card_skins/enemy/hydra2.png';
let hydra1Img = new Image();
hydra1Img.src = 'img/card_skins/enemy/hydra1.png';


//WEAPON
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
let shotgunImg = new Image();
shotgunImg.src = 'img/card_skins/weapon/shotgun.png';
let raygunImg = new Image();
raygunImg.src = 'img/card_skins/weapon/raygun.png';
let tomahawkImg = new Image();
tomahawkImg.src = 'img/card_skins/weapon/tomahawk.png';
let scytheImg = new Image();
scytheImg.src = 'img/card_skins/weapon/scythe.png';
let poleaxeImg = new Image();
poleaxeImg.src = 'img/card_skins/weapon/poleaxe.png';
let shieldImg = new Image();
shieldImg.src = 'img/card_skins/weapon/shield.png';
let flamethrowerImg = new Image();
flamethrowerImg.src = 'img/card_skins/weapon/flamethrower.png';
let mp5Img = new Image();
mp5Img.src = 'img/card_skins/weapon/machinegun.png';
let mineImg = new Image();
mineImg.src = 'img/card_skins/weapon/mine.png';


//HEAL
let heal1Img = new Image();
heal1Img.src = 'img/card_skins/heal/heal1.png';
let heal2Img = new Image();
heal2Img.src = 'img/card_skins/heal/heal2.png';
let heal3Img = new Image();
heal3Img.src = 'img/card_skins/heal/heal3.png';


//GOLD
let goldImg = new Image();
goldImg.src = 'img/card_skins/gold/gold.png';
let diamondImg = new Image();
diamondImg.src = 'img/card_skins/gold/diamond.png';


//SPECIAL
let dropGreenImg = new Image();
dropGreenImg.src = 'img/card_skins/special/drop_green.png'
let dropRedImg = new Image();
dropRedImg.src = 'img/card_skins/special/drop_red.png'
let fireImg = new Image();
fireImg.src = 'img/card_skins/special/fire.png'
let healingImg = new Image();
healingImg.src = 'img/card_skins/special/life_up.png'
let ammoImg = new Image();
ammoImg.src = 'img/card_skins/special/ammo.png'
let arrowsImg = new Image();
arrowsImg.src = 'img/card_skins/special/arrows.png'
let randomTrapImg = new Image();
randomTrapImg.src = 'img/card_skins/special/random_trap.png'


//TRAP
let wolfTrapImg = new Image();
wolfTrapImg.src = 'img/card_skins/trap/wolf_trap.png';
let minefieldImg = new Image();
minefieldImg.src = 'img/card_skins/trap/minefield.png';
let spikesImg = new Image();
spikesImg.src = 'img/card_skins/trap/spikes.png';


//BONUS


//CHEST
let goodChestImg = new Image();
goodChestImg.src = 'img/card_skins/chest/good_chest.png'
let badChestImg = new Image();
badChestImg.src = 'img/card_skins/chest/bad_chest.png'
//картинки конец



let shotgunSnd = new Audio();
shotgunSnd.src = 'audio/shotgun.mp3';