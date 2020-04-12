// function ibg() {
//     let ibgElems = document.querySelectorAll('.ibg');
//     let imgArr = document.querySelectorAll('img');

//     imgArr.forEach(function(img) {
//         ibgElems.forEach(function(div) {
//             if (div.contains(img)) {
//                 let src = img.getAttribute('src');
//                 div.style.backgroundImage = 'url(' + src + ')';
//             }
//         });
//     });
// }
// ibg();

//БУРГЕР==============
let burger = document.getElementById('burger');
let burgerMenu = document.querySelector('.burger-menu');
let body = document.body;
burger.addEventListener('click', function() {
    if (this.classList.contains('header__burger--active')) {
        this.classList.remove('header__burger--active');
        burgerMenu.classList.remove('burger-menu--active');
        body.style.overflow = '';
    } else if (!this.classList.contains('header__burger--active')) {
        this.classList.add('header__burger--active');
        burgerMenu.classList.add('burger-menu--active');
        body.style.overflow = 'hidden';
    }
});
burgerMenu.addEventListener('click', function() {
    let menuItems = burgerMenu.querySelectorAll('.nav-menu__item a');
    menuItems.forEach((elem) => {
        if (event.target == elem) {
            if (burger.classList.contains('header__burger--active')) {
                burger.classList.remove('header__burger--active');
                burgerMenu.classList.remove('burger-menu--active');
                body.style.overflow = '';
            } else if (!burger.classList.contains('header__burger--active')) {
                burger.classList.add('header__burger--active');
                burgerMenu.classList.add('burger-menu--active');
                body.style.overflow = 'hidden';
            }
        }
    });
});
//====================

// ПЛАВНЫЙ ПЕРЕХОД К РАЗДЕЛАМ ЛЕНДИНГА ЧЕРЕЗ МЕНЮ
let menuItems = document.querySelectorAll('.nav-menu__item a');
menuItems.forEach(function(elem) {
    elem.addEventListener('click', function() {
        let href = elem.getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
    });
});

// ПЛАВНЫЙ ПЕРЕХОД ДЛЯ ОСТАЛЬНЫХ ЭЛЕМЕНТОВ
let scrollUpBtn = document.querySelector('.scroll-up');
let smoothElemsArr = [
    scrollUpBtn.querySelector('a'),
    document.querySelector('.about__btn a')
];
smoothElemsArr.forEach(function(elem) {
    elem.addEventListener('click', function() {
        let href = elem.getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
    });
});



let scrollTimer;
if (window.pageYOffset >= 500) {
    scrollUpBtn.classList.remove('scroll-up--hidden');
    scrollUpBtn.classList.add('scroll-up--shown');
} else if (window.pageYOffset < 500) {
    scrollUpBtn.classList.remove('scroll-up--shown');
    scrollUpBtn.classList.add('scroll-up--hidden');
}
window.addEventListener('scroll', function() {
    if (this.pageYOffset >= 500) {
        scrollUpBtn.classList.remove('scroll-up--hidden');
        scrollUpBtn.classList.add('scroll-up--shown');
    } else if (this.pageYOffset < 500) {
        scrollUpBtn.classList.remove('scroll-up--shown');
        scrollUpBtn.classList.add('scroll-up--hidden');
    }
});

// function changeFeaturesIconsSrc() {
//     let elems = document.querySelectorAll('.features-list__item');

//     elems.forEach(function(elem) {
//         let icon = elem.querySelector('img');
//         let src = icon.getAttribute('src');
//         let dataSrc = icon.getAttribute('data-src');
//         let temp = src;

//         elem.addEventListener('mouseenter', function() {
//             icon.setAttribute('src', dataSrc);
//         });
//         elem.addEventListener('mouseleave', function() {
//             icon.setAttribute('src', temp);
//         });
//         // console.log(src, dataSrc);
//     });
// }
// window.addEventListener('DOMContentLoaded', changeFeaturesIconsSrc);

//СОБСТВЕННАЯ МАСКА=============
// let phoneForm = document.getElementById('phoneForm');
// function checkPhoneNumber(key) {
//     if (phoneForm.value.length < 10) {
//         return (key >= '0' && key <= '9') || key == 'Backspace';
//     } else if (phoneForm.value.length >= 10 && key == 'Backspace') {
//         return key == 'Backspace';
//     } else {
//         event.preventDefault();
//     }
// }
// phoneForm.onkeydown = () => checkPhoneNumber(event.key);
// phoneForm.addEventListener('input', function () {
//     if (!isNaN(+phoneForm.value) && typeof +phoneForm.value != 'number') {
//         console.log(phoneForm.value);
//     }
//     let customPhoneDiv = document.getElementById('customPhone');
//     let phone = phoneForm.value.split('');
//     let customPhoneChars = [
//         '+', '7', ' ', '(', ' ',
//         phone[0] || '_',
//         phone[1] || '_',
//         phone[2] || '_',
//         ' ', ')', ' ',
//         phone[3] || '_',
//         phone[4] || '_',
//         phone[5] || '_',
//         ' ', '-', ' ',
//         phone[6] || '_',
//         phone[7] || '_',
//         ' ', '-', ' ',
//         phone[8] || '_',
//         phone[9] || '_'
//     ];
//     customPhoneDiv.setAttribute('data-phone', customPhoneChars.join(''));
//     console.log(phoneForm.value);
// });
//============================

var phoneForm = document.getElementById('phoneForm');
var maskOptions = {
    mask: '+{7} ( 000 ) 000 - 00 - 00',
    lazy: false
};
var phoneFormMask = IMask(phoneForm, maskOptions);


window.addEventListener('DOMContentLoaded', function () {
    let pledgeListText = document.querySelectorAll('.pledge-list__text');
    let pledgeListBtn = document.querySelectorAll('.pledge-list__more');

    pledgeListBtn.forEach(function (btn, ind) {
        btn.addEventListener('click', function () {
            btn.classList.toggle('pledge-list__more--shown');
            pledgeListText[ind].classList.toggle('pledge-list__text--shown');
        });
    });
});



let geoBtns = document.querySelector('.geo__buttons');
geoBtns.addEventListener('click', function () {
    let btns = geoBtns.querySelectorAll('.geo__btn');
    let geoInfo = geoBtns.querySelectorAll('.geo__info');

    btns.forEach(function (elem, ind) {
        let icons = elem.querySelectorAll('img');
        if (event.target == elem || event.target == icons[0] || event.target == icons[1]) {
            if (geoInfo[ind].classList.contains('geo__info--active')) {
                geoInfo.forEach((el) => { el.classList.remove('geo__info--active') });
            } else {
                geoInfo.forEach((el) => { el.classList.remove('geo__info--active') });
                geoInfo[ind].classList.add('geo__info--active');
            }
        }
    });
});

var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
});
mySwiper.el.addEventListener('mouseleave', function() {
    mySwiper.autoplay.start();
});
mySwiper.el.addEventListener('mouseenter', function() {
    mySwiper.autoplay.stop();
});



var googleMap;
function initMap() {
    var myLatLng = { lat: 52.026975, lng: 113.499849 };
    var mapMarker = './img/icon/marker.png';
    googleMap = new google.maps.Map(document.getElementById('google-map'), {
        center: myLatLng,
        zoom: 17
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: googleMap,
        icon: mapMarker
    });
}

