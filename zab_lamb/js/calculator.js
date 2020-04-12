let calculator = document.getElementById('calculator');

let calcTabGold = document.getElementById('calcTabGold');
let calcTabEquipment = document.getElementById('calcTabEquipment');
let calcTabAuto = document.getElementById('calcTabAuto');
let calcTabLoan = document.getElementById('calcTabLoan');

let calcAmountSlider = document.getElementById('calcAmountSlider');
let calcAmountSliderStep;
let calcAmountSliderMap;

let calcTimeSlider = document.getElementById('calcTimeSlider');
let calcTimeSliderStep;
let calcTimeSliderMap;

let calcPreliminaryTime = document.getElementById('calcPreliminaryTime');
let calcPreliminaryLoan = document.getElementById('calcPreliminaryLoan');

let calcTotalDate = document.getElementById('calcTotalDate');
let calcTotalLoan = document.getElementById('calcTotalLoan');


function calculateStep(slider, big) {
    let pointer = slider.querySelector('.calcslider__pointer');
    let line = slider.querySelector('.calcslider__line');

    let minNum = parseInt(
        slider.querySelector('.calcslider__min')
        .innerText.split(' ').join(''));
    let maxNum = parseInt(
        slider.querySelector('.calcslider__max')
        .innerText.split(' ').join(''));
    let pointerLimit = parseInt(window.getComputedStyle(line).width) - parseInt(window.getComputedStyle(pointer).width);
    let map = new Map();
    let step;
    if (big) {
        step = pointerLimit / ((maxNum / minNum) - 1);
        for (let i = 0; i < (maxNum / minNum) - 1; i++) {
            map.set(+(i * step).toFixed(2), +((i + 1) * step).toFixed(2));
        }
    } else {
        step = pointerLimit / (maxNum - 1);

        for (let i = 0; i < maxNum - 1; i++) {
            map.set((i * step).toFixed(2), ((i + 1) * step).toFixed(2));
        }
    }
    return [step, map];
}

function calculateTotal(percent) {
    let monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let loan = parseInt(calcPreliminaryLoan.innerText.split(' ').join(''));
    let time = parseInt(calcPreliminaryTime.innerText.split(' ').join(''));

    let returnDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + time);
    let returnLoan = loan + (loan / 100 * percent) * time;
    let returnDateStr = returnDate.getDate() + ' ' + monthArr[returnDate.getMonth()] + ' ' + returnDate.getFullYear();

    calcTotalDate.innerText = returnDateStr;
    calcTotalLoan.innerText = returnLoan + ' рублей';
}



function addSpaces(elem, text) {
    let str = elem.innerText.split(' ').join('');
    let num = parseInt(str);
    let zeros = Math.floor(('' + num).length / 3);
    let newStr = num.toString().split('').reverse().join('');    
    let result;
    result = newStr.substr(0, 3);
    for (let i = 1; i <= zeros; i++) {
        result += ' ' + newStr.substr(i*3, 3);
    }
    newStr = result.split('').reverse().join('');
    if (text) {
        elem.innerText = newStr + ' ' + text;
    } else {
        elem.innerText = newStr;
    }
} 

