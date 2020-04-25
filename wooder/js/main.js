+function() {
    var burgerBtn = document.getElementById('burger');
    var menu = document.getElementById('menu');
    let menuItems = document.querySelectorAll('.header__menu-item > a');

    menuItems.forEach(function(elem) {
        elem.addEventListener('click', function() {
            let href = elem.getAttribute('href').substr(1);
            event.preventDefault();
            document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
            
            burgerBtn.classList.add('disabled');
            burgerBtn.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('lock');
        });
    });

    burgerBtn.addEventListener('click', function() {
        if (burgerBtn.classList.contains('disabled')) {
            burgerBtn.classList.remove('disabled');
            burgerBtn.classList.add('active');
            menu.classList.add('active');
            document.body.classList.add('lock');
        } else {
            burgerBtn.classList.add('disabled');
            burgerBtn.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('lock');
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        watchOverflow: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            900: {
                slidesPerView: 3,
            }
        }
    });
    
}();

