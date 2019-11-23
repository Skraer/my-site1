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

let menuItems = document.querySelectorAll(CSS_КЛАССЫ_ПУНКТОВ_МЕНЮ);
menuItems.forEach(function(elem) {
    elem.addEventListener('click', function() {
        let href = elem.getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(`${href}`).scrollIntoView({block: "start", behavior: "smooth"});
    });
})