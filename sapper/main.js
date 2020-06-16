const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('input[name="startGame"]');
const gameWrapper = document.querySelector('.game-wrapper');
const gameOverPopup = document.querySelector('.game-over');
const btnYes = gameOverPopup.querySelector('.game-over__btn[value="yes"]');

const victoryPopup = document.querySelector('.victory');
const btnYes2 = victoryPopup.querySelector('.victory__btn[value="yes"]');

let field;
let debug = false;

function allInfoAboutCell(i) {
    console.log('Индекс : ' + i);
    console.log('Тип ячейки: ' + field.matrix.main[i]);
    console.log('Помощь : ' + field.matrix.help[i]);
    console.log('Закрыто : ' + field.matrix.closed[i]);
    console.log('Есть флаг : ' + field.matrix.flagged[i]);
    
}

const drawing = {
    digit(num, x, y) {
        if (+num != 0) {
            let color = {
                '1': '#45bd00',
                '2': '#83bb00',
                '3': '#c1cf00',
                '4': '#c9bc00',
                '5': '#c5b100',
                '6': '#c08d00',
                '7': '#c56900',
                '8': '#c71e00'
            };
            ctx.font = '900 30px Arial';
            ctx.textBaseline = 'top';
            ctx.fillStyle = color[num];
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.fillText(num, x+5, y+3);
            ctx.strokeText(num, x+5, y+3);
        }
    },
    flag(x, y) {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 4;
        ctx.moveTo(x + 10, y + 5);
        ctx.lineTo(x + 10, y + 30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 6);
        ctx.lineTo(x + 23, y + 14);
        ctx.lineTo(x + 10, y + 21);
        ctx.closePath();
        ctx.stroke();
    },
    rect(x, y) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, field.cellSize, field.cellSize);
    },
    empty(x, y) {
        let arr = [
            '#646464', '#858585', '#9e9e9e',
            '#b0b0b0', '#c9c9c9', '#e2e2e2',
            '#f7f7f7', '#ffffff'
        ];
        let cs = field.cellSize;
        ctx.clearRect(x, y, cs, cs);

        ctx.lineWidth = 1;

        for (let i = 0; i <= 7; i++) {
            ctx.strokeStyle = arr[i];
            ctx.strokeRect(x + i, y + i, cs - (i * 2), cs - (i * 2));
        }
        ctx.fillStyle = arr[7];
        ctx.fillRect(x + 7, y + 7, cs - 14, cs - 14);
        // if (after !== null) after();
    },
    closed(x, y) {
        let arr = [
            '#dfdfff', '#ceceff', '#aeaeff',
            '#9b9bff', '#8080ff', '#6a6aff',
            '#5151ff', '#2020ff'
        ];
        let cs = field.cellSize;
        ctx.lineWidth = 1;
        ctx.clearRect(x, y, cs, cs);
        
        // ctx.strokeStyle = arr[0];
        // ctx.strokeRect(x + 0, y + 0, cs - 0, cs - 0);
        // ctx.strokeStyle = arr[1];
        // ctx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);
        // ctx.strokeStyle = arr[2];
        // ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
        // ctx.strokeStyle = arr[3];
        // ctx.strokeRect(x + 3, y + 3, cs - 6, cs - 6);
        // ctx.strokeStyle = arr[4];
        // ctx.strokeRect(x + 4, y + 4, cs - 8, cs - 8);
        // ctx.strokeStyle = arr[5];
        // ctx.strokeRect(x + 5, y + 5, cs - 10, cs - 10);
        // ctx.strokeStyle = arr[6];
        // ctx.strokeRect(x + 6, y + 6, cs - 12, cs - 12);
        // ctx.strokeStyle = arr[7];
        // ctx.fillStyle = arr[7];
        // ctx.strokeRect(x + 7, y + 7, cs - 14, cs - 14);
        // ctx.fillRect(x + 7, y + 7, cs - 14, cs - 14);
        for (let i = 0; i <= 7; i++) {
            ctx.strokeStyle = arr[i];
            ctx.strokeRect(x + i, y + i, cs - (i * 2), cs - (i * 2));
        }
        ctx.fillStyle = arr[7];
        ctx.fillRect(x + 7, y + 7, cs - 14, cs - 14);
    },
    bomb(x, y) {
        let img = new Image();
        img.src = 'img/bomb.png';
        img.onload = () => {
            this.empty(x, y);
            // ctx.clearRect(x, y, field.cellSize, field.cellSize);
            ctx.drawImage(img, x, y, field.cellSize, field.cellSize);
        };
    },
    gameOverScreen() {
        // let popupWidth = 400,
        //     popupHeight = 300,
        //     centerX = canvas.width / 2,
        //     centerY = canvas.height / 2,
        //     x = centerX - (popupWidth / 2),
        //     y = centerY - (popupHeight / 2);

        /* DRAW RECTANGLE */
        ctx.fillStyle = '#000000bb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = '#cccccc';
        // ctx.fillStyle = '#777777';
        // ctx.fillRect(x, y, popupWidth, popupHeight);
        // ctx.strokeRect(x, y, popupWidth, popupHeight);

        /* DRAW TEXT */
        // ctx.strokeStyle = '#0057da';
        // ctx.fillStyle = '#227aff';
        // ctx.textBaseline = 'top';
        // ctx.textAlign = 'center';
        // ctx.font = '700 40px sans-serif';
        // ctx.fillText('Вы проиграли.', centerX, y + 20);
        // ctx.strokeText('Вы проиграли.', centerX, y + 20);
        // ctx.fillText('Начать другую', centerX, y + 65);
        // ctx.strokeText('Начать другую', centerX, y + 65);
        // ctx.fillText('игру?', centerX, y + 110);
        // ctx.strokeText('игру?', centerX, y + 110);

        /* DRAW BUTTONS */
        


        // ctx.closePath();
    }
};

