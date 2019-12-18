$(document).ready(function() {
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

    //КАТАЛОГ start
    let catalogList = document.querySelector('.catalog__categories-list');
    let catalogCategory = document.querySelectorAll('.catalog__category');
    let catalogHead = document.querySelector('.catalog__head');
    function categoryName(arr) {
        arr = Array.from(arr);
        for (i = 0; i < arr.length; i++) {
            let htmlCode = arr[i].innerHTML;
            let text = arr[i].getAttribute('data-category-name');
            arr[i].innerHTML = text + htmlCode;
        }
    }
    categoryName(catalogCategory);

    window.addEventListener('click', function() {
        let arr = Array.from(catalogCategory);
        if (event.target == catalogHead) {
            catalogList.classList.toggle('catalog__categories-list--active');
        } else if (event.target != catalogHead && arr.includes(event.target) == false) {
            catalogList.classList.remove('catalog__categories-list--active');
        }
    });
    //КАТАЛОГ end


    //АНИМАЦИЯ ДЛЯ ФОРМЫ ПОДПИСКИ start
    let subForms = document.querySelectorAll('.sub-form');
    let subEmails = document.querySelectorAll('.sub-form__email');
    subEmails.forEach(function(elem, i) {
        elem.addEventListener('focusin', function() {
            subForms[i].style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        });
        elem.addEventListener('focusout', function() {
            subForms[i].style.backgroundColor = '';
        });
    });
    //АНИМАЦИЯ ДЛЯ ФОРМЫ ПОДПИСКИ end

    //ДОБАВЛЕНИЕ ИКОНОК СОЦ СЕТЕЙ В ССЫЛКИ start
    // let socialIconsBlock = document.querySelectorAll('.share-social__socials');
    // socialIconsBlock.forEach(function(elem) {
    //     let arr = elem.children;
    //     for (i = 0; i < arr.length; i++) {
    //         let child = arr[i];
    //         let img = document.createElement('img');
    //         child.classList.forEach(function(cls) {
    //             if (cls.indexOf('share-social__icon') >= 0) {
    //                 let iconArr = cls.split('-');
    //                 let iconName = iconArr[iconArr.length - 1];
    //                 img.setAttribute('src', '../img/icon/social/' + iconName + '.png');
    //                 img.setAttribute('alt', iconName);
    //             } else {
    //                 return;
    //             }
    //         });
    //         child.appendChild(img);
    //     }
    // });
    //ДОБАВЛЕНИЕ ИКОНОК СОЦ СЕТЕЙ В ССЫЛКИ end

    //СЧЕТЧИК ТОВАРОВ НА СТРАНИЦЕ ТОВАРА start
    let quantityProduct         = document.querySelectorAll('.quantity-product');
    let quantityProductPlus     = document.querySelectorAll('.quantity-product .quantity-product__plus');
    let quantityProductMinus    = document.querySelectorAll('.quantity-product .quantity-product__minus');
    let quantityProductNumber   = document.querySelectorAll('.quantity-product .quantity-product__number');
    let quantityProductTotal    = document.querySelectorAll('.quantity-product__total-price span');
    let cartListItems           = document.querySelectorAll('.cart-list__item');
    let totalSummaryDOM         = document.querySelector('.total-price-summary__num');
    quantityProduct             = Array.from(quantityProduct);
    quantityProductPlus         = Array.from(quantityProductPlus);
    quantityProductMinus        = Array.from(quantityProductMinus);
    quantityProductNumber       = Array.from(quantityProductNumber);
    quantityProductTotal        = Array.from(quantityProductTotal);
    cartListItems               = Array.from(cartListItems);

    function calcTotalSum() {
        let sum = 0;
        quantityProductTotal.forEach(function(elem) {
            sum += +elem.textContent;
        });
        return sum.toFixed(2);
    }
    window.addEventListener('load', function() {
        let plusArr         = quantityProductPlus,
            minusArr        = quantityProductMinus,
            numberArr       = quantityProductNumber;

        
        if (quantityProduct.length > 0) {
            totalSummaryDOM.textContent = 0;
            for (let i = 0; i < quantityProduct.length; i++) {
                numberArr[i].value = 0;
                plusArr[i].textContent = '+';
                minusArr[i].textContent = '-';
                if (cartListItems.length > 0) {
                    quantityProductTotal[i].textContent = (+numberArr[i].value * +cartListItems[i].getAttribute('data-price')).toFixed(2);
                }
                numberArr[i].addEventListener('focus', function() {
                    this.select();
                });
                numberArr[i].addEventListener('change', function() {
                    if (this.value < '0' || this.value == '' || isNaN(+this.value)) {
                        this.value = '0';
                    }
                    if (cartListItems.length > 0) {
                        quantityProductTotal[i].textContent = (+this.value * +cartListItems[i].getAttribute('data-price')).toFixed(2);
                        totalSummaryDOM.textContent = calcTotalSum();
                    }
                });
                plusArr[i].addEventListener('click', function() {
                    numberArr[i].value = +numberArr[i].value + 1;
                    if (cartListItems.length > 0) {
                        quantityProductTotal[i].textContent = (+numberArr[i].value * +cartListItems[i].getAttribute('data-price')).toFixed(2);
                        totalSummaryDOM.textContent = calcTotalSum();
                    }
                });
                minusArr[i].addEventListener('click', function() {
                    if (numberArr[i].value > 0 ) {
                        numberArr[i].value = +numberArr[i].value - 1;
                    }
                    if (cartListItems.length > 0) {
                        quantityProductTotal[i].textContent = (+numberArr[i].value * +cartListItems[i].getAttribute('data-price')).toFixed(2);
                        totalSummaryDOM.textContent = calcTotalSum();
                    }
                });
            }
        } else {
            return;
        }
    });
    //СЧЕТЧИК ТОВАРОВ НА СТРАНИЦЕ ТОВАРА end

    //УДАЛИТЬ ТОВАР ИЗ КОРЗИНЫ start
    let cartDeleteButton = document.querySelectorAll('.cart-list__delete-button');
    cartDeleteButton = Array.from(cartDeleteButton);
    cartDeleteButton.forEach(function(elem, ind) {
        elem.addEventListener('click', function() {
            cartListItems[ind].classList.add('cart-list__item--out');
            setTimeout(() => cartListItems[ind].remove(), 300);
        });
    });
    //УДАЛИТЬ ТОВАР ИЗ КОРЗИНЫ end

    //СРАВНЕНИЕ ТОВАРОВ start
    let sidebarCompareChars = document.querySelectorAll('.compare-sidebar__characters-item');
    let productCompareChars = document.querySelectorAll('.product-card__characters-item');
    let productsChar = document.querySelectorAll('.product-card__characters');
    sidebarCompareChars = Array.from(sidebarCompareChars);
    productCompareChars = Array.from(productCompareChars);
    let productsCharsMatrix = [];
    productsChar = Array.from(productsChar);
    for (let i = 0; i < productsChar.length; i++) {
        let arr = [];
        productCompareChars.forEach(function(elem, ind) {
            if (productsChar[i].contains(elem)) {
                arr.push(elem);
            }
        });
        productsCharsMatrix.push(arr);
    }
    // console.log(productsCharsMatrix);

    

    // sidebarCompareChars.forEach(function(elem, ind) {
    //     elem.addEventListener('mouseover', function() {
    //         for (let i = 0; i < productsCharsMatrix.length; i++) {
    //             elem.classList.add('hover-chars');
    //             productsCharsMatrix[i][ind].classList.add('hover-chars');
    //         }
    //         // console.log(sidebarCompareChars);
    //     });
    // });
    // productCompareChars.forEach(function(elem) {
    //     elem.addEventListener('mouseover', function() {
    //         console.log(productsChar);
    //     });
    // });

    //СРАВНЕНИЕ ТОВАРОВ end

    //ТАБЫ start
    let tabsItems = document.querySelectorAll('.tabs__item');
    let tabsContent = document.querySelectorAll('.tabs__content');
    let tabsContainer = document.querySelectorAll('.tabs-container');
    let firstTabs = document.querySelectorAll('.tabs .tabs__item:nth-of-type(1)');
    tabsItems = Array.from(tabsItems);
    tabsContent = Array.from(tabsContent);
    tabsContainer = Array.from(tabsContainer);
    firstTabs = Array.from(firstTabs);

    let firstContents = [];
    tabsContainer.forEach(function(elem) {
        for (let i = 0; i < tabsContent.length; i++) {
            if (elem.contains(tabsContent[i])) {
                firstContents.push(tabsContent[i]);
                break;
            }
        }
    });
    firstContents = Array.from(firstContents);

    function tabs() {
        if (tabsItems.length > 0) {
            for (let i = 0; i < tabsItems.length; i++) {
                if (i == 0) {
                    tabsItems[i].classList.add('tabs__item--active');
                    tabsContent[i].classList.add('tabs__content--active');
                } else {
                    tabsItems[i].classList.remove('tabs__item--active');
                    tabsContent[i].classList.remove('tabs__content--active');
                }
                tabsItems[i].addEventListener('click', function() {
                    tabsItems.forEach(function(elem, ind) {
                        elem.classList.remove('tabs__item--active');
                        tabsContent[ind].classList.remove('tabs__content--active');
                    });
                    tabsItems[i].classList.add('tabs__item--active');
                    tabsContent[i].classList.add('tabs__content--active');
                });
            }
        }
    }
    tabs();
    //ТАБЫ end

    //САЙДБАР АККОРДЕОН start
    let sidebarTabs = document.querySelectorAll('.sidebar-accord__item');
    let sidebarContent = document.querySelectorAll('.sidebar-accord__content');
    sidebarTabs = Array.from(sidebarTabs);
    sidebarContent = Array.from(sidebarContent);

    function sidebarAccord() {
        if (sidebarTabs.length > 0) {
            for (let i = 0; i < sidebarTabs.length; i++) {
                if (i == 0) {
                    sidebarTabs[i].classList.add('sidebar-accord__item--active');
                    sidebarContent[i].classList.add('sidebar-accord__content--active');
                } else {
                    sidebarTabs[i].classList.remove('sidebar-accord__item--active');
                    sidebarContent[i].classList.remove('sidebar-accord__content--active');
                }
                sidebarTabs[i].addEventListener('click', function() {
                    if (this.classList.contains('sidebar-accord__item--active')) {
                        return;
                    } else {
                        sidebarTabs.forEach(function(elem, ind) {
                            elem.classList.remove('sidebar-accord__item--active');
                            sidebarContent[ind].classList.remove('sidebar-accord__content--active');
                        });
                        tabsItems.forEach(function(elem, ind) {
                            elem.classList.remove('tabs__item--active');
                            tabsContent[ind].classList.remove('tabs__content--active');
                        });
                        firstTabs[i].classList.add('tabs__item--active');
                        firstContents[i].classList.add('tabs__content--active');
                        sidebarTabs[i].classList.add('sidebar-accord__item--active');
                        sidebarContent[i].classList.add('sidebar-accord__content--active');
                    }
                });
            }
        }
    }
    sidebarAccord();
    //САЙДБАР АККОРДЕОН end


    //ДОБАВЛЕНИЕ НАВИГАЦИИ В СЛАЙДЕР start
    let mySlider = document.querySelectorAll('.slider-wrapper-theme');
    mySlider = Array.from(mySlider);
    mySlider.forEach(function(elem) {
        if (elem.classList.contains('dis-nav')) {
            return;
        } else {
            let navBar = document.createElement('div');
            let prev = document.createElement('div');
            let next = document.createElement('div');
            let span1 = document.createElement('span');
            let span2 = document.createElement('span');
            navBar.classList.add('slider-wrapper-theme__nav');
            prev.classList.add('slider-wrapper-theme__prev');
            next.classList.add('slider-wrapper-theme__next');
            prev.append(span1);
            next.append(span2);
            navBar.append(prev);
            navBar.append(next);
            elem.append(navBar);
        }
    });
    //ДОБАВЛЕНИЕ НАВИГАЦИИ В СЛАЙДЕР end

    //АКТИВАЦИЯ И НАСТРОЙКА СЛАЙДЕРОВ start
    let bannerSlider = $('#banner-slider');
    let bestsellerSlider = $('#bestseller-slider');
    let discountSlider = $('#discounts-slider');
    let usefulSlider = $('#useful-slider');
    let slidersArr = [bannerSlider, bestsellerSlider, discountSlider];

    bannerSlider.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dots: false
    });
    bestsellerSlider.owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        margin: 1,
        mouseDrag: false
    });
    discountSlider.owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        margin: 1,
        mouseDrag: false
    });
    usefulSlider.owlCarousel({
        items: 2,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        margin: 50,
        dots: true
    });
    $('.slider-wrapper-theme .slider-wrapper-theme__prev').each(function(i, elem) {
        $(elem).click(function() {
            slidersArr[i].trigger('prev.owl.carousel');
        });
    });
    $('.slider-wrapper-theme .slider-wrapper-theme__next').each(function(i, elem) {
        $(elem).click(function() {
            slidersArr[i].trigger('next.owl.carousel');
        });
    });
    //АКТИВАЦИЯ И НАСТРОЙКА СЛАЙДЕРОВ end
});

