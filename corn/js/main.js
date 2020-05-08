(function() {
    /**
        редирект на страницу благодарности в файле mail.js!
        строка 30
     */
    var header = document.getElementById('header');
    window.addEventListener('scroll', function(e) {
        if (window.pageYOffset > 299) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    });
    function hideMenu() {
        burger.classList.remove('burger-btn--active');
        burger.classList.add('burger-btn--disabled');
        document.body.classList.remove('lock');
        headerMenu.style.transform = '';
        headerNumber.style.transform = '';
    }
    function showMenu() {
        burger.classList.remove('burger-btn--disabled');
        burger.classList.add('burger-btn--active');
        document.body.classList.add('lock');
        headerMenu.style.transform = 'translateY(0%)';
        headerNumber.style.transform = 'translateY(0%)';
    }
    var burger = document.querySelector('.burger-btn');
    var headerMenu = document.querySelector('.header-menu');
    var headerNumber = document.querySelector('.header__call');
    burger.addEventListener('click', function() {
        if (burger.classList.contains('burger-btn--disabled')) {
            showMenu();
        } else {
            hideMenu();
        }
    });
    var smoothScrollElems = document.querySelectorAll('a.smooth');
    smoothScrollElems.forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            var href = elem.getAttribute('href').substr(1);
            document.getElementById(href).scrollIntoView({ block: "start", behavior: "smooth" });
            if (burger.classList.contains('burger-btn--active')) {
                hideMenu();
            }
        });
    });
    var faqItems = document.querySelectorAll('.questions-list__item');
    var faqAnswers = document.querySelectorAll('.questions-list__answer');
    faqItems.forEach(function (elem, i) {
        elem.addEventListener('click', function () {
            faqAnswers[i].classList.toggle('questions-list__answer--shown');
            elem.classList.toggle('questions-list__item--active');
        });
    });
    var firstScrBtn = document.querySelector('#firstScreenBtn a');
    if (firstScrBtn) {
        firstScrBtn.addEventListener('click', function(e){
            e.preventDefault();
            var href = firstScrBtn.getAttribute('href').substr(1);
            document.getElementById(href).scrollIntoView({ block: "start", behavior: "smooth" });
        });
    }
    var certificates = document.querySelectorAll('.certificates__item a');
    certificates.forEach(function(elem) {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            var src = elem.getAttribute('href');
            var modal = document.createElement('div');
            modal.classList.add('cirtificate-modal');
            var img = document.createElement('img');
            img.setAttribute('src', src);
            img.setAttribute('alt', 'Сертификат');
            modal.appendChild(img);
            document.body.appendChild(modal);
            document.body.classList.add('lock');
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
                document.body.classList.remove('lock');
            });
        });
    });
    
    function checkTelInput(elem) {
        var regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (!elem.value.match(regTel)) {
            elem.classList.add('input-invalid');
        } else {
            elem.classList.remove('input-invalid');
        }
    }
    function checkNameInput(elem) {
        var regName = /^[а-яё]+$/i;
        if (!elem.value.match(regName)) {
            elem.classList.add('input-invalid');
        } else {
            elem.classList.remove('input-invalid');
        }
    }

    var inputsName = document.querySelectorAll('input[name="name"]');
    var inputsTel = document.querySelectorAll('input[name="tel"]');
    inputsName.forEach(function(elem) {
        elem.addEventListener('blur', checkNameInput.bind(null, elem));
    });
    inputsTel.forEach(function(elem) {
        elem.addEventListener('blur', checkTelInput.bind(null, elem));
    });
})();