class Matrix {
    constructor (fieldWidth, fieldHeight, fieldSize, cellSize) {
        this.params = {
            fieldWidth: fieldWidth,
            fieldHeight: fieldHeight,
            fieldSize: fieldSize,
            cellSize: cellSize,
        };
        this.bombs = Math.round((this.params.fieldSize * 2) / 15);

        this.main = this.getMatrix('main');
        this.help = this.getMatrix('help');
        this.closed = this.getMatrix('closed');
        this.flagged = this.getMatrix('flag');
        // console.log(this.bombs);
        
        this.setHelpCells();
    }
    getMatrix(type) {
        let matrix = [];
        matrix.length = this.params.fieldSize;

        switch (type) {
            case 'main':
                matrix.fill('empty', 0);
                let bombCells = new Set();
                for (let i = 0; bombCells.size < this.bombs; i++) {
                    let pos = Math.floor(Math.random() * this.params.fieldSize);
                    bombCells.add(pos);
                }
                bombCells = Array.from(bombCells).sort((a, b) => a - b);
                for (let i = 0; i < bombCells.length; i++) {
                    matrix[bombCells[i]] = 'bomb';
                }
                break;
            case 'help':
                matrix.fill(0, 0);
                // this.setHelpCells();
                break;
            case 'closed':
                matrix.fill(1, 0);
                break;
            case 'flag':
                matrix.fill(0, 0);
                break;
            default:
                break;
        }
        return matrix;
    }
    setHelpCells() {
        let fw = this.params.fieldWidth,
            fh = this.params.fieldHeight,
            matrix = this.main,
            matrixHelp = this.help;

        console.log(fw);
        

        this.map(function({i, cell, row}) {
            
            let nw  = i - fw - 1,
                n   = i - fw,
                ne  = i - fw + 1,
                w   = i - 1,
                e   = i + 1,
                sw  = i + fw - 1,
                s   = i + fw,
                se  = i + fw + 1;
            
            if (matrix[i] === 'empty') {
                let digit = 0;
                digit += row - 1 >= 0 && matrix[n] === 'bomb';
                digit += row - 1 >= 0 && cell - 1 >= 0 && matrix[nw] === 'bomb';
                digit += row - 1 >= 0 && cell + 1 < fw && matrix[ne] === 'bomb';
                digit += row + 1 < fh && matrix[s] === 'bomb';
                digit += row + 1 < fh && cell - 1 >= 0 && matrix[sw] === 'bomb';
                digit += row + 1 < fh && cell + 1 < fw && matrix[se] === 'bomb';
                digit += cell - 1 >= 0 && matrix[w] === 'bomb';
                digit += cell + 1 < fw && matrix[e] === 'bomb';

                // matrixHelp[i] = digit1 + digit2 + digit3 + 
                //     digit4 + digit5 + digit6 + digit7 + digit8;
                    // console.log(s);
                    
                matrixHelp[i] += digit;
        
                if (matrixHelp[i] > 0) {
                    matrix[i] = 'help';
                    // drawing.digit(matrixHelp[i], x, y);
                }



                // let conditions = [
                //     (row - 1 >= 0 && matrix[n] === 'bomb'),
                //     (row - 1 >= 0 && cell - 1 >= 0 && matrix[nw] === 'bomb'),
                //     (row - 1 >= 0 && cell + 1 < fw && matrix[ne] === 'bomb'),
                //     (row + 1 < fh && matrix[s] === 'bomb'),
                //     (row + 1 < fh && cell - 1 >= 0 && matrix[sw] === 'bomb'),
                //     (row + 1 < fh && cell + 1 < fw && matrix[se] === 'bomb'),
                //     (cell - 1 >= 0 && matrix[w] === 'bomb'),
                //     (cell + 1 < fw && matrix[e] === 'bomb')
                // ];
                // conditions.forEach((elem) => {
                //     matrixHelp[i] += +elem;
                //     if (matrixHelp[i] > 0) {
                //         matrix[i] = 'help';
                //     }
                // });
                
            }
        });
    }
    getSetEmptyCells(from, withBombs = false) {
        let row = Math.floor(from / this.params.fieldHeight),
            cell = from - (this.params.fieldWidth * row),
            fh = this.params.fieldHeight,
            fw = this.params.fieldWidth;
        let set = new Set();
        
        let n = from - fw,
            s = from + fw,
            w = from - 1,
            e = from + 1;
        let nw = from - fw - 1,
            ne = from - fw + 1,
            sw = from + fw - 1,
            se = from + fw + 1;
        let existN = row - 1 >= 0,
            existS = row + 1 < fh,
            existW = cell - 1 >= 0,
            existE = cell + 1 < fw;
        
        /* CHECK BASIC CELLS */
        function checkBasicCell(ind) {
            if (this.isEmpty(ind)) {
                set.add(ind);
                this.closed[ind] = 0;
                for (let val of this.getSetEmptyCells(ind)) {
                    set.add(val);
                }
            } else if (this.isHelp(ind)) {
                set.add(ind);
                this.closed[ind] = 0;
            } else if (withBombs && this.isBomb(ind)) {
                set.add(ind);
                // this.closed[ind] = 0;
            }
        }
        if (existN) {
            checkBasicCell.call(this, n);
        }
        if (existS) {
            checkBasicCell.call(this, s);
        }
        if (existW) {
            checkBasicCell.call(this, w);
        }
        if (existE) {
            checkBasicCell.call(this, e);
        }

        /* CHECK DIAGONALLY */
        if (existN && existW && this.isHelp(nw)) {
            set.add(nw);
            this.closed[nw] = 0;
        }
        if (existN && existE && this.isHelp(ne)) {
            set.add(ne);
            this.closed[ne] = 0;
        }
        if (existS && existW && this.isHelp(sw)) {
            set.add(sw);
            this.closed[sw] = 0;
        }
        if (existS && existE && this.isHelp(se)) {
            set.add(se);
            this.closed[se] = 0;
        }

        /* CHECK FLAGGED CELLS */
        for (let val of set) {
            if (this.flagged[val] === 1) {
                set.delete(val);
            }
        }

        return set;
    }
    checkCorrectFlagsAround(from) {
        let row = Math.floor(from / this.params.fieldHeight),
            cell = from - (this.params.fieldWidth * row),
            fh = this.params.fieldHeight,
            fw = this.params.fieldWidth;
        let set = new Set();
        
        let n = from - fw,
            s = from + fw,
            w = from - 1,
            e = from + 1;
        let nw = from - fw - 1,
            ne = from - fw + 1,
            sw = from + fw - 1,
            se = from + fw + 1;
        let existN = row - 1 >= 0,
            existS = row + 1 < fh,
            existW = cell - 1 >= 0,
            existE = cell + 1 < fw;

        // let arr1 = [n, s, w, e];
        // let arr2 = [nw, ne, sw, se];

        let flags = 0;

        if (existN) {
            if (this.isFlagged(n)) flags++;
            if (existW && this.isFlagged(nw)) flags++;
            if (existE && this.isFlagged(ne)) flags++;
        }
        if (existS) {
            if (this.isFlagged(s)) flags++;
            if (existW && this.isFlagged(sw)) flags++;
            if (existE && this.isFlagged(se)) flags++;
        }
        if (existW) {
            if (this.isFlagged(w)) flags++;
        }
        if (existE) {
            if (this.isFlagged(e)) flags++;
        }

        if (flags === this.help[from]) return true;
        else return false;
        
    }
    getSetEmptyAround(from) {
        // let row = Math.floor(from / this.params.fieldHeight),
        //     cell = from - (this.params.fieldWidth * row),
        //     fh = this.params.fieldHeight,
        //     fw = this.params.fieldWidth;
        // let set = new Set();
        
        // let n = from - fw,
        //     s = from + fw,
        //     w = from - 1,
        //     e = from + 1;
        // let nw = from - fw - 1,
        //     ne = from - fw + 1,
        //     sw = from + fw - 1,
        //     se = from + fw + 1;
        // let existN = row - 1 >= 0,
        //     existS = row + 1 < fh,
        //     existW = cell - 1 >= 0,
        //     existE = cell + 1 < fw;
        
        
    }
    compareClosedBombs() {
        let closedCount = 0,
            correctCount = 0;
        this.closed.forEach(elem => {closedCount += elem;});

        if (closedCount === this.bombs) {
            for (let i = 0; i < this.closed.length; i++) {
                correctCount += +(this.closed[i] && this.isBomb(i));
            }

            if (correctCount === this.bombs) {
                console.log('ПОБЕДА!');
            }
        }
    }
    controlGameState() {
        let closedCount = 0,
            correctCount = 0;
        this.closed.forEach(elem => {closedCount += elem;});

        if (closedCount === this.bombs) {
            for (let i = 0; i < this.closed.length; i++) {
                correctCount += +(this.closed[i] && this.isBomb(i));
            }

            if (correctCount === this.bombs) {
                victory();
                // console.log('ПОБЕДА!');
            }
        }
        
        for (let i = 0; i < this.main.length; i++) {
            if (this.isBomb(i) && !this.isClosed(i)) {
                gameOver();
                allInfoAboutCell(i);
            }
        }
    }
    map(callback = undefined) {
        let result;
        for (let i = 0; i < this.main.length && result === undefined; i++) {
            let row = Math.floor(i / this.params.fieldHeight);
            let cell = i - (this.params.fieldWidth * row);
            let y = row * this.params.cellSize;
            let x = cell * this.params.cellSize;
            result = callback({i, cell, row, x, y});
        }
        return result;
    }
    isEmpty(i) {
        if (this.main[i] === 'empty' && this.closed[i] === 1) {
            return true;
        } else {return false;}
    }
    isHelp(i) {
        return this.main[i] === 'help';
    }
    isBomb(i) {
        return this.main[i] === 'bomb';
    }
    isFlagged(i) {
        return this.flagged[i] === 1;
    }
    isClosed(i) {
        return this.closed[i] === 1;
    }
}

