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
function drawMovingPlayer(pos, from, x, y, a, b, c, d) {
    ctx.beginPath();
    
    ctx.clearRect(cardPos[from][0] + (x + c), cardPos[from][1] + (y + d), cardPos[from][2] + a, cardPos[from][3] + b);
    ctx.strokeStyle = 'rgb(197, 129, 0)';
    ctx.lineWidth = 3;
    ctx.rect(cardPos[from][0] + x, cardPos[from][1] + y, cardPos[from][2], cardPos[from][3]);
    ctx.stroke();

    ctx.drawImage(field[pos].skin, getImgCoords(from)[0] + x, getImgCoords(from)[1] + y, 100, 100);

    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = '24px Arial';
    ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0] + x, getHpInfoCoords(from)[1] + y);

    if (field[pos].weapon != null) {
        ctx.drawImage(field[pos].weapon.skin, getWeaponImgCoords(from)[0] + x, getWeaponImgCoords(from)[1] + y, 50, 50);
        ctx.fillStyle = 'green';
        ctx.font = '24px Arial';
        ctx.fillText(field[pos].weapon.hp, getWeaponDamageInfoCoords(from)[0] + x, getWeaponDamageInfoCoords(from)[1] + y);
    }

    ctx.closePath();
}
function drawMovingOther(pos, from, x, y, a, b, c, d) {
    ctx.beginPath();
    
    ctx.clearRect(cardPos[from][0] + (x + c), cardPos[from][1] + (y + d), cardPos[from][2] + a, cardPos[from][3] + b);
    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 3;
    ctx.rect(cardPos[from][0] + x, cardPos[from][1] + y, cardPos[from][2], cardPos[from][3]);
    ctx.stroke();

    ctx.drawImage(field[pos].skin, getImgCoords(from)[0] + x, getImgCoords(from)[1] + y, 100, 100);

    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = '24px Arial';
    ctx.fillText(field[pos].hp, getHpInfoCoords(from)[0] + x, getHpInfoCoords(from)[1] + y);

    ctx.closePath();
}
function drawMovingDebuff(pos, from, x, y) {
    if (checkDebuff(pos, 'poison') == true) {
        ctx.drawImage(dropGreenImg, getDebuffImgCoords(from)[0] + x, getDebuffImgCoords(from)[1] + y, 20, 20);
    }
    if (checkDebuff(pos, 'bleeding') > true) {
        ctx.drawImage(dropRedImg, getDebuffImgCoords(from)[0] + x, getDebuffImgCoords(from)[1] + y, 20, 20);
    }
    if (checkDebuff(pos, 'blindness') > 0) {
        ctx.beginPath();
        gradient = ctx.createRadialGradient(cardPos[from][0] + 76 + x, cardPos[from][1] + 93 + y, 140, cardPos[from][0] + 76 + x, cardPos[from][1] + 93 + y, 20);
        gradient.addColorStop(0, "rgb(50, 50, 50)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(-5, -5, 505, 604);
        ctx.closePath();
    }

    if (checkDebuff(pos, 'dangerous') == 'red') {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(getDebuffImgCoords(from)[0] + 6 + x, getDebuffImgCoords(from)[1] + 4 + y, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
    } else if (checkDebuff(pos, 'dangerous') == 'yellow') {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(getDebuffImgCoords(from)[0] + 6 + x, getDebuffImgCoords(from)[1] + 4 + y, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
    } else if (checkDebuff(pos, 'dangerous') == 'green') {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(getDebuffImgCoords(from)[0] + 6 + x, getDebuffImgCoords(from)[1] + 4 + y, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
    }
}
function drawRefreshField() {
    ctx.clearRect(0, 0, 499, 598);
    for (let pos in field) {
        if (field[pos] != null) {
            if (field[pos].type == 'player') {
                drawPlayer(pos);
            } else {
                drawOther(pos);
            }
        } else {
            ctx.beginPath();
            ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
            ctx.closePath();
        }
    }
    for (let pos in field) {
        drawDebuff(pos);
    }
    drawRefreshTablo();
    if (player.hp <= 0 ) {
        gameOver();
    }
}
function drawRefreshTablo() {
    ctx2.clearRect(0, 0, 499, 55);
    ctx2.beginPath();
    ctx2.drawImage(goldImg, 20, 10, 40, 40);
    ctx2.fillStyle = 'rgb(255, 215, 0)';
    ctx2.font = '24px Arial';
    ctx2.fillText(player.gold, 80, 40);
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.strokeStyle = 'rgb(100, 100, 100)';
    ctx2.lineWidth = 2;
    ctx2.rect(140, 10, 35, 35);
    ctx2.stroke();
    ctx2.rect(200, 10, 35, 35);
    ctx2.stroke();

    ctx2.fillStyle = 'rgba(140, 140, 140, 0.2)';
    if (player.weapon != null) {
        //клетки выбора оружия
        ctx2.fillRect(140, 10, 35, 35);
        ctx2.drawImage(player.weapon.skin, 140, 10, 35, 35);
        //кнопка продажи оружия
        ctx2.beginPath();
        ctx2.drawImage(player.weapon.skin, 390, 10, 35, 35);
        ctx2.strokeStyle = 'rgb(190, 190, 190)';
        ctx2.lineCap = 'round';
        ctx2.lineJoin = 'round';
        ctx2.moveTo(425, 27);
        ctx2.lineTo(450, 27);
        ctx2.moveTo(440, 20);
        ctx2.lineTo(450, 27);
        ctx2.lineTo(440, 34);
        ctx2.drawImage(goldImg, 455, 17, 20, 20);
        ctx2.stroke();
        ctx2.closePath();
    }
    if (player.weapon2 != null) {
        ctx2.drawImage(player.weapon2.skin, 200, 10, 35, 35);
    }

    //магазин
    ctx2.beginPath();
    ctx2.font = '24px Arial';
    ctx2.strokeStyle = 'rgb(140, 140, 140)';
    ctx2.fillStyle = 'rgb(140, 140, 140)';
    ctx2.rect(270, 10, 90, 30);
    ctx2.stroke();
    ctx2.textAlign = 'center';
    ctx2.fillText('SHOP', 315, 33);
    ctx2.closePath();

    ctx2.closePath();
}
function drawShop() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(47, 50, 51, 0.5)';
    ctx.fillRect(0, 0, 499, 598);

    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.fillStyle = 'rgb(47, 50, 51)';
    ctx.lineWidth = 3;
    ctx.rect(40, 40, 419, 518);
    ctx.fill();
    ctx.stroke();

    function drawItem(l, r, t, b, price, img, text) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(180, 180, 180)';
        ctx.moveTo(l + 35, t);
        ctx.lineTo(l, t);
        ctx.lineTo(l, b);
        ctx.lineTo(r, b);
        ctx.lineTo(r, t + 15);
        ctx.stroke();
        ctx.drawImage(img, l + 5, t + 10, 40, 40);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'rgb(180, 180, 180)';
        ctx.fillText(text, l + 50, t + 50);
        ctx.drawImage(goldImg, l + 40, t - 15, 30, 30);
        ctx.fillStyle = 'rgb(255, 215, 0)';
        ctx.font = '24px Arial';
        ctx.fillText(price, l + 75, t + 10);
        
        ctx.closePath();
    }

    //отступы снизу 25
    //лечение 1
    drawItem(65, 165, 65, 120, 50, heal1Img, 'x1');
    //лечение 5
    drawItem(65, 165, 145, 200, 250, heal1Img, 'x5');
    //рандомная ловушка
    drawItem(65, 165, 225, 280, 200, randomTrapImg, 'x1');
    //поддержка с воздуха
    drawItem(65, 165, 305, 360, 300, arrowsImg, 'x2');
    //аммуниция
    drawItem(65, 165, 385, 440, 100, ammoImg, 'x2');

    ctx.closePath();
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
        drawRefreshField();
    }
}

function drawMoveCardLeft(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        if (field[pos].type != 'player') {
            drawMovingOther(pos, from, -x, 0, 7, 4, 0, -2);
        } else {
            drawMovingPlayer(pos, from, -x, 0, 7, 4, 0, -2);
        }
        drawMovingDebuff(pos, from, -x, 0);
        field[pos].changeCoord += 5;
    } else {
        clearAllIntervals();
        drawRefreshField();
    }
}
function drawMoveCardRight(pos, from) {
    let x = field[pos].changeCoord;
    if (x <= 1) {
        ctx.clearRect(cardPos[pos][0]-2, cardPos[pos][1]-2, cardPos[pos][2]+4, cardPos[pos][3]+4);
    }
    if (x < 163) {
        if (field[pos].type != 'player') {
            drawMovingOther(pos, from, x, 0, 4, 4, -7, -2);
        } else {
            drawMovingPlayer(pos, from, x, 0, 4, 4, -7, -2);
        }
        drawMovingDebuff(pos, from, x, 0);
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
            drawMovingOther(pos, from, 0, -x, 4, 8, -2, 0);
        } else {
            drawMovingPlayer(pos, from, 0, -x, 4, 8, -2, 0);
        }
        drawMovingDebuff(pos, from, 0, -x);
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
            drawMovingOther(pos, from, 0, x, 4, 8, -2, -8);
        } else {
            drawMovingPlayer(pos, from, 0, x, 4, 8, -2, -8);
        }
        drawMovingDebuff(pos, from, 0, x);
        field[pos].changeCoord += 6;
    } else {
        clearAllIntervals();
        drawRefreshField();
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
function drawGradient(pos) {
    ctx.beginPath();
    gradient = ctx.createRadialGradient(cardPos[pos][0]+76, cardPos[pos][1]+93, 140, cardPos[pos][0]+76, cardPos[pos][1]+93, 20);
    gradient.addColorStop(0, "rgb(50, 50, 50)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(-5, -5, 505, 604);
    ctx.closePath();
}
function drawDebuff(pos) {
    if (checkDebuff(pos, 'blindness') > 0) {
        drawGradient(pos);
    }
    if (checkDebuff(pos, 'poison') == true) {
        ctx.drawImage(dropGreenImg, getDebuffImgCoords(pos)[0], getDebuffImgCoords(pos)[1], 20, 20);
    }
    if (checkDebuff(pos, 'bleeding') > 0) {
        ctx.drawImage(dropRedImg, getDebuffImgCoords(pos)[0], getDebuffImgCoords(pos)[1], 20, 20);
    }
    if (checkDebuff(pos, 'dangerous') == 'red') {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(getDebuffImgCoords(pos)[0]+6, getDebuffImgCoords(pos)[1]+4, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
    } else if (checkDebuff(pos, 'dangerous') == 'yellow') {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(getDebuffImgCoords(pos)[0]+6, getDebuffImgCoords(pos)[1]+4, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
    } else if (checkDebuff(pos, 'dangerous') == 'green') {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(getDebuffImgCoords(pos)[0]+6, getDebuffImgCoords(pos)[1]+4, 7, 0, getRadians(360));
        ctx.fill();
        ctx.closePath();
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
    for (let key in field) {
        field[key].changeCoord = 1;
    }
    // drawRefreshField();
}
function checkDebuff(pos, name) {
    if (field[pos].debuff != undefined) {
        return field[pos].debuff[name];
    } else {
        return;
    }
}
function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}