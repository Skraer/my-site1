let image = document.querySelector('.image');

let imageElements = {
    balustrade: document.querySelector('.balustrade'),
    columns: document.querySelector('.columns'),
    cornices: document.querySelector('.cornices'),
    facing: document.querySelector('.facing'),
    groundStone: document.querySelector('.ground-stone'),
    pavingStones: document.querySelector('.paving-stones'),
    platbands: document.querySelector('.platbands'),
    rusts: document.querySelector('.rusts'),
    stairs: document.querySelector('.stairs'),
    windowsills: document.querySelector('.windowsills'),
}

let balustradeCoords = [
{
    x: [35, 41],
    y: [72, 80],
},
{
    x: [52.5, 59],
    y: [72, 80],
}];
let columnsCoords = [
{
    x: [32.5, 35],
    y: [50, 79.5],
},
{
    x: [41.5, 43.5],
    y: [50, 79],
},
{
    x: [50, 52.3],
    y: [49.5, 79],
},
{
    x: [60, 61.7],
    y: [49, 79],
}];
let cornicesCoords = [
{
    x: [11.5, 20.5],
    y: [69, 72],
},
{
    x: [20, 32],
    y: [50, 53],
},
{
    x: [33, 62],
    y: [39, 48],
},
{
    x: [45.5, 49.7],
    y: [53.5, 57.5],
},
{
    x: [62.5, 69],
    y: [49, 54.5],
},
{
    x: [69, 87],
    y: [46, 51],
}];
let facingCoords = [
{
    x: [13.7, 20.8],
    y: [73.2, 79.8],
},
{
    x: [23.2, 32.3],
    y: [57.4, 73.5],
    exception: {
        x: [26, 28.8],
        y: [58.5, 73.5],
    },
},
{
    x: [35.3, 37],
    y: [57.2, 71.6],
    exception: {
        x: [36.5, 37],
        y: [58.9, 71.4],
    },
},
{
    x: [39.3, 41],
    y: [52.5, 71.4],
    exception: {
        x: [40, 41.1],
        y: [55, 71.4],
    },
},
{
    x: [43.7, 49.6],
    y: [52.3, 74],
    exception: {
        x: [45.3, 49.6],
        y: [53.3, 74],
    },
},
{
    x: [52.7, 59.5],
    y: [52, 71],
    exception: {
        x: [54.4, 57.5],
        y: [53.3, 70.75],
    },
},
{
    x: [62.2, 68.9],
    y: [56.2, 75],
    exception: {
        x: [63.9, 67.1],
        y: [56.5, 73.5],
    },
},
{
    x: [71.6, 84.5],
    y: [53.8, 74],
    exception: {
        x: [75.9, 79.9],
        y: [54.6, 72.6],
    },
}];
let groundStoneCoords = [
{
    x: [21.2, 32],
    y: [76, 79.5],
},
{
    x: [21.2, 30],
    y: [79.5, 84],
},
{
    x: [62, 85],
    y: [76, 80.5],
},
{
    x: [63.5, 85],
    y: [80.5, 83],
}];
let pavingStonesCoords = [
{
    x: [25.8, 67.3],
    y: [84, 86],
},
{
    x: [19, 74],
    y: [86, 89],
},
{
    x: [11, 80],
    y: [89, 92],
},
{
    x: [0, 86],
    y: [92, 100],
}];
let platbandsCoords = [
{
    x: [26, 28.7],
    y: [58.5, 60.8],
},
{
    x: [26, 26.5],
    y: [60.8, 71.4],
},
{
    x: [28.3, 28.7],
    y: [60.8, 71.4],
},
{
    x: [36.6, 37.2],
    y: [59.1, 71.4],
},
{
    x: [40.1, 41.25],
    y: [55.25, 57.6],
},
{
    x: [40.1, 40.6],
    y: [57.6, 71.4],
},
{
    x: [54.6, 57.4],
    y: [53.55, 56.4],
},
{
    x: [54.6, 55],
    y: [56.4, 70.5],
},
{
    x: [56.9, 57.4],
    y: [56.4, 70.5],
},
{
    x: [64, 67],
    y: [56.8, 59],
},
{
    x: [64, 64.4],
    y: [59, 71.4],
},
{
    x: [66.5, 67],
    y: [59, 71.4],
},
{
    x: [76, 79.7],
    y: [54.8, 56.8],
},
{
    x: [76, 76.6],
    y: [56.8, 70.5],
},
{
    x: [79.2, 79.7],
    y: [56.8, 70.5],
}];
let rustsCoords = [
{
    x: [12.2, 13.5],
    y: [73.1, 80.2],
},
{
    x: [21.3, 23],
    y: [57.2, 74.6],
},
{
    x: [37.4, 39],
    y: [54.8, 71.6],
},
{
    x: [69.6, 71.4],
    y: [53.6, 74.6],
},
{
    x: [85.4, 87],
    y: [52.3, 69.9],
}];
let stairsCoords = [
{
    x: [43.6, 50],
    y: [78, 80.5],
},
{
    x: [32.3, 61.7],
    y: [80.65, 83.65],
}];
let windowsillsCoords = [
{
    x: [26, 28.2],
    y: [72.7, 73.8],
},
{
    x: [55, 57.5],
    y: [71, 71.8],
},
{
    x: [64.3, 67.1],
    y: [72.3, 73.5],
},
{
    x: [76.4, 79.9],
    y: [71, 72.2],
}];

