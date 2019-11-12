let burgerButton = document.querySelector('.menu__burger');
let menu = document.querySelector('.menu');
//--------------------

function ibg() {
    let ibgElems = document.querySelectorAll('.ibg');
    let imgArr = document.querySelectorAll('img');
    
    imgArr.forEach(function(img) {
        ibgElems.forEach(function(div) {
            if (div.contains(img)) {
                let src = img.getAttribute('src');
                div.style.backgroundImage = 'url(' + src + ')';
            }
        });
    });
}
ibg();

function showMenu() {
    menu.classList.toggle('menu--active');
    burgerButton.classList.toggle('burger--active');
}
burgerButton.addEventListener('click', showMenu);

window.addEventListener('click', function() {
    let menuAnchors = document.querySelectorAll('.menu a');
    let burgerSpan = document.querySelector('.menu__burger span');
    menuAnchors.forEach(elem => {
        if (this.event.target == elem) {
            menu.classList.toggle('menu--active');
            burgerButton.classList.toggle('burger--active');
        } else if (this.event.target != elem && this.event.target != burgerButton && this.event.target != burgerSpan) {
            menu.classList.remove('menu--active');
            burgerButton.classList.remove('burger--active');
        }
    });
});