class Field {
    constructor(fieldWidth, fieldHeight, cellSize) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.fieldSize = fieldWidth * fieldHeight;   //225
        this.cellSize = cellSize;
        
        this.matrix = new Matrix(
            this.fieldWidth, 
            this.fieldHeight, 
            this.fieldSize, 
            this.cellSize);
    }
    drawField() {
        let fw = this.fieldWidth,
            fh = this.fieldHeight,
            cs = this.cellSize,
            matrix = this.matrix.main,
            // matrixClosed = this.matrix.closed,
            matrixHelp = this.matrix.help;
            // isBomb = this.matrix.isBomb;

        const getSrc = (i) => 'img/'+matrix[i]+'.png';

        this.matrix.map(function({i, x, y, cell, row}) {
            let img = new Image();
            img.src = getSrc(i);
            // img.src = images[matrix[i]];
            let nw  = i - fw - 1,
                n   = i - fw,
                ne  = i - fw + 1,
                w   = i - 1,
                e   = i + 1,
                sw  = i + fw - 1,
                s   = i + fw,
                se  = i + fw + 1;

            const isBomb = (ind) => matrix[ind] === 'bomb';
        
            img.onload = () => {
                ctx.drawImage(img, x, y, cs, cs);
                if (matrix[i] === 'empty') {
                    let digit = 0;
                    digit += row - 1 >= 0 && isBomb(n);
                    digit += row - 1 >= 0 && cell - 1 >= 0 && isBomb(nw);
                    digit += row - 1 >= 0 && cell + 1 < fw && isBomb(ne);
                    digit += row + 1 < fh && isBomb(s);
                    digit += row + 1 < fh && cell - 1 >= 0 && isBomb(sw);
                    digit += row + 1 < fh && cell + 1 < fw && isBomb(se);
                    digit += cell - 1 >= 0 && isBomb(w);
                    digit += cell + 1 < fw && isBomb(e);
                    matrixHelp[i] += digit;
            
                    // if (matrixHelp[i] > 0) {
                    //     matrix[i] = 'help';
                    //     drawing.digit(matrixHelp[i], x, y);
                    // }
        
                }
                let img2 = new Image();
                img2.src = 'img/closed.png';
                img2.onload = () => {ctx.drawImage(img2, x, y, cs, cs);};
            };
        });
    }
    drawClosed() {
        this.matrix.map(function({x, y}) {
            drawing.closed(x, y);
        });
    }

};


