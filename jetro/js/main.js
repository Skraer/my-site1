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

// // ПЛАВНЫЙ ПЕРЕХОД К РАЗДЕЛАМ ЛЕНДИНГА ЧЕРЕЗ МЕНЮ
// let menuItems = document.querySelectorAll(CSS_КЛАССЫ_ПУНКТОВ_МЕНЮ);
// menuItems.forEach(function(elem) {
//     elem.addEventListener('click', function() {
//         let href = elem.getAttribute('href').substr(1);
//         event.preventDefault();
//         document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
//     });
// });
let pageLinks = document.querySelectorAll('a');
// window.addEventListener('DOMContentLoaded', function(event) {
    pageLinks.forEach(function(elem) {
        if (elem.getAttribute('href') == '#') {
            elem.addEventListener('click', function(event) {
                event.preventDefault();
            });
            // elem.preventDefault();
        }
    });
// });

var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    effect: 'coverflow',
    // pagination: {
    //     el: '.swiper-pagination',
    // },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
})