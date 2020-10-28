var $labels = document.querySelectorAll('.calculator__cb-custom');
var $menuItems = document.querySelectorAll('.menu__item .menu__link');

var $mark = document.querySelector('#svgMapMark');
var $dots = document.querySelectorAll('.svg-map-dot');
var $regions = document.querySelectorAll('.svg-map-region');

var $citiesInfo = document.querySelectorAll('.dealer__info');
var dotsData = [];

var $burger = document.querySelector('#burger');
var $headerMenu = document.querySelector('#headerMenu');
var $body = document.body;

var $callPopupBtns = document.querySelectorAll('[data-call-popup]');
var $popupList = document.querySelectorAll('.popup');

var $header = document.querySelector('#header');
var $catalogTabs = document.querySelectorAll('.catalog__tabs .catalog__tab');
var $catalogContents = document.querySelectorAll('.catalog__contents .catalog__list');

var $cityList = document.querySelectorAll('.popup__city-link');
var $form = document.querySelector('.popup__form.request-form');


var currentCity = 'Москва';

var slider = new Splide( '#charsSlider', {
    type: 'loop',
    rewind: false,
    arrows: false,
    pagination: false,
    autoplay: true,
    interval: 4000,
    pauseOnHover: false,
    perMove: 1,
    autoWidth: true,
    gap: 20,
    height: 400,
    breakpoints: {
        1439: {
            height: 320
        },
        1024: {
            height: 255
        },
        767: {
            height: 200
        }
    }
});
slider.mount();

/* ОТКРЫТИЕ МОДАЛЬНОГО ОКНА "ВАШ ГОРОД МОСКВА?" */
// showPopup('popupConfirmCity');
/* ==================== */

for (let i = 0; i < $labels.length; i++) {
    $labels[i].onkeydown = function() {
        if (event.key === 'Enter') {
            let cb = document.querySelector('input[type="checkbox"]#' + $labels[i].getAttribute('for'));
            cb.checked = !cb.checked;
        }
    };
}

for (let i = 0; i < $menuItems.length; i++) {
    var elem = $menuItems[i];
    var handler = scrollHandler.bind(null, elem);
    elem.addEventListener('click', handler);
}
function scrollHandler(elem) {
    if ($burger.classList.contains('active')) {
        closeMenu();
    }
    var href = elem.getAttribute('href').substr(1);
    event.preventDefault();
    document.getElementById(href).scrollIntoView({block: "start", behavior: "smooth"});
}

for (let i = 0; i < $dots.length; i++) {
    var obj = {
        x: parseInt($dots[i].getAttribute('cx')),
        y: parseInt($dots[i].getAttribute('cy')),
        r: parseInt($dots[i].getAttribute('r')),
    };
    dotsData.push(obj);
    var setMarkFunc = setMark.bind(null, i);
    $dots[i].addEventListener('click', setMarkFunc);
    $regions[i].addEventListener('click', setMarkFunc);
}
if (window.innerWidth <=767) {
    for (let i = 0; i < $dots.length; i++) {
        var currentR = $dots[i].getAttribute('r');
        $dots[i].setAttribute('r', currentR * 2);
    }
}

setMark(0);
function setMark(ind) {
    var offsetX = +$mark.getAttribute('width') / 2;
    var offsetY = +$mark.getAttribute('height');
    if ($dots[ind].classList !== undefined) {
        for (let i = 0; i < $dots.length; i++) {
            $dots[i].classList.remove('hidden');
            $citiesInfo[i].classList.add('hidden');
        }
        $dots[ind].classList.add('hidden');
        $citiesInfo[ind].classList.remove('hidden');
        $mark.setAttribute('x', dotsData[ind].x - offsetX);
        $mark.setAttribute('y', dotsData[ind].y - offsetY);   
    } else {
        for (let i = 0; i < $citiesInfo.length; i++) {
            $citiesInfo[i].classList.add('hidden');
        }
        $citiesInfo[ind].classList.remove('hidden');
        $mark.setAttribute('x', dotsData[ind].x - offsetX);
        $mark.setAttribute('y', dotsData[ind].y - offsetY);   
    }
}


