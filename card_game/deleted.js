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
function drawMoveCardLeft(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        if (field[pos].type != 'player') {
            drawMoveOther(pos, from, -x, 0, 7, 4, 0, -2);
            // ctx.beginPath();
    
            // ctx.clearRect(cardPos[from][0]-x, cardPos[from][1]-2, cardPos[from][2]+7, cardPos[from][3]+4);
            // ctx.strokeStyle = 'rgb(100, 100, 100)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0]-x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();
        
            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0]-x, getImgCoords(from)[1], 100, 100);
        
            // ctx.fillStyle = 'red';
            // ctx.textAlign = 'left';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]-x, getHpInfoCoords(from)[1]);
        
            // ctx.closePath();
    
        } else {
            drawMovePlayer(pos, from, -x, 0, 7, 4, 0, -2);
            // ctx.beginPath();

            // ctx.clearRect(cardPos[from][0]-x, cardPos[from][1]-2, cardPos[from][2]+7, cardPos[from][3]+4);

            // ctx.strokeStyle = 'rgb(197, 129, 0)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0]-x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();

            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0]-x, getImgCoords(from)[1], 100, 100);

            // if (field[pos].weapon != null) {
            //     ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0]-x, getWeaponImgCoords(from)[1], 50, 50);
            //     ctx.fillStyle = 'green';
            //     ctx.font = '24px Arial';
            //     ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0]-x, getWeaponDamageInfoCoords(from)[1]);
            // }
    
            // ctx.fillStyle = 'red';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]-x, getHpInfoCoords(from)[1]);

            // ctx.closePath();
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
        drawRefreshField();
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
            drawMoveOther(pos, from, x, 0, 4, 4, -7, -2);
            // ctx.beginPath();
    
            // ctx.clearRect(cardPos[from][0]+(x-7), cardPos[from][1]-2, cardPos[from][2]+4, cardPos[from][3]+4);;
            // ctx.strokeStyle = 'rgb(100, 100, 100)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0]+x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();
        
            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0]+x, getImgCoords(from)[1], 100, 100);
        
            // ctx.fillStyle = 'red';
            // ctx.textAlign = 'left';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]+x, getHpInfoCoords(from)[1]);
        
            // ctx.closePath();
        } else {
            drawMovePlayer(pos, from, x, 0, 4, 4, -7, -2);
            // ctx.beginPath();

            // ctx.clearRect(cardPos[from][0]+(x-7), cardPos[from][1]-2, cardPos[from][2]+4, cardPos[from][3]+4);

            // ctx.strokeStyle = 'rgb(197, 129, 0)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0]+x, cardPos[from][1], cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();

            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0]+x, getImgCoords(from)[1], 100, 100);

            // if (field[pos].weapon != null) {
            //     ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0]+x, getWeaponImgCoords(from)[1], 50, 50);
            //     ctx.fillStyle = 'green';
            //     ctx.font = '24px Arial';
            //     ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0]+x, getWeaponDamageInfoCoords(from)[1]);
            // }
    
            // ctx.fillStyle = 'red';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0]+x, getHpInfoCoords(from)[1]);

            // ctx.closePath();
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
        drawRefreshField();
    }
}
function drawMoveCardTop(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        if (field[pos].type != 'player') {
            drawMoveOther(pos, from, 0, -x, 4, 8, -2, 0);
            // ctx.beginPath();
    
            // ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]-x, cardPos[from][2]+4, cardPos[from][3]+8);;
            // ctx.strokeStyle = 'rgb(100, 100, 100)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0], cardPos[from][1]-x, cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();
        
            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]-x, 100, 100);
        
            // ctx.fillStyle = 'red';
            // ctx.textAlign = 'left';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]-x);
        
            // ctx.closePath();
        } else {
            drawMovePlayer(pos, from, 0, -x, 4, 8, -2, 0);

            // ctx.beginPath();

            // ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]-x, cardPos[from][2]+4, cardPos[from][3]+8);

            // ctx.strokeStyle = 'rgb(197, 129, 0)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0], cardPos[from][1]-x, cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();

            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]-x, 100, 100);

            // if (field[pos].weapon != null) {
            //     ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0], getWeaponImgCoords(from)[1]-x, 50, 50);
            //     ctx.fillStyle = 'green';
            //     ctx.font = '24px Arial';
            //     ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0], getWeaponDamageInfoCoords(from)[1]-x);
            // }
    
            // ctx.fillStyle = 'red';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]-x);

            // ctx.closePath();
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
        drawRefreshField();
    }
}
function drawMoveCardBottom(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 196) {
        if (field[pos].type != 'player') {
            drawMoveOther(pos, from, 0, x, 4, 8, -2, -8);
            // ctx.beginPath();
    
            // ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]+(x-8), cardPos[from][2]+4, cardPos[from][3]+8);;
            // ctx.strokeStyle = 'rgb(100, 100, 100)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0], cardPos[from][1]+x, cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();
        
            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]+x, 100, 100);
        
            // ctx.fillStyle = 'red';
            // ctx.textAlign = 'left';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]+x);
        
            // ctx.closePath();
        } else {
            drawMovePlayer(pos, from, 0, x, 4, 8, -2, -8);

            // ctx.beginPath();

            // ctx.clearRect(cardPos[from][0]-2, cardPos[from][1]+(x-8), cardPos[from][2]+4, cardPos[from][3]+8);

            // ctx.strokeStyle = 'rgb(197, 129, 0)';
            // ctx.lineWidth = 3;
            // ctx.rect(cardPos[from][0], cardPos[from][1]+x, cardPos[from][2], cardPos[from][3]);
            // ctx.stroke();

            // ctx.drawImage(field[pos].skin, getImgCoords(from)[0], getImgCoords(from)[1]+x, 100, 100);

            // if (field[pos].weapon != null) {
            //     ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0], getWeaponImgCoords(from)[1]+x, 50, 50);
            //     ctx.fillStyle = 'green';
            //     ctx.font = '24px Arial';
            //     ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0], getWeaponDamageInfoCoords(from)[1]+x);
            // }
    
            // ctx.fillStyle = 'red';
            // ctx.font = '24px Arial';
            // ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0], getHpInfoCoords(from)[1]+x);

            // ctx.closePath();
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
        drawRefreshField();
    }
}
