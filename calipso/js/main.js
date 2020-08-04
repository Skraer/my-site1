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

;(function () {
    const $sidebar = document.querySelector('#sidebar');
    const $sidebarBurger = document.querySelector('#sidebarBurger');
    const $filter = document.querySelector('#filter');

    $sidebarBurger.addEventListener('click', function() {
        if ($sidebar.classList.contains('hidden')) {
            $sidebar.classList.remove('hidden');
            $sidebar.classList.add('shown');
            $filter.classList.add('full');
            $sidebarBurger.classList.add('active');
        } else {
            $sidebar.classList.add('hidden');
            $sidebar.classList.remove('shown');
            $filter.classList.remove('full');
            $sidebarBurger.classList.remove('active');
        }
    });
})();