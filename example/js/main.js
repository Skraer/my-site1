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

//ПЛАВНЫЙ ПЕРЕХОД К РАЗДЕЛАМ ЛЕНДИНГА ЧЕРЕЗ МЕНЮ
// let menuItems = document.querySelectorAll(CSS_КЛАССЫ_ПУНКТОВ_МЕНЮ);
// menuItems.forEach(function(elem) {
//     elem.addEventListener('click', function() {
//         let href = elem.getAttribute('href').substr(1);
//         event.preventDefault();
//         document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
//     });
// });

let aboutSpoilerBtn = document.querySelectorAll('.about__spoiler-btn');
let aboutSpoilerText = document.querySelectorAll('.about__spoiler-text');
aboutSpoiler = Array.from(aboutSpoilerBtn);
aboutSpoilerText = Array.from(aboutSpoilerText);

function showSpoilerContent() {
    if (aboutSpoilerBtn.length > 0) {
        for (let i = 0; i < aboutSpoilerBtn.length; i++) {
            aboutSpoilerBtn[i].addEventListener('click', function() {
                aboutSpoilerBtn.forEach(function(elem) {
                    elem.classList.remove('about__spoiler-btn--active');
                });
                aboutSpoilerText.forEach(function(elem) {
                    elem.classList.remove('about__spoiler-text--active');
                });

                aboutSpoilerBtn[i].classList.add('about__spoiler-btn--active');
                aboutSpoilerText[i].classList.add('about__spoiler-text--active');

            });
        }
    }
}
showSpoilerContent();