function sliderMoving(sliderStr) {
    let slider = this;
    let pointer = slider.querySelector('.calcslider__pointer');
    let line = slider.querySelector('.calcslider__line');
    let resultElem;
    let obj = {
        'amount': calcAmountSliderMap,
        'time': calcTimeSliderMap,
    }
    let map = obj[sliderStr];
    let pointerLimit = parseInt(window.getComputedStyle(line).width) - parseInt(window.getComputedStyle(pointer).width);

    if (slider === calcAmountSlider) {
        resultElem = calcPreliminaryLoan;
    } else if (slider === calcTimeSlider) {
        resultElem = calcPreliminaryTime
    }

    let allPosSet = new Set();
    for (let [key, val] of map) {
        allPosSet.add(key);
        allPosSet.add(val);
    }
    let allPosArr = Array.from(allPosSet);

    let htmlText;

    function getNum(elem, key) {
        htmlText = allPosArr.indexOf(key) + 1;
        if (elem === calcPreliminaryLoan) {
            htmlText *= 1000;
        }
    }
    function reRenderHtmlText() {
        let arr = resultElem.innerText.split(' ');
        let str = arr.join('');
        let n = parseInt(str);
        let newStr = str.replace(n, '');
        resultElem.innerText = htmlText;
        addSpaces(resultElem, newStr);
    }
    
    let firstMapElem;
    let lastMapElem;
    for (let [key, val] of map) {
        firstMapElem = key;
        break;
    }
    for (let [key, val] of map) {
        lastMapElem = val;
    }
    
    function moveAt() {
        let pos = (event.pageX - line.offsetLeft - pointer.offsetWidth / 2);
        for (let [key, val] of map) {
            if (pos > key && pos <= val) {
                pointer.style.left = [key] + 'px';
                getNum(resultElem, key);
                reRenderHtmlText();
                break;
            } else if (pos < firstMapElem) {
                pointer.style.left = 0 + 'px';
                getNum(resultElem, firstMapElem);
                reRenderHtmlText();
                break;
            } else if (pos > lastMapElem) {
                pointer.style.left = pointerLimit + 'px';
                getNum(resultElem, lastMapElem);
                reRenderHtmlText();
                break;
            }
        }
    }
    
    function pointerMoving() {
        moveAt();
        setTextSelectable(true);
    }
    function setTextSelectable(state) {
        switch (state) {
            case true:
                document.body.style.userSelect = 'none';
                break;
            case false:
                document.body.style.userSelect = '';
                break;
            default:
                break;
        }        
    }
    moveAt();
    
    document.addEventListener('mousemove', pointerMoving);
    document.addEventListener('mousemove', calculateTotal.bind(null, 1.5));

    // document.addEventListener('touchmove', pointerMoving);
    // document.addEventListener('touchmove', calculateTotal.bind(null, 1.5));

    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', pointerMoving);
        document.removeEventListener('mousemove', calculateTotal.bind(null, 1.5));
        setTextSelectable(false);
    }, {once: true});
    
    // document.addEventListener('touchend', function () {
    //     document.removeEventListener('touchmove', pointerMoving);
    //     document.removeEventListener('touchmove', calculateTotal.bind(null, 1.5));
    //     setTextSelectable(false);
    // }, {once: true});
}

let result1 = calculateStep(calcTimeSlider);
[calcTimeSliderStep, calcTimeSliderMap] = [result1[0], result1[1]];
let result2 = calculateStep(calcAmountSlider, true);
[calcAmountSliderStep, calcAmountSliderMap] = [result2[0], result2[1]];
document.querySelectorAll('.calcslider__min, .calcslider__max').forEach(function(elem) {
    addSpaces(elem, '');
});
addSpaces(calcPreliminaryLoan, 'рублей');
calculateTotal(1.5);
window.addEventListener('resize', function() {
    let result1 = calculateStep(calcTimeSlider);
    [calcTimeSliderStep, calcTimeSliderMap] = [result1[0], result1[1]];
    let result2 = calculateStep(calcAmountSlider, true);
    [calcAmountSliderStep, calcAmountSliderMap] = [result2[0], result2[1]];
    addSpaces(calcPreliminaryLoan, 'рублей');
    calculateTotal(1.5);
    document.querySelectorAll('.calcslider__min, .calcslider__max').forEach(function(elem) {
        addSpaces(elem, '');
    });
});

calcAmountSlider.addEventListener('mousedown', sliderMoving.bind(calcAmountSlider, 'amount'));
calcTimeSlider.addEventListener('mousedown', sliderMoving.bind(calcTimeSlider, 'time'));

// calcAmountSlider.addEventListener('touchstart', sliderMoving.bind(calcAmountSlider, 'amount'));
// calcTimeSlider.addEventListener('touchend', sliderMoving.bind(calcTimeSlider, 'time'));

