// let nucleusBtn = document.getElementById('showNucleus');
// let mapContainer = document.querySelector('.map');

let mapElems = {
    nucleus: document.querySelectorAll('.nucleus'),
    mitochondria: document.querySelectorAll('.mitochondria'),
    endoplasmic: document.querySelectorAll('.endoplasmic'),
    centriole: document.querySelectorAll('.centriole'),
    lysosomesY: document.querySelectorAll('.lysosomes-y'),
    lysosomesB: document.querySelectorAll('.lysosomes-b'),
    golgi: document.querySelectorAll('.golgi'),
}
let mapSvg = document.getElementById('mapSvg');
function camelCase(str) {
    let arr = str.split('-');
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1).toLowerCase();
    }
    return arr.join('');
}
let elemName = '';
mapSvg.addEventListener('mouseover', function(e) {
    elemName = e.target.hasAttribute('class') ? 
        camelCase(e.target.getAttribute('class')) : 
        null;
    let map = new Map();
    map.set('nucleus', 'Ядро клетки');
    map.set('mitochondria', 'Митохондрия');
    map.set('endoplasmic', 'Эндоплазматическая сеть');
    map.set('centriole', 'Центриоль');
    map.set('lysosomesY', 'Лизосома');
    map.set('lysosomesB', 'Лизосома');
    map.set('golgi', 'Комплекс Гольджи');

    document.getElementById('tooltip') ? 
        document.body.removeChild(document.getElementById('tooltip')) : null;
    
    if (elemName) {
        let tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.setAttribute('id', 'tooltip');
        tooltip.textContent = map.get(elemName);
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
        document.body.appendChild(tooltip);
    }
});
mapSvg.addEventListener('click', function(e) {
    let output = document.getElementById('outputInfo');
    e.preventDefault();
    (async () => {
        let json = await (await fetch('elements2.json')).json();
        if (elemName) {
            output.textContent = json[elemName];
            // console.log(json[elemName]);
        }
    })();
});
