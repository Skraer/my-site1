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
    var paginationItems = [
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
                return '<li class="' + className + ' materials__pagination-item' + '" data-number="' + getSlideNum(index) + '.">' + (paginationItems[index]) + '</li>';
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

    var animElems = {
        $topHeader: document.querySelector('.top__title'),
        $topList: document.querySelector('.top__list'),
        $topListItems: document.querySelectorAll('.top__item'),
        $topBtn: document.querySelector('.top__btn'),
        $reqImg1: document.querySelector('.request__img'),
        $reqImg2: document.querySelector('.request__img--right'),
        $reqForm1: document.querySelector('#firstForm'),
        $reqForm2: document.querySelector('#secondForm'),
        $materialsPag: document.querySelector('.materials__pagination'),
        $materialsSlider: document.querySelector('.materials__slider'),
        $works: document.querySelector('.works-gallery'),
        $counter: document.querySelector('.counter__number'),
        $guaranteList: document.querySelector('.guarantee-list__row'),
        $aboutPerson: document.querySelector('.about__person'),
        $aboutContent: document.querySelector('.about__content'),
        $priceList: document.querySelector('.price-list'),
        $priceItems: document.querySelectorAll('.price-list__item'),
        $contacts: document.querySelector('.contacts__column'),
    };
    var counterIsStarted = false;
    var $html = document.documentElement;

    function isHidden(el) {
        return el.classList.contains('hidden')
        // if () {
        //     return true;
        // } else {
        //     return false;
        // }
    }
    function inScope(el, scope = 50) {
        return Math.floor(el.getBoundingClientRect().top) - $html.clientHeight < (-scope);
    }
    function checkAnim(el, classname) {
        return el.classList.contains(classname);
    }
    function checkCondition(el, classname) {
        return (inScope(el) && checkAnim(el, classname));
    }
    function animateElem(el, animClassname) {
        el.classList.add('active');
        el.addEventListener('animationend', function() {
            el.classList.remove('active');
            el.classList.remove(animClassname);
        }, {once: true});
    }
    function animateHandler(el, animClassname, delay = null) {
        if (delay) {
            setTimeout(() => {
                animateElem(el, animClassname);
            }, delay);
        } else if (checkCondition(el, animClassname)) {
            animateElem(el, animClassname);
        }
    }
    function animateCounter(end) {
        counterIsStarted = true;
        animElems.$counter.textContent = 0;
        clearInterval(counterInterval);
        var counterInterval = setInterval(() => {
            if (+animElems.$counter.textContent < end) {
                animElems.$counter.textContent = +animElems.$counter.textContent + 10;
            } else {
                clearInterval(counterInterval);
            }
        }, 20);
    }

    function enableAnimations() {
        animateHandler(animElems.$topHeader, 'ffl');
        animateHandler(animElems.$reqImg1, 'ffl');
        animateHandler(animElems.$reqImg2, 'ffr');
        animateHandler(animElems.$reqForm1, 'ffr');
        animateHandler(animElems.$reqForm2, 'ffl');
        animateHandler(animElems.$materialsPag, 'ffl');
        animateHandler(animElems.$materialsSlider, 'ffr');
        animateHandler(animElems.$works, 'fi');
        animateHandler(animElems.$guaranteList, 'ffd');
        animateHandler(animElems.$aboutPerson, 'ffl');
        animateHandler(animElems.$aboutContent, 'fi');
        animateHandler(animElems.$contacts, 'ffl');
        
        if (inScope(animElems.$counter, 100) && !counterIsStarted) {
            animateCounter(1000);
        }

        if (isHidden(animElems.$topList) && inScope(animElems.$topList)) {
            animElems.$topList.classList.remove('hidden');
            var delay = 100;
            for (var i = 0; i < animElems.$topListItems.length; i++) {
                animateHandler(animElems.$topListItems[i], 'ffl', delay);
                delay += 200;
            }
            animateHandler(animElems.$topBtn, 'ffl', delay);
        }

        if (isHidden(animElems.$priceList) && inScope(animElems.$priceList, 150)) {
            animElems.$priceList.classList.remove('hidden');
            var delay = 100;
            for (var i = 0; i < animElems.$priceItems.length; i++) {
                animateHandler(animElems.$priceItems[i], 'ffl', delay);
                animateHandler(animElems.$priceItems[i], 'ffr', delay);
                delay += 200;
            }
            // animateHandler(animElems.$topBtn, 'ffl', delay);
        }
    }

    window.addEventListener('load', enableAnimations);
    // window.addEventListener('load', qwe);
    window.addEventListener('scroll', enableAnimations);
})();