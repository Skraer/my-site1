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

// ПЛАВНЫЙ ПЕРЕХОД К РАЗДЕЛАМ ЛЕНДИНГА ЧЕРЕЗ МЕНЮ
let menuItems = document.querySelectorAll('.header__menu-item > a');
menuItems.forEach(function(elem) {
    elem.addEventListener('click', function() {
        let href = elem.getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
    });
});

let aboutSpoilerBtn = document.querySelectorAll('.spoiler__btn');
let aboutSpoilerText = document.querySelectorAll('.spoiler__text');
let aboutSpoilerLabel = document.querySelectorAll('.spoiler__label');

function showSpoilerContent() {
    if (aboutSpoilerBtn.length > 0) {
        for (let i = 0; i < aboutSpoilerBtn.length; i++) {
            aboutSpoilerBtn[i].addEventListener('click', function() {
                if (aboutSpoilerBtn[i].classList.contains('spoiler__btn--active')) {
                    aboutSpoilerBtn[i].classList.remove('spoiler__btn--active');
                    aboutSpoilerText[i].classList.remove('spoiler__text--active');
                    aboutSpoilerLabel[i].classList.remove('spoiler__label--active');
                } else {
                    for (let j = 0; j < aboutSpoilerBtn.length; j++) {
                        aboutSpoilerBtn[j].classList.remove('spoiler__btn--active');
                        aboutSpoilerText[j].classList.remove('spoiler__text--active');
                        aboutSpoilerLabel[j].classList.remove('spoiler__label--active');
                    }
                    aboutSpoilerBtn[i].classList.add('spoiler__btn--active');
                    aboutSpoilerText[i].classList.add('spoiler__text--active');
                    aboutSpoilerLabel[i].classList.add('spoiler__label--active');
                }
            });
        }
    }
}
showSpoilerContent();

let featuresItem = document.querySelectorAll('.features__item');
let featuresImg = document.querySelectorAll('.features__img');
function featuresWhiteIcons() {
    for (let i = 0; i < featuresItem.length; i++) {
        featuresItem[i].addEventListener('mouseover', function() {
            featuresImg[i].setAttribute('src', featuresImg[i].getAttribute('src').slice(0, -5) + 'w' + featuresImg[i].getAttribute('src').slice(-4));
        });
        featuresItem[i].addEventListener('mouseout', function() {
            featuresImg[i].setAttribute('src', featuresImg[i].getAttribute('src').slice(0, -5) + 'b' + featuresImg[i].getAttribute('src').slice(-4));
        });
    }
}
featuresWhiteIcons();


let servicesItem = document.querySelectorAll('.services-grid__item');
let servicesIcon = document.querySelectorAll('.services-grid__icon');
function servicesWhiteIcons() {
    for (let i = 0; i < servicesItem.length; i++) {
        servicesItem[i].addEventListener('mouseover', function() {
            servicesIcon[i].setAttribute('src', servicesIcon[i].getAttribute('src').slice(0, -5) + 'w' + servicesIcon[i].getAttribute('src').slice(-4));
        });
        servicesItem[i].addEventListener('mouseout', function() {
            servicesIcon[i].setAttribute('src', servicesIcon[i].getAttribute('src').slice(0, -5) + 'b' + servicesIcon[i].getAttribute('src').slice(-4));
        });
    }
}
servicesWhiteIcons();

let header = document.getElementById('header');
let scrollPrev = 0;
window.addEventListener('scroll', function() {
    let scrolled = document.documentElement.scrollTop;
    if (scrolled > 100 && scrolled > scrollPrev) {
        header.classList.add('out');
    } else {
        header.classList.remove('out');
    }
    scrollPrev = scrolled;
});