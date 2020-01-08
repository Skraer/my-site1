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
let tankImg = new Image();
tankImg.src = 'img/card_skins/enemy/tank.png';


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


//BONUS


//CHEST
let goodChestImg = new Image();
goodChestImg.src = 'img/card_skins/chest/good_chest.png'
let badChestImg = new Image();
badChestImg.src = 'img/card_skins/chest/bad_chest.png'
//картинки конец



