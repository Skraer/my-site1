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

function myTooltips() {
    let questions = document.querySelectorAll('.questions-list__item');
    let questionsAnchors = document.querySelectorAll('.questions-list__item a');
    let tooltips = document.querySelectorAll('.questions-list__tooltip');
    let closeButtons = document.querySelectorAll('.questions-list__tooltip button');
    questionsAnchors.forEach(function (elem) {
        elem.addEventListener('click', () => event.preventDefault());
    });
    function checkTooltipState(t) {
        let state = t.classList.contains('questions-list__tooltip--active');
        return state;
    }
    function toggleTooltip(elem, action) {
        if (action) {
            tooltips.forEach(function (tooltip) {
                tooltip.classList.remove('questions-list__tooltip--active');
            });
            elem.classList.add('questions-list__tooltip--active');
        } else if (!action) {
            elem.classList.remove('questions-list__tooltip--active');
        }
    }
    questionsAnchors.forEach(function (elem) {
        elem.addEventListener('click', function () {
            for (let i = 0; i < questionsAnchors.length; i++) {
                if (event.target == questionsAnchors[i] && !checkTooltipState(tooltips[i])) {
                    toggleTooltip(tooltips[i], true);
                    break;
                } else if (event.target == questionsAnchors[i] && checkTooltipState(tooltips[i])) {
                    toggleTooltip(tooltips[i], false);
                    break;
                }
            }
        });
    });
    closeButtons.forEach(function (elem) {
        elem.addEventListener('click', function () {
            for (let i = 0; i < closeButtons.length; i++) {
                if (elem == closeButtons[i]) {
                    toggleTooltip(tooltips[i], false);
                    break;
                }
            }
        });
    });
}

var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    initialSlide: 0,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
})
// function myPopup() {
//     let images = document.querySelectorAll('.my-popup');
//     let newPopup = null;

//     function createPopup(src) {
//         newPopup = document.createElement('div');
//         let newImg = document.createElement('img');

//         newImg.src = src;
//         newImg.alt = 'popup image';
//         newPopup.appendChild(newImg);
//         newPopup.classList.add('my-popup--shown');
//         return newPopup;
//     }

//     function removePopup() {
//         newPopup.remove();
//         newPopup = null;
//     }

//     images.forEach(function(elem) {
//         elem.addEventListener('click', function() {
//             if (newPopup == null) {
//                 let innerImage = elem.firstChild;
//                 document.body.style.overflow = 'hidden';
//                 document.body.style.paddingRight = '17px';

//                 elem.appendChild(createPopup(innerImage.src));
//                 // elem.classList.add('my-popup--shown');
//             } else {
//                 document.body.style.overflow = '';
//                 document.body.style.paddingRight = '';
//                 removePopup();
//                 // elem.classList.remove('my-popup--shown');
//             }
//         });
//     });
// }

window.addEventListener('load', myTooltips);
// window.addEventListener('load', myPopup);

