;(() => {
    let menu = document.getElementById('headerContent');
    let menuItems = document.querySelectorAll('.header__menu-item a');
    let burgerBtn = document.getElementById('burger');
    function closeBurgerMenu() {
        burgerBtn.classList.remove('burger-btn--active')
        burgerBtn.classList.add('burger-btn--disabled');
        menu.style.transform = '';
        document.body.style.overflow = '';
    }
    function openBurgerMenu() {
        burgerBtn.classList.remove('burger-btn--disabled')
        burgerBtn.classList.add('burger-btn--active');
        menu.style.transform = 'translateY(0)';
        document.body.style.overflow = 'hidden';
    }
    menuItems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            let href = elem.getAttribute('href').substr(1);
            event.preventDefault();
            document.getElementById(`${href}`).scrollIntoView({ block: "start", behavior: "smooth" });
            
            if (burgerBtn.classList.contains('burger-btn--active')) closeBurgerMenu();
        });
    });
    burgerBtn.addEventListener('click', function(e) {
        if (this.classList.contains('burger-btn--disabled')) openBurgerMenu();
        else closeBurgerMenu();
    });

    let circleBtns = document.querySelectorAll('.btn-circle');
    let circles = new Map();
    for (let elem of circleBtns) {
        elem.addEventListener('mouseenter', function(e) {
            let circle;
            circle = document.createElement('div');
            circle.classList.add('circle');
            circle.classList.add('circle--growing');
            circle.style.left = (e.offsetX - 15) + 'px';
            circle.style.top = (e.offsetY - 15) + 'px';
            circle.style.backgroundColor = elem.getAttribute('data-color');
            elem.appendChild(circle);
            circles.set(elem, circle); 
        });
        elem.addEventListener('mouseleave', function() {
            elem.removeChild(circles.get(elem));
            circles.delete(elem);
        });
    }
})();

