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
;(function() {
    var menu = [
        'Основание перекрытия (бетон)',
        'Разуклонка из сухой стяжки',
        'Нанесение праймера',
        'Пароизоляционный материал'
    ];
    function getSlideNum(ind) {
        ind++;
        return (ind <= 9) ? '0' + ind : '' + ind;
    }
    var materialsSwiper = new Swiper('.materials__slider', {
        speed: 400,
        spaceBetween: 100,
        pagination: {
            el: '.materials__pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<li class="' + className + ' materials__pagination-item' + '" data-number="' + getSlideNum(index) + '.">' + (menu[index]) + '</li>';
            }
        },
        navigation: {
            nextEl: '.materials__next',
            prevEl: '.materials__prev',
        },
    });

    var worksSwiper = new Swiper('.works-gallery__slider', {
        speed: 400,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.works-gallery__pagination',
        },
        navigation: {
            nextEl: '.works-gallery__next',
            prevEl: '.works-gallery__prev',
        }
    });
})();