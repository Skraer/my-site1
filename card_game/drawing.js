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
        if (checkDebuff(pos, 'blindness') > 0) {
            drawGradient(pos);
        }
        if (checkDebuff(pos, 'poison') == true) {
            ctx.drawImage(dropGreenImg, getDebuffImgCoords(pos)[0], getDebuffImgCoords(pos)[1], 20, 20);
        }
    }
    drawRefreshTablo();
    if (player.hp <= 0 ) {
        gameOver();
    }
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
        console.log(true);
        clearAllIntervals();
        drawRefreshField();
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