function startGame() {
    let widthInput = document.querySelector('input[name="fieldWidth"]');
    let heightInput = document.querySelector('input[name="fieldHeight"]');
    field = new Field(+widthInput.value, +heightInput.value, 32);
    console.log(+widthInput.value);
    console.log(+heightInput.value);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawClosed();

    gameOverPopup.classList.add('hidden');
    victoryPopup.classList.add('hidden');
    btnYes.removeEventListener('click', startGame);
    btnYes2.removeEventListener('click', startGame);
    canvas.addEventListener('contextmenu', allowDrawingFlags);
    canvas.addEventListener('click', clickAction);
    canvas.addEventListener('dblclick', dblClickAction);

}
startBtn.addEventListener('click', startGame);


function clickAction() {
    let e = event;
    let cx = e.offsetX,
        cy = e.offsetY;
    let [i, x, y] = field.matrix.map(function({x, y, i}) {
        if ((cx >= x && cx <= x + field.cellSize) && (cy >= y && cy <= y + field.cellSize)) {
            return [i, x, y];
        }
    });
    
    let type = field.matrix.main[i];

    if (debug) {
        console.log(i + ': ' + type);
    }

    if (field.matrix.closed[i] === 1 && !field.matrix.isFlagged(i)) {
        field.matrix.closed[i] = 0;

        switch (type) {
            case 'bomb':
                // drawing.empty(x, y);
                drawing.bomb(x, y);
                // console.log('Взорван');
                break;
            case 'empty':
                drawing.empty(x, y);
                let emptyCells = field.matrix.getSetEmptyCells(i);
                for (let ind of emptyCells) {
                    field.matrix.map(function({i, x, y}) {
                        if (ind === i) {
                            drawing.empty(x, y);
                            drawing.digit(field.matrix.help[i], x, y);
                        }
                    });
                }
                break;
            case 'help':
                drawing.empty(x, y);
                drawing.digit(field.matrix.help[i], x, y);
                break;
            default:
                break;
        }
        field.matrix.controlGameState();

    } else if (field.matrix.isFlagged(i)) {
        console.log('Здесь установлен флаг');
        
    }
}
function dblClickAction() {
    let e = event;
    let cx = e.offsetX,
        cy = e.offsetY;
    let [i, x, y] = field.matrix.map(function({x, y, i}) {
        if ((cx >= x && cx <= x + field.cellSize) && (cy >= y && cy <= y + field.cellSize)) {
            return [i, x, y];
        }
    });

    

    if (!field.matrix.isClosed(i) && field.matrix.isHelp(i)) {
        // console.log(field.matrix.checkCorrectFlagsAround(i));
        if (field.matrix.checkCorrectFlagsAround(i)) {
            console.log(field.matrix.checkCorrectFlagsAround(i));
            // field.matrix.getSetEmptyCells(i);

            let emptyCells = field.matrix.getSetEmptyCells(i, true);
            for (let ind of emptyCells) {
                field.matrix.map(function({i, x, y}) {
                    if (ind === i && field.matrix.main[i] !== 'bomb') {
                        drawing.empty(x, y);
                        drawing.digit(field.matrix.help[i], x, y);
                    } else if (ind === i && field.matrix.main[i] === 'bomb') {
                        // drawing.empty(x, y);
                        drawing.bomb(x, y);
                    }
                });
            }

        }
        
        field.matrix.controlGameState();
    }
    
}

