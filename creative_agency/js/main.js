let body = this.document.body;
let burger = document.getElementById('burger');
let navMenu = document.getElementById('nav-menu');
let navMenuLinks = document.querySelectorAll('.nav-menu__link');
let circleButton = document.querySelector('.first-screen__button');
circleButton.addEventListener('click', function() {
    let href = circleButton.getAttribute('href').substr(1);
    event.preventDefault();
    document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
});
if (document.documentElement.clientWidth <= 1024) {
    body.classList.add('non-blur');
}
window.addEventListener('load', function() {
    let team = this.document.getElementById('team');
    let teamMembers = this.document.querySelectorAll('.team-member');
    teamMembers.forEach((elem) => {
        elem.addEventListener('mouseenter', function() {
            teamMembers.forEach(element => {
                if (element != elem && !body.classList.contains('non-blur')) {
                    element.style.filter = 'blur(1px)';
                }
            });
            team.style.backgroundColor = '#f3f3f3';
        });
        elem.addEventListener('mouseleave', function() {
            team.style.backgroundColor = '';
            teamMembers.forEach(element => {
                element.style.filter = '';
            });
        });
    });
});
burger.addEventListener('click', function() {
    this.classList.toggle('burger--active');
    navMenu.classList.toggle('nav-menu--active');
    body.classList.toggle('lock');
});
navMenuLinks.forEach(elem => {
    elem.addEventListener('click', function() {
        burger.classList.remove('burger--active');
        navMenu.classList.remove('nav-menu--active');
        body.classList.remove('lock');
    });
});