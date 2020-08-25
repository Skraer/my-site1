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
    /* LIBS */
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
    var picker = new Pikaday({ 
        field: document.getElementById('datepicker'),
        minDate: new Date(),
        toString(date, format) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
    });
    /* ========= */

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
        $guaranteListItems: document.querySelectorAll('.guarantee-list__item'),
        $aboutPerson: document.querySelector('.about__person'),
        $aboutContent: document.querySelector('.about__content'),
        $priceList: document.querySelector('.price-list'),
        $priceItems: document.querySelectorAll('.price-list__item'),
        $contacts: document.querySelector('.contacts__column'),
    };
    var counterIsStarted = false;
    var $html = document.documentElement;
    var $body = document.body;
    var $wrapper = document.querySelector('.wrapper');

    function isHidden(el) {
        return el.classList.contains('hidden')
        // if () {
        //     return true;
        // } else {
        //     return false;
        // }
    }
    function inScope(el, scope = 200) {
        return Math.floor(el.getBoundingClientRect().top) - $html.clientHeight < (-scope);
    }
    function checkCondition(el) {
        return (inScope(el) && isHidden(el));
    }
    function animateElem(el, animClassname) {
        el.classList.remove('hidden');
        el.classList.add(animClassname);
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
        } else if (checkCondition(el)) {
            animateElem(el, animClassname);
        }
    }
    function animateCounter(end, step) {
        counterIsStarted = true;
        animElems.$counter.textContent = 0;
        clearInterval(counterInterval);
        var counterInterval = setInterval(() => {
            if (+animElems.$counter.textContent < end) {
                animElems.$counter.textContent = +animElems.$counter.textContent + step;
            } else {
                clearInterval(counterInterval);
            }
        }, 20);
    }
    if (!counterIsStarted) {
        animElems.$counter.textContent = 0;
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
        // animateHandler(animElems.$guaranteList, 'ffd');
        animateHandler(animElems.$aboutPerson, 'ffl');
        animateHandler(animElems.$aboutContent, 'fi');
        animateHandler(animElems.$contacts, 'ffl');
        

        if (inScope(animElems.$counter, 100) && !counterIsStarted) {
            animateCounter(1000, 20);
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

        if (isHidden(animElems.$guaranteList) && inScope(animElems.$guaranteList)) {
            animElems.$guaranteList.classList.remove('hidden');
            var delay = 100;
            for (var i = 0; i < animElems.$guaranteListItems.length; i++) {
                animateHandler(animElems.$guaranteListItems[i], 'ffd', delay);
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
        }
    }

    var $popup1 = document.querySelector('#popup1');
    var $btnShowPopup1 = document.querySelector('#showPopup1');
    var $popup2 = document.querySelector('#popup2');
    var $btnShowPopup2 = document.querySelector('#showPopup2');
    $popup1 = $body.removeChild($popup1);
    $popup2 = $body.removeChild($popup2);
    $popup1.classList.remove('hidden');
    $popup2.classList.remove('hidden');

    function showPopup($popup) {
        $body.classList.add('lock');
        $wrapper.classList.add('blured');
        $body.append($popup);
    }
    function hidePopup($popup) {
        $body.classList.remove('lock');
        $wrapper.classList.remove('blured');
        $popup.remove();
    }
    $btnShowPopup1.addEventListener('click', function() {
        event.preventDefault();
        showPopup($popup1);
    });
    $popup1.querySelector('.popup__overlay').addEventListener('click', function() {
        if (event.target === this) {
            hidePopup($popup1);
        }
    });
    $btnShowPopup2.addEventListener('click', function() {
        event.preventDefault();
        showPopup($popup2);
    });
    $popup2.querySelector('.popup__overlay').addEventListener('click', function() {
        if (event.target === this) {
            hidePopup($popup2);
        }
    });
    

    window.addEventListener('load', enableAnimations);
    window.addEventListener('scroll', enableAnimations);
})();