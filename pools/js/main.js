// // ПЛАВНЫЙ ПЕРЕХОД К РАЗДЕЛАМ ЛЕНДИНГА ЧЕРЕЗ МЕНЮ
// let menuItems = document.querySelectorAll(CSS_КЛАССЫ_ПУНКТОВ_МЕНЮ);
// menuItems.forEach(function(elem) {
//     elem.addEventListener('click', function() {
//         let href = elem.getAttribute('href').substr(1);
//         event.preventDefault();
//         document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
//     });
// });

(function() {
    var headerPhone = document.getElementById('headerPhone');
    var btnCatalog = document.getElementById('btnCatalog');

    var popupContact = document.getElementById('popupContact');
    var popupCatalog = document.getElementById('popupCatalog');
    
    var body = document.body;
    var pageWrapper = document.querySelector('.wrapper');

    function showPopup(elem) {
        elem.classList.remove('popup-wrapper--hidden');
        body.classList.add('lock');
        pageWrapper.classList.add('blured');
    }
    function hidePopup(elem) {
        elem.classList.add('popup-wrapper--hidden');
        body.classList.remove('lock');
        pageWrapper.classList.remove('blured');
    }

    headerPhone.addEventListener('click', function() {
        event.preventDefault();
        if (popupContact.classList.contains('popup-wrapper--hidden')) {
            showPopup(popupContact);
        } else {
            hidePopup(popupContact);
        }
    });
    popupContact.addEventListener('click', function() {
        if (event.target === popupContact) {
            hidePopup(popupContact);
        }
    });

    btnCatalog.addEventListener('click', function() {
        event.preventDefault();
        if (popupCatalog.classList.contains('popup-wrapper--hidden')) {
            showPopup(popupCatalog);
        } else {
            hidePopup(popupCatalog);
        }
    });
    popupCatalog.addEventListener('click', function() {
        if (event.target === popupCatalog) {
            hidePopup(popupCatalog);
        }
    });

    
})();