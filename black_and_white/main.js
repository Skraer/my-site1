let html = document.documentElement;
// let body = document.body;
let header = document.getElementById('header');
let scrollPrev = 0;
let content = document.querySelectorAll('.about__content-wrapper');
let dots = document.querySelector('.dots');
let about = document.getElementById('about');
let menuItems = document.querySelectorAll('.menu__item');

window.addEventListener('scroll', function() {
    content.forEach((elem) => {
        if (Math.floor(elem.getBoundingClientRect().top) - html.clientHeight < (-50)) {
            elem.classList.remove('hidden__left');
            elem.classList.remove('hidden__right');
        }
    });
});
dots.addEventListener('click', function() {
    about.scrollIntoView({block: "start", behavior: "smooth"});
});

menuItems.forEach(function(elem) {
    elem.addEventListener('click', function() {
        let href = elem.getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
    });
})

window.addEventListener('scroll', function() {
    let scrolled = document.documentElement.scrollTop;
    if (scrolled > 100 && scrolled > scrollPrev) {
        header.classList.add('out');
    } else {
        header.classList.remove('out');
    }
    scrollPrev = scrolled;
});