function allowDrawingFlags() {
    event.preventDefault();
    let cx = event.offsetX;
    let cy = event.offsetY;

    let [i, x, y] = field.matrix.map(function({x, y, i}) {
        if ((cx >= x && cx <= x + field.cellSize) && 
            (cy >= y && cy <= y + field.cellSize)) {
            return [i, x, y];
        }
    });
    
    if (field.matrix.isClosed(i) && !field.matrix.isFlagged(i)) {
        field.matrix.flagged[i] = 1;
        drawing.flag(x, y);
        field.matrix.controlGameState();
    } else if (field.matrix.isFlagged(i)) {
        field.matrix.flagged[i] = 0;
        drawing.closed(x, y);
        field.matrix.controlGameState();

        // console.log('Флаг уже установлен');
    } else {
        allInfoAboutCell(i);
        console.log('Нельзя установить флаг в этом месте');
    }
}

function victory() {
    canvas.removeEventListener('contextmenu', allowDrawingFlags);
    canvas.removeEventListener('click', clickAction);
    canvas.removeEventListener('dblclick', dblClickAction);
    drawing.gameOverScreen();
    victoryPopup.classList.remove('hidden');

    // let btnYes = gameOverPopup.querySelector('.game-over__btn[value="yes"]');
    // let btnNo = gameOverPopup.querySelector('.game-over__btn[value="no"]');

    btnYes2.addEventListener('click', startGame);
}