let imagePW,
    imagePH;
let imagePWOffset,
    imagePHOffset;

function getElemCoords(x, y) {
    let balustrade1 = balustradeCoords[0];
    let balustrade2 = balustradeCoords[1];

    let column1 = columnsCoords[0];
    let column2 = columnsCoords[1];
    let column3 = columnsCoords[2];
    let column4 = columnsCoords[3];

    let cornice1 = cornicesCoords[0];
    let cornice2 = cornicesCoords[1];
    let cornice3 = cornicesCoords[2];
    let cornice4 = cornicesCoords[3];
    let cornice5 = cornicesCoords[4];
    let cornice6 = cornicesCoords[5];

    let facing1 = facingCoords[0];
    let facing2 = facingCoords[1];
    let facing3 = facingCoords[2];
    let facing4 = facingCoords[3];
    let facing5 = facingCoords[4];
    let facing6 = facingCoords[5];
    let facing7 = facingCoords[6];
    let facing8 = facingCoords[7];

    let groundStone1 = groundStoneCoords[0];
    let groundStone2 = groundStoneCoords[1];
    let groundStone3 = groundStoneCoords[2];
    let groundStone4 = groundStoneCoords[3];

    let pavingStones1 = pavingStonesCoords[0];
    let pavingStones2 = pavingStonesCoords[1];
    let pavingStones3 = pavingStonesCoords[2];
    let pavingStones4 = pavingStonesCoords[3];

    let platbands1 = platbandsCoords[0];
    let platbands2 = platbandsCoords[1];
    let platbands3 = platbandsCoords[2];
    let platbands4 = platbandsCoords[3];
    let platbands5 = platbandsCoords[4];
    let platbands6 = platbandsCoords[5];
    let platbands7 = platbandsCoords[6];
    let platbands8 = platbandsCoords[7];
    let platbands9 = platbandsCoords[8];
    let platbands10 = platbandsCoords[9];
    let platbands11 = platbandsCoords[10];
    let platbands12 = platbandsCoords[11];
    let platbands13 = platbandsCoords[12];
    let platbands14 = platbandsCoords[13];
    let platbands15 = platbandsCoords[14];

    let rusts1 = rustsCoords[0];
    let rusts2 = rustsCoords[1];
    let rusts3 = rustsCoords[2];
    let rusts4 = rustsCoords[3];
    let rusts5 = rustsCoords[4];

    let stairs1 = stairsCoords[0];
    let stairs2 = stairsCoords[1];

    let windowsills1 = windowsillsCoords[0];
    let windowsills2 = windowsillsCoords[1];
    let windowsills3 = windowsillsCoords[2];
    let windowsills4 = windowsillsCoords[3];

    function checkException(obj) {
        if ((x >= obj.exception.x[0] && x <= obj.exception.x[1]) && (y >= obj.exception.y[0] && y <= obj.exception.y[1])) {
            return true;
        }
    }

    function getBalustradeCoords() {
        if ((x >= balustrade1.x[0] && x <= balustrade1.x[1]) && (y >= balustrade1.y[0] && y <= balustrade1.y[1])) {
            imageElements.balustrade.style.zIndex = '5';
            imageElements.balustrade.classList.add('pulsation-element');
        } else if ((x >= balustrade2.x[0] && x <= balustrade2.x[1]) && (y >= balustrade2.y[0] && y <= balustrade2.y[1])) {
            imageElements.balustrade.style.zIndex = '5';
            imageElements.balustrade.classList.add('pulsation-element');
        } else {
            imageElements.balustrade.style.zIndex = '-1';
            imageElements.balustrade.classList.remove('pulsation-element');
        }
    }
    function getColumnsCoords() {
        if ((x >= column1.x[0] && x <= column1.x[1]) && (y >= column1.y[0] && y <= column1.y[1])) {
            imageElements.columns.style.zIndex = '5';
            imageElements.columns.classList.add('pulsation-element');
        } else if ((x >= column2.x[0] && x <= column2.x[1]) && (y >= column2.y[0] && y <= column2.y[1])) {
            imageElements.columns.style.zIndex = '5';
            imageElements.columns.classList.add('pulsation-element');
        } else if ((x >= column3.x[0] && x <= column3.x[1]) && (y >= column3.y[0] && y <= column3.y[1])) {
            imageElements.columns.style.zIndex = '5';
            imageElements.columns.classList.add('pulsation-element');
        } else if ((x >= column4.x[0] && x <= column4.x[1]) && (y >= column4.y[0] && y <= column4.y[1])) {
            imageElements.columns.style.zIndex = '5';
            imageElements.columns.classList.add('pulsation-element');
        } else {
            imageElements.columns.style.zIndex = '-1';
            imageElements.columns.classList.remove('pulsation-element');
        }
    }
    function getCornicesCoords() {
        if ((x >= cornice1.x[0] && x <= cornice1.x[1]) && (y >= cornice1.y[0] && y <= cornice1.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else if ((x >= cornice2.x[0] && x <= cornice2.x[1]) && (y >= cornice2.y[0] && y <= cornice2.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else if ((x >= cornice3.x[0] && x <= cornice3.x[1]) && (y >= cornice3.y[0] && y <= cornice3.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else if ((x >= cornice4.x[0] && x <= cornice4.x[1]) && (y >= cornice4.y[0] && y <= cornice4.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else if ((x >= cornice5.x[0] && x <= cornice5.x[1]) && (y >= cornice5.y[0] && y <= cornice5.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else if ((x >= cornice6.x[0] && x <= cornice6.x[1]) && (y >= cornice6.y[0] && y <= cornice6.y[1])) {
            imageElements.cornices.style.zIndex = '5';
            imageElements.cornices.classList.add('pulsation-element');
        } else {
            imageElements.cornices.style.zIndex = '-1';
            imageElements.cornices.classList.remove('pulsation-element');
        }
    }
    function getGroundStonesCoords() {
        if ((x >= groundStone1.x[0] && x <= groundStone1.x[1]) && (y >= groundStone1.y[0] && y <= groundStone1.y[1])) {
            imageElements.groundStone.style.zIndex = '5';
            imageElements.groundStone.classList.add('pulsation-element');
        } else if ((x >= groundStone2.x[0] && x <= groundStone2.x[1]) && (y >= groundStone2.y[0] && y <= groundStone2.y[1])) {
            imageElements.groundStone.style.zIndex = '5';
            imageElements.groundStone.classList.add('pulsation-element');
        } else if ((x >= groundStone3.x[0] && x <= groundStone3.x[1]) && (y >= groundStone3.y[0] && y <= groundStone3.y[1])) {
            imageElements.groundStone.style.zIndex = '5';
            imageElements.groundStone.classList.add('pulsation-element');
        } else if ((x >= groundStone4.x[0] && x <= groundStone4.x[1]) && (y >= groundStone4.y[0] && y <= groundStone4.y[1])) {
            imageElements.groundStone.style.zIndex = '5';
            imageElements.groundStone.classList.add('pulsation-element');
        } else {
            imageElements.groundStone.style.zIndex = '-1';
            imageElements.groundStone.classList.remove('pulsation-element');
        }
    }
    function getPavingStonesCoords() {
        if ((x >= pavingStones1.x[0] && x <= pavingStones1.x[1]) && (y >= pavingStones1.y[0] && y <= pavingStones1.y[1])) {
            imageElements.pavingStones.style.zIndex = '5';
            imageElements.pavingStones.classList.add('pulsation-element');
        } else if ((x >= pavingStones2.x[0] && x <= pavingStones2.x[1]) && (y >= pavingStones2.y[0] && y <= pavingStones2.y[1])) {
            imageElements.pavingStones.style.zIndex = '5';
            imageElements.pavingStones.classList.add('pulsation-element');
        } else if ((x >= pavingStones3.x[0] && x <= pavingStones3.x[1]) && (y >= pavingStones3.y[0] && y <= pavingStones3.y[1])) {
            imageElements.pavingStones.style.zIndex = '5';
            imageElements.pavingStones.classList.add('pulsation-element');
        } else if ((x >= pavingStones4.x[0] && x <= pavingStones4.x[1]) && (y >= pavingStones4.y[0] && y <= pavingStones4.y[1])) {
            imageElements.pavingStones.style.zIndex = '5';
            imageElements.pavingStones.classList.add('pulsation-element');
        } else {
            imageElements.pavingStones.style.zIndex = '-1';
            imageElements.pavingStones.classList.remove('pulsation-element');
        }
    }
    function getPlatbandsCoords() {
        if ((x >= platbands1.x[0] && x <= platbands1.x[1]) && (y >= platbands1.y[0] && y <= platbands1.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands2.x[0] && x <= platbands2.x[1]) && (y >= platbands2.y[0] && y <= platbands2.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands3.x[0] && x <= platbands3.x[1]) && (y >= platbands3.y[0] && y <= platbands3.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands4.x[0] && x <= platbands4.x[1]) && (y >= platbands4.y[0] && y <= platbands4.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands5.x[0] && x <= platbands5.x[1]) && (y >= platbands5.y[0] && y <= platbands5.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands6.x[0] && x <= platbands6.x[1]) && (y >= platbands6.y[0] && y <= platbands6.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands7.x[0] && x <= platbands7.x[1]) && (y >= platbands7.y[0] && y <= platbands7.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands8.x[0] && x <= platbands8.x[1]) && (y >= platbands8.y[0] && y <= platbands8.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands9.x[0] && x <= platbands9.x[1]) && (y >= platbands9.y[0] && y <= platbands9.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands10.x[0] && x <= platbands10.x[1]) && (y >= platbands10.y[0] && y <= platbands10.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands11.x[0] && x <= platbands11.x[1]) && (y >= platbands11.y[0] && y <= platbands11.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands12.x[0] && x <= platbands12.x[1]) && (y >= platbands12.y[0] && y <= platbands12.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands13.x[0] && x <= platbands13.x[1]) && (y >= platbands13.y[0] && y <= platbands13.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands14.x[0] && x <= platbands14.x[1]) && (y >= platbands14.y[0] && y <= platbands14.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else if ((x >= platbands15.x[0] && x <= platbands15.x[1]) && (y >= platbands15.y[0] && y <= platbands15.y[1])) {
            imageElements.platbands.style.zIndex = '5';
            imageElements.platbands.classList.add('pulsation-element');
        } else {
            imageElements.platbands.style.zIndex = '-1';
            imageElements.platbands.classList.remove('pulsation-element');
        }
    }
    function getFacingCoords() {
        if ((x >= facing1.x[0] && x <= facing1.x[1]) && (y >= facing1.y[0] && y <= facing1.y[1])) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing2.x[0] && x <= facing2.x[1]) && (y >= facing2.y[0] && y <= facing2.y[1]) && !checkException(facing2)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing3.x[0] && x <= facing3.x[1]) && (y >= facing3.y[0] && y <= facing3.y[1]) && !checkException(facing3)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing4.x[0] && x <= facing4.x[1]) && (y >= facing4.y[0] && y <= facing4.y[1]) && !checkException(facing4)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing5.x[0] && x <= facing5.x[1]) && (y >= facing5.y[0] && y <= facing5.y[1]) && !checkException(facing5)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing6.x[0] && x <= facing6.x[1]) && (y >= facing6.y[0] && y <= facing6.y[1]) && !checkException(facing6)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing7.x[0] && x <= facing7.x[1]) && (y >= facing7.y[0] && y <= facing7.y[1]) && !checkException(facing7)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else if ((x >= facing8.x[0] && x <= facing8.x[1]) && (y >= facing8.y[0] && y <= facing8.y[1]) && !checkException(facing8)) {
            imageElements.facing.style.zIndex = '5';
            imageElements.facing.classList.add('pulsation-element');
        } else {
            imageElements.facing.style.zIndex = '-1';
            imageElements.facing.classList.remove('pulsation-element');
        }
    }
    function getRustsCoords() {
        if ((x >= rusts1.x[0] && x <= rusts1.x[1]) && (y >= rusts1.y[0] && y <= rusts1.y[1])) {
            imageElements.rusts.style.zIndex = '5';
            imageElements.rusts.classList.add('pulsation-element');
        } else if ((x >= rusts2.x[0] && x <= rusts2.x[1]) && (y >= rusts2.y[0] && y <= rusts2.y[1])) {
            imageElements.rusts.style.zIndex = '5';
            imageElements.rusts.classList.add('pulsation-element');
        } else if ((x >= rusts3.x[0] && x <= rusts3.x[1]) && (y >= rusts3.y[0] && y <= rusts3.y[1])) {
            imageElements.rusts.style.zIndex = '5';
            imageElements.rusts.classList.add('pulsation-element');
        } else if ((x >= rusts4.x[0] && x <= rusts4.x[1]) && (y >= rusts4.y[0] && y <= rusts4.y[1])) {
            imageElements.rusts.style.zIndex = '5';
            imageElements.rusts.classList.add('pulsation-element');
        } else if ((x >= rusts5.x[0] && x <= rusts5.x[1]) && (y >= rusts5.y[0] && y <= rusts5.y[1])) {
            imageElements.rusts.style.zIndex = '5';
            imageElements.rusts.classList.add('pulsation-element');
        } else {
            imageElements.rusts.style.zIndex = '-1';
            imageElements.rusts.classList.remove('pulsation-element');
        }
    }
    function getStairsCoords() {
        if ((x >= stairs1.x[0] && x <= stairs1.x[1]) && (y >= stairs1.y[0] && y <= stairs1.y[1])) {
            imageElements.stairs.style.zIndex = '5';
            imageElements.stairs.classList.add('pulsation-element');
        } else if ((x >= stairs2.x[0] && x <= stairs2.x[1]) && (y >= stairs2.y[0] && y <= stairs2.y[1])) {
            imageElements.stairs.style.zIndex = '5';
            imageElements.stairs.classList.add('pulsation-element');
        } else {
            imageElements.stairs.style.zIndex = '-1';
            imageElements.stairs.classList.remove('pulsation-element');
        }
    }
    function getWindowsillsCoords() {
        if ((x >= windowsills1.x[0] && x <= windowsills1.x[1]) && (y >= windowsills1.y[0] && y <= windowsills1.y[1])) {
            imageElements.windowsills.style.zIndex = '5';
            imageElements.windowsills.classList.add('pulsation-element');
        } else if ((x >= windowsills2.x[0] && x <= windowsills2.x[1]) && (y >= windowsills2.y[0] && y <= windowsills2.y[1])) {
            imageElements.windowsills.style.zIndex = '5';
            imageElements.windowsills.classList.add('pulsation-element');
        } else if ((x >= windowsills3.x[0] && x <= windowsills3.x[1]) && (y >= windowsills3.y[0] && y <= windowsills3.y[1])) {
            imageElements.windowsills.style.zIndex = '5';
            imageElements.windowsills.classList.add('pulsation-element');
        } else if ((x >= windowsills4.x[0] && x <= windowsills4.x[1]) && (y >= windowsills4.y[0] && y <= windowsills4.y[1])) {
            imageElements.windowsills.style.zIndex = '5';
            imageElements.windowsills.classList.add('pulsation-element');
        } else {
            imageElements.windowsills.style.zIndex = '-1';
            imageElements.windowsills.classList.remove('pulsation-element');
        }
    }

    getBalustradeCoords();
    getColumnsCoords();
    getCornicesCoords();
    getGroundStonesCoords();
    getPavingStonesCoords();
    getPlatbandsCoords();
    getFacingCoords();
    getRustsCoords();
    getStairsCoords();
    getWindowsillsCoords();
}

function calcImagePercentageOffset() {
    imagePW = (image.offsetWidth / 100).toFixed(2);
    imagePH = (image.offsetHeight / 100).toFixed(2);
}

window.addEventListener('load', calcImagePercentageOffset);
window.addEventListener('resize', calcImagePercentageOffset);

image.addEventListener('click', function(event) {
    imagePWOffset = (event.offsetX / imagePW).toFixed(2);
    imagePHOffset = (event.offsetY / imagePH).toFixed(2);

    console.log(`X: ${imagePWOffset}`);
    console.log(`Y: ${imagePHOffset}`);
});

image.addEventListener('mousemove', function() {
    imagePWOffset = (event.offsetX / imagePW).toFixed(2);
    imagePHOffset = (event.offsetY / imagePH).toFixed(2);
    getElemCoords(imagePWOffset, imagePHOffset);
});
