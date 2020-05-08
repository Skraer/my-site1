var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    slidesPerView: 1,
    watchOverflow: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 100,
            loop: true,
        },
        800: {
            spaceBetween: 100,
            slidesPerView: 2,
            loop: true,
        },
        1280: {
            spaceBetween: 30,
            slidesPerView: 4,
            loop: false,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});