function gameOver() {
    canvas.removeEventListener('contextmenu', allowDrawingFlags);
    canvas.removeEventListener('click', clickAction);
    canvas.removeEventListener('dblclick', dblClickAction);
    drawing.gameOverScreen();
    gameOverPopup.classList.remove('hidden');

    // let btnYes = gameOverPopup.querySelector('.game-over__btn[value="yes"]');
    // let btnNo = gameOverPopup.querySelector('.game-over__btn[value="no"]');

    btnYes.addEventListener('click', startGame);
    
    // let gameOverElem = document.createElement('div');
    // gameOverElem.classList.add('game-over');
    // let textElem = document.createElement('div');
    // textElem.classList.add('game-over__text');
    // textElem.textContent = "Вы проиграли. Начать другую игру?";
    // let btnYes = document.createElement('button');
    // btnYes.textContent = 'Ага';
    // btnYes.value = 'yes';
    // let btnNo = document.createElement('button');
    // btnNo.textContent = 'Не';
    // btnNo.value = 'no';
    // btnYes.classList.add('game-over__btn');
    // btnNo.classList.add('game-over__btn');

    // gameOverElem.appendChild(textElem);
    // gameOverElem.appendChild(btnYes);
    // gameOverElem.appendChild(btnNo);
    // gameWrapper.appendChild(gameOverElem);
    

}

//     // let matrixClosedDebug = function() {
//     //     let str = '';
//     //     let count = 0;
//     //     passMatrix(function({i}) {
//     //         if (count < 14) {
//     //             str += matrixClosed[i] + ' ';
//     //             count++;
//     //         } else {
//     //             str += '\n';
//     //             count = 0;
//     //         }
//     //     });
//     //     return str;
//     // }();
//     // console.log(matrixClosedDebug);