$burger.addEventListener('click', function() {
    if ($burger.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});
function closeMenu() {
    $burger.classList.remove('active');
    $headerMenu.classList.remove('active');
    $body.classList.remove('lock');
}
function openMenu() {
    $burger.classList.add('active');
    $headerMenu.classList.add('active');
    $body.classList.add('lock');
}



for (let i = 0; i < $callPopupBtns.length; i++) {
    let elem = $callPopupBtns[i];
    $callPopupBtns[i].addEventListener('click', function() {
        event.preventDefault();
        showPopup(elem.getAttribute('data-call-popup'));
    });
}
for (let i = 0; i < $popupList.length; i++) {
    let elem = $popupList[i];
    $popupList[i].addEventListener('click', function() {
        if (event.target.classList.contains('popup') && event.target.classList.contains('active')) {
            hidePopup(elem.id);
        }
    });
}
for (let i = 0; i < $cityList.length; i++) {
    let elem = $cityList[i];
    elem.addEventListener('click', function() {
        event.preventDefault();
        // currentCity = elem.textContent;
        hidePopup('popupSelectCity');
        setCity(elem.textContent);
    });
}

function setCity(city) {
    currentCity = city;
    // hidePopup('#popupSelectCity');
    let $geoLinks = document.querySelectorAll('.geo__link');
    for (let i = 0; i < $geoLinks.length; i++) {
        $geoLinks[i].textContent = currentCity;
    }
}

function showPopup(id) {
    var $popup = document.getElementById(id);
    for (let i = 0; i < $popupList.length; i++) {
        if (id !== $popupList[i].id  ) {
            $popupList[i].classList.remove('active');
            $popupList[i].classList.remove('fade-out');
        }
    }
    $popup.classList.add('active');
    $popup.classList.add('fade-in');
    $body.classList.add('lock');
}
function hidePopup(id) {
    var $popup = document.getElementById(id);
    $popup.classList.remove('fade-in');
    $popup.classList.add('fade-out');
    function removing() {
        $popup.classList.remove('active');
        $popup.classList.remove('fade-out');
        $body.classList.remove('lock');
        $popup.removeEventListener('animationend', removing);
    }
    $popup.addEventListener('animationend', removing);
}

// var scrollPrev = 0;

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 99) {
        $header.classList.add('fixed');
    } else {
        $header.classList.remove('fixed');
    }
});


for (let i = 0; i < $catalogTabs.length; i++) {
    var func = activateTabContent.bind(null, i);
    $catalogTabs[i].addEventListener('click', func);
}

function activateTabContent(ind) {
    for (let j = 0; j < $catalogContents.length; j++) {
        $catalogTabs[j].classList.remove('active');
        $catalogContents[j].classList.add('hidden');
    }
    $catalogTabs[ind].classList.add('active');
    $catalogContents[ind].classList.remove('hidden');
}

function validateForm(form) {
    var regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,11}$/;
    var regName = /^[а-яё]+$/i;
    var inputName = form.querySelector('input[name="name"]');
    var inputTel = form.querySelector('input[name="tel"]');
    if (inputTel.value.match(regTel) && inputName.value.match(regName)) {
        return true;
    } else {
        return false;
    }
}
function serialize(form) {
    if (!form || form.nodeName !== "FORM") {
        return false;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'checkbox':
                        writeCommaCheckbox(form, i, q);
                        break;
                    case 'radio':
                        if (form.elements[i].checked) {
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
        }
    }
    return q.join("&");
}

function sendForm() {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    var body = serialize($form);
    xhr.open('POST', './mail.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $form.reset();
            alert('Спасибо за заявку!');
        }
    };
    xhr.send(body);
}
$form.addEventListener('submit', sendForm);

//# sourceMappingURL=maps/main.js.map
